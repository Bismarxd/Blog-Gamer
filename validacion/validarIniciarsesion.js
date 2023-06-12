export default function validarIniciarSesion(valores) {
  let errores = {};


  //valiar el email
  if (!valores.email) {
    errores.email = "El Email es Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no Valido";
  }

  //valiar el pasword
  if (!valores.password) {
    errores.password = "El Pasword es Obligatorio";
  } else if (valores.password.length < 6) {
    errores.password = "El Password debe tener almenos 6 Caracteres";
  }

  return errores;
}
