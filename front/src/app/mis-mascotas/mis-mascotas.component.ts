import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../services/mascotas.service'; // Asegúrate de tener la ruta correcta

@Component({
  selector: 'app-mis-mascotas',
  templateUrl: './mis-mascotas.component.html',
  styleUrls: ['./mis-mascotas.component.css']
})
export class MisMascotasComponent implements OnInit {

  mascotas: any[] = [];
  correoUsuario: string = ''; // Inicialmente vacío

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    // Obtén el correo del localStorage cuando el componente se inicialice
    const email = localStorage.getItem('email');
    if (email) {
      this.correoUsuario = email;
      this.obtenerMascotas(); // Llama a la función si el correo está presente
    } else {
      console.error('No se encontró el correo en el almacenamiento local');
    }
  }

  obtenerMascotas(): void {
    this.mascotasService.getMascotasByCorreo(this.correoUsuario).subscribe({
      next: (data) => {
        this.mascotas = data;
        console.log('Mascotas:', this.mascotas);
      },
      error: (err) => console.error('Error al obtener las mascotas', err)
    });
  }
}
