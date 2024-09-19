import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../services/usuario-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // Propiedades para los campos del formulario
  name: string = '';
  email: string = '';
  number: number | null = null;
  genero: string = '';
  numberCel: number | null = null;
  direccion: string = '';
  password: string = '';
  rol: string = '';

  constructor(
    private usuarioService: UsuarioServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  // Método para cargar el perfil del usuario
  loadUserProfile() {
    const email = localStorage.getItem('email'); // Obtener el correo del almacenamiento local
    if (email) {
      this.usuarioService.getUserProfile(email).subscribe(
        (data: any) => {
          this.name = data.NombreUsuario;
          this.email = data.CorreElectronico;
          this.number = data.Edad;
          this.genero = data.Genero;
          this.numberCel = data.NumeroCelular;
          this.direccion = data.Direccion;
        },
        (error) => {
          console.error('Error al cargar el perfil del usuario:', error);
        }
      );
    }
  }

  // Función de validación del perfil
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

  // Método para manejar la actualización del perfil
  updateProfile() {
    if (!this.validarFormulario()) {
      return;
    }

    const email = this.email;
    if (email) {
      const userProfile = {
        nombre: this.name,
        email: this.email,
        edad: this.number,
        genero: this.genero,
        numeroCelular: this.numberCel,
        direccion: this.direccion,
        password: this.password,
      };
      this.usuarioService.updateUserProfile(email, userProfile).subscribe(
        (response: any) => {
          console.log('Perfil actualizado exitosamente');
          this.toastr.success('Perfil actualizado con éxito', 'Éxito', {
            timeOut: 5000
          });
        },
        (error) => {
          console.error('Error al actualizar el perfil:', error);
          this.toastr.error('Error al actualizar el perfil', 'Error', {
            timeOut: 5000
          });
        }
      );
    }
  }
}
