import { useState } from 'react';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from '../firebase/firestore';

export default function RegistroIngreso() {
  const [form, setForm] = useState({ descripcion: '', monto: '', categoria: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addDoc(collection(db, 'ingresos'), {
      ...form,
      monto: parseFloat(form.monto),
      fecha: Timestamp.now()
    });
    alert('Ingreso registrado');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 bg-light rounded shadow-sm">
      <h5 className="mb-3">Registrar Ingreso</h5>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input
          name="descripcion"
          onChange={handleChange}
          placeholder="Descripción"
          className="form-control rounded"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Monto</label>
        <input
          name="monto"
          type="number"
          onChange={handleChange}
          placeholder="Monto"
          className="form-control rounded"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <input
          name="categoria"
          onChange={handleChange}
          placeholder="Categoría"
          className="form-control rounded"
        />
      </div>

      <button type="submit" className="btn btn-primary rounded">Registrar Ingreso</button>
    </form>

  );
}
