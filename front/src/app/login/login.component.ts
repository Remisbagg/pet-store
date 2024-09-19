import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import { UsuarioServiceService } from '../services/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private toastr: ToastrService  // Inyecta el servicio Toastr
  ) {}

  // Función para validar el formulario
  validarFormulario(): boolean {
    // Validar que el email no esté vacío y tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      this.toastr.error('Por favor, introduce un correo válido', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar que la contraseña no esté vacía
    if (!this.password) {
      this.toastr.error('Por favor, introduce tu contraseña', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    // Validar que no haya caracteres peligrosos en el email o contraseña (prevención de SQL injection)
    const sqlInjectionRegex = /['"\\;]/;
    if (sqlInjectionRegex.test(this.email) || sqlInjectionRegex.test(this.password)) {
      this.toastr.error('Los datos contienen caracteres no permitidos', 'Error', {
        timeOut: 5000
      });
      return false;
    }

    return true; // Si todas las validaciones pasan
  }

  // Función de inicio de sesión
  login() {
    // Validar formulario antes de enviar
    if (!this.validarFormulario()) {
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.usuarioService.login(credentials).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);

        // Mostrar toast verde de éxito
        this.toastr.success('Inicio de sesión exitoso', '¡Éxito!', {
          timeOut: 5000,
          closeButton: true
        });

        // Redirigir al dashboard
        this.router.navigate(['/home']);
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);

        // Mostrar toast rojo de error
        this.toastr.error('Credenciales incorrectas', 'Error', {
          timeOut: 5000,
          closeButton: true
        });
      }
    );
  }
}
