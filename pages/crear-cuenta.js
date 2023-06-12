import React, { useState } from 'react'
import Router from 'next/router';
import Layout from '@/components/layout/Layout'
import { Formulario, Campo, InputSubmit, Error } from '@/components/ui/Formulario';
import styled from '@emotion/styled';

import firebase from '@/firebase';

//validaciones
import useValidacion from '@/hooks/useValidacion';
import validarCrearCuenta from '@/validacion/validarCrearCuenta';

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

const Crearcuenta = () => {

  const [error, setError] = useState(false)


  //estilos
  const H1 = styled.div`
    text-align: center;
    margin-top: 4rem; 
  `

  //funciones
  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const {nombre, email, password} = valores;

  async function crearCuenta () {
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/');

    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message);
      setError(error.message)
    }
      

    
  }
  
  return (
    <div>
      <Layout>
        <>
          <h1>
            <H1>Crear Cuenta</H1>
          </h1>
          <Formulario onSubmit={handleSubmit}>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            {errores.email && <Error>{errores.email}</Error>}
            {errores.password && <Error>{errores.password}</Error>}
            {error && <Error>{error}</Error>}
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

            

            <InputSubmit type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  );
}

export default Crearcuenta