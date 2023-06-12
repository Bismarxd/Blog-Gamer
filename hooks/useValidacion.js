import React, { useState, useEffect } from "react";


const useValidacion = (stateInicial, validar, fn) => {
  const [valores, setValores] = useState(stateInicial);
  const [errores, setErrores] = useState({})
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;

      if (noErrores) {
        fn(); //fn = la funcion que se ejecuta en el componente
      }
      setSubmitForm(false);
    }
  },[errores])

  //Funcion que se ejecuta cuando el usuario escribe align-content: 
  const handleChange = e => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value,
    });
  }

  //Funcion que se ejecuta cunao el usuario hace submit
  const handleSubmit = e => {
    e.preventDefault();
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion);
    setSubmitForm(true);
  }

  //Cunado se realiza el eveneto Blur
  const handleBlur = () => {
    const erroresValidacion = validar(valores);
    setErrores(erroresValidacion)
  }
  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  };
}

export default useValidacion