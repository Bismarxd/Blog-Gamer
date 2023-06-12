import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '@/firebase';

import { collection, getDocs, query, orderBy } from "firebase/firestore";

const useProductos = (orden,ascdesc) => {
  //Crear el state de productos
  const [productos, setProductos] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  //trae los productos de la bd
  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(
        query(collection(firebase.db, "productos"), orderBy(orden, ascdesc))
      );
      const productos = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProductos(productos);
    };
    obtenerProductos();
  }, []);

  return {
    productos
  }
}

export default useProductos;
