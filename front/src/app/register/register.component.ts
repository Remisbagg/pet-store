import { Component } from '@angular/core';
import { UsuarioServiceService } from '../services/usuario-service.service';
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
  ) { }

  // Función de validación de los campos
  validarFormulario(): boolean {
    // Validar que no haya campos vacíos
    if (!this.name || !this.email || !this.password) {
      this.toastr.error('Nombre, correo y contraseña son requeridos', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.toastr.error('Formato de correo inválido', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar que el nombre no contenga números y su longitud
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(this.name) || this.name.length > 50) {
      this.toastr.error('El nombre debe contener solo letras y no puede superar los 50 caracteres', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar edad (no mayor a 100)
    if (this.number && (this.number < 0 || this.number > 100)) {
      this.toastr.error('La edad debe ser un número entre 0 y 100', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar longitud del email
    if (this.email.length > 100) {
      this.toastr.error('El correo no puede tener más de 100 caracteres', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar longitud de la contraseña
    if (this.password.length > 50) {
      this.toastr.error('La contraseña no puede tener más de 50 caracteres', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar longitud del número de celular (máx. 15 caracteres)
    if (this.numberCel && this.numberCel.toString().length > 15) {
      this.toastr.error('El número de celular no puede superar los 15 caracteres', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar longitud de la dirección
    if (this.direccion.length > 100) {
      this.toastr.error('La dirección no puede superar los 100 caracteres', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar que no haya caracteres raros para evitar inyección SQL
    const sqlInjectionRegex = /['"\\;]/;
    if (
      sqlInjectionRegex.test(this.name) || 
      sqlInjectionRegex.test(this.email) || 
      sqlInjectionRegex.test(this.password) ||
      sqlInjectionRegex.test(this.direccion)
    ) {
      this.toastr.error('Los datos contienen caracteres no permitidos', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    return true; // Si todo está bien
  }

  // Función de registro
  Registrarse() {
    // Verificar si el formulario es válido
    if (!this.validarFormulario()) {
      return;
    }

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
        this.router.navigate(['/login']);
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
