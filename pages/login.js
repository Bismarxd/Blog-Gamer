import React from "react";
import { useState } from "react";
import Router from "next/router";
import Layout from "@/components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Error,
} from "@/components/ui/Formulario";
import styled from "@emotion/styled";

import firebase from "@/firebase";

//validaciones
import useValidacion from "@/hooks/useValidacion";
import validarIniciarSesion from "@/validacion/validarIniciarsesion";

 const STATE_INICIAL = {
   nombre: "",
   email: "",
   password: "",
 };

const Login = () => {
  const [error, setError] = useState(false);
  //estilos
  const H1 = styled.div`
    text-align: center;
    margin-top: 4rem;
  `;

  //funciones
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const {email, password } = valores;

  async function iniciarSesion() {
   try {
    await firebase.login(email, password);
    Router.push('/')
    
   } catch (error) {
     console.error("Hubo un error al autenticar el usuario", error.message);
     setError(error.message);
   }
  }
  return (
    <div>
      <Layout>
        <>
          <h1>
            <H1>Iniciar Sesión</H1>
          </h1>
          <Formulario onSubmit={handleSubmit}>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            {errores.email && <Error>{errores.email}</Error>}
            {errores.password && <Error>{errores.password}</Error>}
            {error && <Error>{error}</Error>}
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            <InputSubmit type="submit" value="Iniciar Sesión" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;
