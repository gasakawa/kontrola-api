type Message = {
  [key: string]: {
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
      NotAuthorizedException: 'Usuario y/o contraseña incorrectos',
      CodeMismatchException: 'Código de verificación incorrecto, intente nuevamente',
      AdminCreateUserError: 'Error al intentar crear el usuario',
      UserAlreadyConfirmed: 'Este usuario ya fué confirmado',
      WrongTemporayPassword: 'Datos de acceso temporal incorrectos',
      EmailNotFound: 'E-mail no registrado',
      CompanyNotFound: 'Empresa no registrada',
    },
  },
  success: {
    es: {
      PasswordResetCode: 'Código enviado',
      UserUpdated: 'Usuario actualizado con éxito',
      AccessControlGranted: 'Accesso permitido',
      AccessControlDenied: 'Acceso negado',
      AccessControlUserInactive: 'Acceso negado - Usuario inactivo',
      AccessControlInvalidHeadquarter: 'Accesso negado - Usuario de otra sede',
    },
  },
} as Message;
