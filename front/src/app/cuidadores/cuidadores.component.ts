import { Component, OnInit } from '@angular/core';
import { cuidadorService } from '../services/cuidador-service.service';

@Component({
  selector: 'app-cuidadores',
  templateUrl: './cuidadores.component.html',
  styleUrl: './cuidadores.component.css'
})
export class CuidadoresComponent implements OnInit {

  cuidadores: any[] = [];
  correoUsuario: string = ''; // Inicialmente vacío

  constructor(private cuidadorService: cuidadorService) {}

  ngOnInit(): void {
    // Obtén el correo del localStorage cuando el componente se inicialice
    const email = localStorage.getItem('email');
    if (email) {
      this.correoUsuario = email;
      this.obtenercuidadores(); // Llama a la función si el correo está presente
    } else {
      console.error('No se encontró el correo en el almacenamiento local');
    }
  }

  obtenercuidadores(): void {
    this.cuidadorService.getCuidador().subscribe({
      next: (data) => {
        this.cuidadores = data;
        console.log('Cuidadores:', this.cuidadores);
      },
      error: (err) => console.error('Error al obtener las cuidadores', err)
    });
  }
}
