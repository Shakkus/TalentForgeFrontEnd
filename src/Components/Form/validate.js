const passwordValidator = (value) => {
  if (!/(?=\w*[A-Z])/.test(value)) {
    return "La contraseña debe contener al menos una mayúscula";
  } else if (!/(?=\w*[a-z])/.test(value)) {
    return "La contraseña debe contener al menos una minúscula";
  } else if (!/\S{8,16}/.test(value)) {
    return "La contraseña debe contener entre 8 y 16 caracteres";
  } else {
    return "La contraseña es válida";
  }
};

export { passwordValidator };
