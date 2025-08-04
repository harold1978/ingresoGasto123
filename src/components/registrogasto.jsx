import { useState } from 'react';
import { collection, addDoc, Timestamp, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { useParams } from 'react-router-dom';

export default function RegistroGasto() {
  const [form, setForm] = useState({ descripcion: '', monto: '', tipo: '' });
  const [gastos, setGastos] = useState([]);
  const [editando, setEditando] = useState(null);
  const { ingresoId } = useParams();

  const fetchGastos = async () => {
    const snapshot = await getDocs(collection(db, `ingresos/${ingresoId}/gastos`));
    setGastos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addDoc(collection(db, `ingresos/${ingresoId}/gastos`), {
      ...form,
      monto: parseFloat(form.monto),
      fecha: Timestamp.now()
    });
    fetchGastos();
    alert('Gasto registrado');
  };

  const eliminarGasto = async (id) => {
    await deleteDoc(doc(db, `ingresos/${ingresoId}/gastos`, id));
    fetchGastos();
  };

  const iniciarEdicion = (gasto) => {
    setEditando(gasto.id);
    setForm({ descripcion: gasto.descripcion, monto: gasto.monto, tipo: gasto.tipo });
  };

  const guardarEdicion = async () => {
    await updateDoc(doc(db, `ingresos/${ingresoId}/gastos`, editando), {
      ...form,
      monto: parseFloat(form.monto)
    });
    setEditando(null);
    fetchGastos();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="descripcion" onChange={handleChange} placeholder="Descripción del gasto" value={form.descripcion} />
        <input name="monto" onChange={handleChange} placeholder="Monto" type="number" value={form.monto} />
        <input name="tipo" onChange={handleChange} placeholder="Tipo de gasto" value={form.tipo} />
        <button type="submit">Registrar Gasto</button>
      </form>

      <h3>Gastos</h3>
      <ul>
        {gastos.map(g => (
          <li key={g.id}>
            {editando === g.id ? (
              <>
                <input value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
                <input value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })} type="number" />
                <input value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} />
                <button onClick={guardarEdicion}>Guardar</button>
              </>
            ) : (
              <>
                {g.descripcion} - ${g.monto} - {g.tipo} - {new Date(g.fecha.seconds * 1000).toLocaleDateString()}
                <button onClick={() => iniciarEdicion(g)}>Editar</button>
                <button onClick={() => eliminarGasto(g.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}