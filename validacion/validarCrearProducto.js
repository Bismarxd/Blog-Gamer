export default function validarCrearProducto(valores) {
  let errores = {};

  //valiar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "El Nombre es Obligatorio";
  }

  //valiar la empres
  if (!valores.consola) {
    errores.consola = "El Nombre de la Consola es Obligatorio";
  } 
  //validar la url
  if (!valores.url) {
    errores.url = "La url del juego es Obligatorio";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "Url no valida";
  }

  //validar descripcion
  if (!valores.descripcion) {
    errores.descripcion = "La descripcion es obligatoria";
  }

  return errores;
}
