import React from 'react'
import { useState } from 'react'
import styled from '@emotion/styled'
import Router from 'next/router'

const Formulario = styled.form`
  position: relative;
`

const InputText = styled.input`
  background-color: #f2f2f2;
  border: 1px solid var(--celeste3);
  border-radius: 20px;
  font-size: 1.2rem;
  padding: 1rem;
  margin-right: 1rem;
`
const InputSubmit = styled.button`
  height: 2rem;
  width: 2rem;
  display: block;
  background-size: 2rem;
  background-image: url('static/img/buscar.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  background-color: white;
  border:none;
  text-indent: -9999;

  &:hover {
    cursor: pointer;
  }
`

const Buscar = () => {
  const [busqueda, setBusqueda] = useState('')

  const buscarProducto = e => {
    e.preventDefault();

    if (busqueda.trim() === '') {
      return
    }

    //redireccionar al usuario a /buscar
    Router.push({
      pathname: '/buscar',
      query: {q: busqueda}
    })
  }
  return (
    <Formulario
      onSubmit={buscarProducto}
    >
      <InputText
        type='text'
        placeholder='Buscar'
        onChange={e => setBusqueda(e.target.value)}
      />

      <InputSubmit
        type='submit'
        
      ></InputSubmit>

    </Formulario>
  )
}

export default Buscar