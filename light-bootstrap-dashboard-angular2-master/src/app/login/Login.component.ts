import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  // Importar Toastr
import { UsuarioServiceService } from 'app/service/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private toastr: ToastrService  // Inyecta el servicio Toastr
  ) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.usuarioService.login(credentials).subscribe(
      response => {
        console.log('Inicio de sesión exitoso:', response);

        // Mostrar toast verde de éxito
        this.toastr.success('Inicio de sesión exitoso', '¡Éxito!', {
          timeOut: 5000,
          closeButton: true
        });

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      },
      error => {
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
