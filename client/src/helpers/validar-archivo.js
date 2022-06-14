export const validarArchivo = (extencion, permitidas = ['png', 'jpg', 'jpeg', 'gif']) => {
  if(!permitidas.includes(extencion)){
    return `La extencion ${extencion} no es permitida`
  }

  return true;
}