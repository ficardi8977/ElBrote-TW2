export class CuentaRecuperacion {
    email: string;
    password: string;
    codigoVerificador: string;

    constructor(email: string = '', password: string = '', codigoVerificador: string = '') {
      this.email = email;
      this.password = password;
      this.codigoVerificador = codigoVerificador;
    }
  }