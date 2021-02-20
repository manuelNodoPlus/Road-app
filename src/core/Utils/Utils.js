// import googleLibphonenumber from 'google-libphonenumber';
// const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();
import React, { useState } from 'react';
import { showMessage, hideMessage } from "react-native-flash-message";

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'El correo no puede estar vacío.';
  if (!re.test(email)) return '¡Uuuups! Debes ingresar un correo valido.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) 'La contraseña no puede estar vacia.';
  if (!password.match(/[a-z]/g))  return 'Debe contener minúsculas.';
  if (!password.match(/[A-Z]/g))  return 'Debe contener mayúsculas.';
  if (!password.match(/[1-9]/g))  return 'Debe contener números.';
  if (password.length < 8) return 'Debe tener por lo menos ocho caracteres.';
  return '';
};

export const confirmPasswordValidator = (password, comfirmPassword) => {
  if (password !== comfirmPassword) return 'Las contraseñas no coinciden.';
  return '';
};

export const passwordEmptyValidator = password => {
  if (!password || password.length <= 0) 'La contraseña no puede estar vacia.';
  return '';
};


export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const input = text => {
  if (!text || text.length <= 0) return 'No puede estar vacio';

  return '';
};

export const authError = (code) => {
  switch (code) {
      case 'email-already-exists':
          return 'El correo ya existe';
          break;
      case 'auth/invalid-email':
          return 'Correo invalido';
          break;
      case 'invalid-email-verified':
          return 'El correo no ha sido verificado';
          break;
      case 'auth/invalid-password':
          return 'Usuario o contraseña incorrectos';
          break;
      case 'auth/user-not-found':
          return 'El correo no se encuentra registrado';
          break;
      case 'auth/email-already-in-use':
          return 'El correo ya está registrado';
          break;
      default:
          return 'Ocurrio un error, por favor intenta más tarde';
          break;
  }
}

export const showNotification = (message, type) => {
  showMessage({
    message,
    type,
  });
};