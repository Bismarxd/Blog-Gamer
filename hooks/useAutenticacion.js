import React, {useEffect, useState} from 'react'
import firebase from '@/firebase'

function useAutenticacion() {
  const [usuarioutenticado, setUsuarioaAutenticado] = useState(null)

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
      if (usuario) {
        setUsuarioaAutenticado(usuario);
      } else {
        setUsuarioaAutenticado(null);
      }
    });
    return () => unsuscribe();
  }, []);
  return usuarioutenticado;
}

export default useAutenticacion;