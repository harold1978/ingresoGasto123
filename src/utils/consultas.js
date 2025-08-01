import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const obtenerIngresosPorCategoria = async (categoria) => {
  const q = query(
    collection(db, 'ingresos'),
    where('categoria', '==', categoria)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const obtenerGastosPorIngreso = async (ingresoId) => {
  const snapshot = await getDocs(
    collection(db, `ingresos/${ingresoId}/gastos`)
  );
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
