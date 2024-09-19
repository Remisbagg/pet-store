import { Component } from '@angular/core';
import { cuidadorService } from '../services/cuidador-service.service'; // Cambié el servicio a CuidadoresService
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-cuidador',
  templateUrl: './registro-cuidador.component.html', // El nombre del archivo HTML debe ser actualizado
  styleUrls: ['./registro-cuidador.component.css']
})
export class RegistroCuidadorComponent {

  nombre: string = ''; // Campo nombre del cuidador
  cedula: string = ''; // Campo cedula del cuidador

  constructor(
    private cuidadorService: cuidadorService, // Cambié a CuidadoresService
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Validar los datos del formulario
  validarFormulario(): boolean {
    if (!this.nombre || !this.cedula) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return false;
    }
    return true;
  }

  // Función para registrar el cuidador
  registrarCuidador() {
    if (!this.validarFormulario()) {
      return;
    }

    const cuidador = {
      nombre: this.nombre,
      cedula: this.cedula
    };

    this.cuidadorService.registerCuidador(cuidador).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.toastr.success('Cuidador registrado exitosamente', 'Éxito');
        this.router.navigate(['/cuidadores']); // Redirige a la lista de cuidadores tras el registro
      },
      error => {
        this.toastr.error('Error al registrar el cuidador', 'Error');
        console.error('Error en el registro:', error);
      }
    );
  }
}
