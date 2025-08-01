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
    <form onSubmit={handleSubmit}>
      <input name="descripcion" onChange={handleChange} placeholder="Descripción" />
      <input name="monto" onChange={handleChange} placeholder="Monto" type="number" />
      <input name="categoria" onChange={handleChange} placeholder="Categoría" />
      <button type="submit">Registrar Ingreso</button>
    </form>
  );
}
