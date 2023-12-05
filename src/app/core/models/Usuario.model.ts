export class Usuario {
    id: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
  
    constructor(email: string = '', password: string = '', nombre: string = '', apellido: string = '', direccion: string = '') {
      this.email = email;
      this.password = password;
      this.nombre = nombre;
      this.apellido = apellido;
      this.direccion = direccion;
    }
  }