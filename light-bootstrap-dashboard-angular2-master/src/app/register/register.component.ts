import { Component } from '@angular/core';
import { UsuarioServiceService } from 'app/service/usuario-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string;
  email: string;
  number: number;
  genero: string;
  numberCel: number;
  direccion: string;
  password: string;

  constructor(private usuarioService: UsuarioServiceService) {}

  Registrarse() {
    const user = {
      nombre: this.name,
      email: this.email,
      edad: this.number,
      genero: this.genero,
      numeroCelular: this.numberCel, 
      direccion: this.direccion,
      password: this.password
    };

    // Log para verificar qué datos se están enviando
    console.log('Datos de registro a enviar:', user);

    this.usuarioService.register(user).subscribe(
      response => {
        console.log('Registro exitoso:', response);
      },
      error => {
        console.error('Error en el registro:', error);
      }
    );
  }
}