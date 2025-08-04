import { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import { NavLink } from 'react-router-dom';

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
            {/* <ul> */}
            <div className="mt-4">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {ingresos.map(i => (
                        <li key={i.id}>
                            {editando === i.id ? (
                                <>
                                    <div className="card p-3 bg-light rounded shadow-sm">
                                        <h6 className="mb-3">Editar Ingreso</h6>

                                        <div className="row  align-items-end">
                                            <div className="col-auto">
                                                <label className="form-label">Descripción</label>
                                                <input
                                                    className="form-control"
                                                    value={form.descripcion}
                                                    onChange={e => setForm({ ...form, descripcion: e.target.value })}
                                                    placeholder="Descripción"
                                                />
                                            </div>

                                            <div className="col-auto">
                                                <label className="form-label">Monto</label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    value={form.monto}
                                                    onChange={e => setForm({ ...form, monto: e.target.value })}
                                                    placeholder="Monto"
                                                />
                                            </div>

                                            <div className="col-auto">
                                                <label className="form-label">Categoría</label>
                                                <input
                                                    className="form-control"
                                                    value={form.categoria}
                                                    onChange={e => setForm({ ...form, categoria: e.target.value })}
                                                    placeholder="Categoría"
                                                />
                                            </div>

                                            <div className="col-auto">
                                                <button onClick={guardarEdicion} className="btn btn-success w-100">Guardar</button>
                                            </div>
                                        </div>
                                    </div>


                                </>
                            ) : (
                                <>
                                    <div className="col" key={i.id}>
                                        <div className="card h-100 shadow-sm border rounded bg-light">
                                            <div className="card-body">
                                                <h5 className="card-title">{i.descripcion}</h5>
                                                <p className="card-text">
                                                    <strong>Monto:</strong> ${i.monto}<br />
                                                    <strong>Categoría:</strong> {i.categoria}<br />
                                                    <strong>Fecha:</strong>{' '}
                                                    {i.fecha?.toDate().toLocaleDateString() || 'Sin fecha'}
                                                </p>
                                            </div>
                                            <div className="card-footer bg-transparent border-top-0">
                                                <NavLink to={`/gasto/${i.id}`} className="btn btn-primary btn-sm rounded me-1">
                                                    Ver Gastos
                                                </NavLink>
                                                <button className="btn btn-success btn-sm rounded me-1" onClick={() => iniciarEdicion(i)}>Editar</button>
                                                <button className="btn btn-danger btn-sm rounded" onClick={() => eliminarIngreso(i.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {i.descripcion} - ${i.monto} - {i.categoria} - {new Date(i.fecha.seconds * 1000).toLocaleDateString()} */}

                                </>
                            )}
                        </li>
                    ))}
                </div>
            </div>
            {/* </ul> */}
        </div>
    );
}
