import React, { useState, useContext } from "react";
import Router from "next/router";

import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
  H1,
} from "@/components/ui/Formulario";

import { FirebaseContext } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";

//validaciones
import useValidacion from "@/hooks/useValidacion";
import validarCrearProducto from "@/validacion/validarCrearProducto";

import Error404 from "@/components/layout/404";

const STATE_INICIAL = {
  nombre: "",
  consola: "",
  image: "",
  url: "",
  descripcion: "",
};

const NuevoProducto = () => {
  const [error, setError] = useState(false);
  // States para la subida de la imagen
  const [cargando, setCargando] = useState(false);
  const [URLImagen, setURLImagen] = useState("");

  //funciones
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

  const { nombre, consola, url, descripcion } = valores;

  //hook de routing
  const router = useRouter();

  //context con las operaciones crud de firebase
  const {usuario, firebase } = useContext(FirebaseContext);

  async function crearProducto() {
    //Si el usuario noeta autenticado
    if (!usuario) {
      return router.push("/");
    }
    //crear el objeto de nuevo producto
    const producto = {
      nombre,
      consola,
      url,
      URLImagen,
      descripcion,
      likes: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName,
      },
      haVotado: []
    };

    //Insertrlo en la base de datos
    try {
      await addDoc(collection(firebase.db, "productos"), producto);
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubirImagen = e => {
        // Se obtiene referencia de la ubicación donde se guardará la imagen
        const file = e.target.files[0];
        const imageRef = ref(firebase.storage, 'products/' + file.name);
 
        // Se inicia la subida
        setCargando(true);
        const uploadTask = uploadBytesResumable(imageRef, file);
 
        // Registra eventos para cuando detecte un cambio en el estado de la subida
        uploadTask.on('state_changed', 
            // Muestra progreso de la subida
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Subiendo imagen: ${progress}% terminado`);
            },
            // En caso de error
            error => {
                setCargando(false);
                console.error(error);
            },
            // Subida finalizada correctamente
            () => {
                setCargando(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log('Imagen disponible en:', url);
                    setURLImagen(url);
                });
                
            }
        );
    };

    if (!usuario) return

  return (
    <div>
      <Layout>
        {!usuario ? (
          <Error404 />
        ) : (
          <>
            <h1>
              <H1>Añadir Nuevo Blog</H1>
            </h1>
            <Formulario onSubmit={handleSubmit}>
              {errores.nombre && <Error>{errores.nombre}</Error>}
              {errores.consola && <Error>{errores.consola}</Error>}
              {errores.imagen && <Error>{errores.imagen}</Error>}
              {errores.url && <Error>{errores.url}</Error>}
              {errores.descripcion && <Error>{errores.descripcion}</Error>}

              {error && <Error>{error}</Error>}
              <fieldset>
                <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Tu Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="consola">Consola</label>
                  <input
                    type="text"
                    id="consola"
                    placeholder="Nombre de la Consola del Juego"
                    name="consola"
                    value={consola}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <input
                    accept="image/*"
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleSubirImagen}
                  />
                </Campo>

                <Campo>
                  <label htmlFor="url">Url</label>
                  <input
                    type="url"
                    id="url"
                    placeholder="Url del blog"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
              </fieldset>

              <fieldset>
                <legend>Sobre el Juego</legend>
                <Campo>
                  <label htmlFor="descripción">Descripción</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
              </fieldset>

              <InputSubmit type="submit" value="Crear Producto" />
            </Formulario>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NuevoProducto;
