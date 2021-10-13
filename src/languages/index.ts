type Message = {
  errors: {
    [key: string]: any;
  };
};
export const MESSAGES = {
  errors: {
    es: {
      UserNotFound: 'Usuario no registrado',
      UserNotConfirmed: 'No se ha confirmado el usuario',
      UserInactive: 'Usuario inactivo',
      PaymentInvalid: 'El valor de pago es diferente al valor del plan',
      SessionLimitExceedError: 'El número de sesiones activas ha sido excedido',
      SessionError: 'Erro en la sesión',
      EmailAlreadyTaken: 'Email ya utilizado',
      SingupUserInternalError: 'Error al registrar el usuario',
      JWTIncorrect: 'Token incorrecto',
      TokenInvalidSignature: 'Token con signature incorrecta',
      JWTTokenError: 'Token incorrecto',
      TokenMissing: 'Credenciales incorrectas',
      SessionIdInvalid: 'Session incorrecta',
      UserSubInvalid: 'User sub incorrecto',
      ExpiredCodeException: 'Código vencido, solicite uno nuevo',
    },
  },
} as Message;