import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UsuarioServiceService } from '../usuario-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Propiedades del formulario
  name: string = "";
  email: string = "";
  number: number | null = null;
  genero: string = "";
  numberCel: number | null = null;
  direccion: string = "";
  password: string = "";



  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}



  // Función de registro
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
        this.toastr.success('Usuario creado', '¡Éxito!', {
          timeOut: 5000,
          closeButton: true
        });
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error en el registro:', error);
        this.toastr.error('Error en el registro', 'Error', {
          timeOut: 5000,
          closeButton: true
        });
      }
    );
  }
}
