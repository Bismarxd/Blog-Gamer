import App from "next/app";
import firebase, {FirebaseContext} from "../firebase";
import { useEffect, useState } from "react";
import useAutenticacion from "@/hooks/useAutenticacion";

const MyApp = props => {
  const usuario = useAutenticacion();
  
  const {Component, pageProps} = props;

  const [paginaLista, setPaginaLista] = useState(false)

  useEffect(()=> {
    setPaginaLista(true);
  },[]);
  
  return (
      paginaLista ? <FirebaseContext.Provider
        value={{
            firebase,
            usuario
        }}
      >
          <Component {...pageProps} />

      </FirebaseContext.Provider> : null
  )
}

export default MyApp;