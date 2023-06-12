import React from "react";
import Buscar from "../ui/Buscar";
import Navegacion from "./Navegacion";
import Link from "next/link";
import styled from "@emotion/styled";
import Boton from "../ui/Boton";
import { FirebaseContext } from "@/firebase";
import { useContext } from "react";

// Definición de estilos
const Headers = styled.header`
  border-bottom: 1rem solid var(--celeste3);
  padding: 2rem 0;
`;

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 80%
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: var(--lila);
  font-size: 5rem;
  line-height: 0;
  font-weight: bolder;
  text-transform: uppercase;
  font-family: 'Kanit', sans-serif;
  margin-right: 2rem;
`;

const DivFlex = styled.div`
  display: flex;
  align-items: center;
`;

const DivNavegacion = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem
`

const Header = () => {

  const {usuario, firebase} = useContext(FirebaseContext);
  

  return (
    <Headers>
      <ContenedorHeader>
        <DivNavegacion>
          <Link href="/">
            <Logo>Blog Gamer</Logo>
          </Link>
          
          <Buscar />

          <Navegacion />
        </DivNavegacion>

        <DivFlex>
          {usuario ? (
            <>
               <p>Hola: {usuario.displayName}</p>

              <Boton 
                bgColor="true"
                onClick={() => firebase.cerrarSesion()}
              >Cerrar Sesión</Boton>
            </>
           
  
           
          ) : (
            <>
              <Link href="/login">
              <Boton bgColor="true">Login</Boton>
              </Link>

              <Link href="/crear-cuenta">
                <Boton>Crear Cuenta</Boton>
              </Link>
            </>      

          )}
        </DivFlex>
      </ContenedorHeader>
    </Headers>
  );
}

export default Header;