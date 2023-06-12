import React from 'react'
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import es from 'date-fns/locale/es';
import Link from "next/link";

const Producto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px solid #e1e1e1;

  & > :first-child {
    flex-grow: 1;
  }
`;

const DescripconProducto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const Titulo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  :hover {
    cursor: pointer;
  }
`

const TextoDescripcion = styled.p`
  font-size: 1.6rem;
  margin: 0;
`

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 2px solid #e1e1e1;
    padding: 0.3rem 1 rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;

    &: last-of-type{
      margin: 0;
      margin-right: 1rem;
    }
  }
`
const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 2px solid #e1e1e1;
  margin-left: 1rem;
  padding: 1rem 3rem;

  div{
    font-size: 2rem;
  }
  p{
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`

const Imagen = styled.img`
  width: 40rem;
  margin-top: 2rem;
`

const DetallesProducto = ({producto}) => {
  const {id, comentarios, creado, descripcion, consola, nombre, url, URLImagen, likes} = producto
  return (
    <Producto>
      <DescripconProducto>
        <div>
          <Imagen src={URLImagen} />
        </div>

        <div>

          <Link href={"/productos/[id]"} as={`/productos/${id}`}>
            <Titulo>{nombre}</Titulo>
          </Link>
          <TextoDescripcion>{descripcion}</TextoDescripcion>

          <Comentarios>
            <div>
              <img src="/static/img/comentario.png" />
              <p>{comentarios.length} Comentarios</p>
            </div>
          </Comentarios>
          <p>
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </p>
        </div>
      </DescripconProducto>

      <Votos>
        <div>&#9650;</div>
        <p>{likes}</p>
      </Votos>
    </Producto>
  );
}

export default DetallesProducto