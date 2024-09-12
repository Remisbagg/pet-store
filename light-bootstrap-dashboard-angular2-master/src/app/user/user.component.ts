import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  // Propiedades para los campos del formulario
  name: string = '';
  email: string = '';
  number: number | null = null;
  genero: string = '';
  numberCel: number | null = null;
  direccion: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {
  }

  // Método para manejar el registro
  Registrarse() {
    // Aquí puedes implementar la lógica para manejar el registro
    console.log('Registro completado:', {
      name: this.name,
      email: this.email,
      number: this.number,
      genero: this.genero,
      numberCel: this.numberCel,
      direccion: this.direccion,
      password: this.password
    });
  }
}
