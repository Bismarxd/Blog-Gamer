import { useEffect, useState, useContext } from 'react'
import React from 'react'
import { Router, useRouter } from 'next/router'

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import es from "date-fns/locale/es";

import Layout from '@/components/layout/Layout'
import { FirebaseContext } from '@/firebase'
import { collection, getDoc, doc, updateDoc ,deleteDoc } from 'firebase/firestore'
import { getStorage, ref, deleteObject } from "firebase/storage";
import Error404 from '@/components/layout/404'
import styled from '@emotion/styled'
import { Campo, InputSubmit } from '@/components/ui/Formulario';
import Boton from '@/components/ui/Boton';

const ContenedorProducto = styled.div`
  @media (min-width: 768px){
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`

const H1 = styled.h1`
  text-align: center;
  margin-top:  5rem;
`
const H2 = styled.h2`
  margin: 2rem 0;
`;

const P = styled.p`
  text-align: center;
  margin: 4rem;
`;

const Li = styled.li`
  border: 5px solid #e1e1e1;
  padding: 2rem;
  margin-top: 1rem;
`;

const Span = styled.span`
  font-weight: bold;
`;

const CreadorProducto = styled.p`
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Producto = () => {
  //State del componente
  const [producto, setProducto] = useState({});
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [vaciarComentrio, setVaciarComentario] = useState('')
  const [consultaDB, setConsultaDB] = useState(true)

  //Routing pra itener el id actual
  const router = useRouter()
  const {query: {id}} = router;

  //context de firebse
  const {firebase, usuario} = useContext(FirebaseContext)

  useEffect(() => {
    if (id && consultaDB) {
      const obtenerProducto = async () => {
        const productoQuery = await doc(collection(firebase.db, 'productos'), id);
        const producto = await getDoc(productoQuery)
        if (producto.exists()) {
          
          setProducto(producto.data());
          setConsultaDB(false);
        }else{
          
          setError(true);
          setConsultaDB(false);
        }
      }
      obtenerProducto();
    }
    
  }, [id, producto])

  if (Object.keys(producto).length === 0 && !error) return 'Cargando...'

  
  const {
    comentarios,
    creado,
    descripcion,
    consola,
    nombre,
    url,
    URLImagen,
    likes,
    creador,
    haVotado
  } = producto;
  
//administrar y valir los votos
const votarProducto =async () => {
  if (!usuario) {
    return Router.push('/login')
  }

  //Obtener y sumar unnuevo voto
  const totalLikes = likes+1;

  //Verificar si el usario ha votado
  if (haVotado.includes(usuario.uid)) return;

  //Guarar el ID del usario que ha
  const nuevoHanVotado = [...haVotado, usuario.uid];
  
  //Actualizar en la base de datos
  const productoQuery = await doc(collection(firebase.db, 'productos'), id);
  
    updateDoc(productoQuery, {
      likes: totalLikes,
      haVotado: nuevoHanVotado,
    });
  


  //Actualizar el state
  setProducto({
    ...producto,
    likes: totalLikes
  })

  setConsultaDB(true); //hay un voto y consulta a la base de datos
}

//Funciones para crear cpomentarios
const comentariosChange = e => {
    setComentario({
      ...comentario,
      [e.target.name] : e.target.value
    })

    setVaciarComentario(e.target.value)

}

//Identifica si el comentario es ele creador 
const esCreador = id => {
  if (creador.id == id) {
    return true;
  }
}

const agregarComentario =async e => {
  e.preventDefault();

  

  if (!usuario) {
    return Router.push("/login");
  }
  //informacion extra al comentario
  comentario.usuarioId = usuario.uid;
  comentario.usuarioNombre = usuario.displayName;

  //Tomar copia de Comentarios y agregarlos al arreglo
  const nuevosComentarios = [...comentarios, comentario];

  //Actualizar la BD
  const productoQuery = await doc(collection(firebase.db, "productos"), id);

  updateDoc(productoQuery, {
    comentarios: nuevosComentarios,
  });

  //Actualizar el state
  setProducto({
    ...producto,
    comentarios: nuevosComentarios,
  });
  
  setVaciarComentario("");

  setConsultaDB(true); //hay un comentario y consulta a la base de datos
  
}

//Fucion que revisa que el reaor del producto sea el mismo autenticado
const puedeBorrar = () => {
  if (!usuario) return false;

  if (creador.id === usuario.uid) {
    return true;
  }
}

//Elimina un Producto de la BD.
const eliminarProducto = async() => {
   if (!usuario) {
     return Router.push("/login");
   }

   if (creador.id !== usuario.uid) {
     return Router.push("/");
   }

  try {
    //Eliminar el Producto
    await deleteDoc(doc(firebase.db, "productos", id));
     // Eliminar imagen
      const storage = getStorage()
      const imgRef = ref(storage, URLImagen)
      deleteObject(imgRef)
        .then(() => {
          // Imagen eliminada correctamente
        })
        .catch((error) => {
          console.log(error);
        });

        router.push('/')
    
     
  } catch (error) {
    console.log(error); 
  }
}

  return (
    <Layout>
      <>
        {error ? <Error404 /> : (
              <div className="contenedor">
          <H1>{nombre}</H1>
          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:{" "}
                {formatDistanceToNow(new Date(creado), { locale: es })}
              </p>
              <p>Por:{creador.nombre}</p>
              <h3>Displonible en: {consola}</h3>
              <img src={URLImagen} />
              <p>{descripcion}</p>

              <h2>Comentar</h2>
              {usuario && (
                <form onSubmit={agregarComentario}>
                  <Campo>
                    <input
                      type="text"
                      name="mensaje"
                      value={vaciarComentrio}
                      onChange={comentariosChange}
                    />
                  </Campo>
                  <InputSubmit type="submit" value="Agregar Comentario" />
                </form>
              )}
              <H2>Comentarios</H2>

              {comentario.length === 0 ? (
                "aun no hay comentarios"
              ) : (
                <ul>
                  {comentarios.map((comentario) => (
                    <Li key={`${comentario.usuarioI}-${id}`}>
                      <p>{comentario.mensaje}</p>
                      <p>
                        Escrito por:
                        <Span>{comentario.usuarioNombre}</Span>
                      </p>
                      {esCreador(comentario.usuarioId ) && <CreadorProducto>Autor</CreadorProducto>}
                    </Li>
                  ))}
                </ul>
              )}
            </div>

            <aside>
              <Boton target="_blank" bgColor="true" href={url}>
                Visitar el Blog
              </Boton>

              <div>
                <P>{likes} Likes</P>

                {usuario && <Boton onClick={votarProducto}>Dar Like</Boton>}
              </div>
            </aside>
          </ContenedorProducto>
          {puedeBorrar() && 
            <Boton
              onClick={eliminarProducto}
              bgColor={true}
            >Eliminar Producto</Boton>
          }
        </div>
        )}

        
      </>
    </Layout>
  );
}

export default Producto