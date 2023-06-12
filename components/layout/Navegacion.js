import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "@/firebase";

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 2rem;
    margin-left: 2rem;
    color: var(--lila);
    font-family: "Ysabeau", sans-serif;
    font-style: oblique;
    font-weight: bolder;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navegacion = () => {
  const { usuario } = useContext(FirebaseContext);
  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      {usuario && <Link href="/nuevo-producto">Añadir Blog</Link>}
    </Nav>
  );
};

export default Navegacion;
