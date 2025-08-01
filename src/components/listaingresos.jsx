import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';

export default function ListaIngresos() {
    const [ingresos, setIngresos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState({ descripcion: '', monto: '', categoria: '' });

    const fetchIngresos = async () => {
        const snapshot = await getDocs(collection(db, 'ingresos'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIngresos(data);
    };

    useEffect(() => {
        fetchIngresos();
    }, []);

    const eliminarIngreso = async (id) => {
        await deleteDoc(doc(db, 'ingresos', id));
        fetchIngresos();
    };

    const iniciarEdicion = (ingreso) => {
        setEditando(ingreso.id);
        setForm({ descripcion: ingreso.descripcion, monto: ingreso.monto, categoria: ingreso.categoria });
    };

    const guardarEdicion = async () => {
        await updateDoc(doc(db, 'ingresos', editando), {
            ...form,
            monto: parseFloat(form.monto)
        });
        setEditando(null);
        fetchIngresos();
    };

    return (
        <div>
            <h2>Ingresos</h2>
            <ul>
                {ingresos.map(i => (
                    <li key={i.id}>
                        {editando === i.id ? (
                            <>
                                <input value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
                                <input value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })} type="number" />
                                <input value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
                                <button onClick={guardarEdicion}>Guardar</button>
                            </>
                        ) : (
                            <>
                                {i.descripcion} - ${i.monto} - {i.categoria} - {new Date(i.fecha.seconds * 1000).toLocaleDateString()}
                                <button onClick={() => iniciarEdicion(i)}>Editar</button>
                                <button onClick={() => eliminarIngreso(i.id)}>Eliminar</button>
                                <button onClick={() => eliminarIngreso(i.id)}>Eliminar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
