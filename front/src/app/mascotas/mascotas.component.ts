import { Component } from '@angular/core';
import { MascotasService } from '../services/mascotas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent {

  nombreMascota: string = '';
  edadMascota: number | null = null;
  razaMascota: string = '';
  correoUsuario = localStorage.getItem('email');
  vacunas: string = '';
  descripcionMascota: string = '';

  constructor(
    private mascotasService: MascotasService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Validar los datos del formulario (opcional, ya que se usa required en HTML)
  validarFormulario(): boolean {
    if (!this.nombreMascota || !this.edadMascota || !this.razaMascota || !this.correoUsuario || !this.vacunas || !this.descripcionMascota) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return false;
    }
    return true;
  }

  // Función para registrar la mascota
  registrarMascota() {
    if (!this.validarFormulario()) {
      return;
    }

    const mascota = {
      nombre: this.nombreMascota,
      edad: this.edadMascota,
      raza: this.razaMascota,
      correoUsuario: this.correoUsuario,
      vacunas: this.vacunas,
      descripcion: this.descripcionMascota
    };

    this.mascotasService.registerMascota(mascota).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.toastr.success('Mascota registrada exitosamente', 'Éxito');
        this.router.navigate(['/misMascotas']);
      },
      error => {
        this.toastr.error('Error al registrar la mascota', 'Error');
        console.error('Error en el registro:', error);
      }
    );
  }
}
