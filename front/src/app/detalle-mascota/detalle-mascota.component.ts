import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotasService } from '../services/mascotas.service'; // Asegúrate de tener el servicio de mascotas
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.component.html',
  styleUrls: ['./detalle-mascota.component.css']
})
export class DetalleMascotaComponent implements OnInit {
  mascota: any; // Define un tipo adecuado si tienes uno
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private mascotasService: MascotasService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit() {
    // Recupera el ID de la mascota desde la ruta
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        // Llama al servicio para obtener la información de la mascota
        this.mascotasService.getMascotaById(this.id).subscribe(
          data => {
            this.mascota = data;
          },
          error => {
            console.error('Error al obtener la mascota:', error);
          }
        );
      }
    });
  }
  
  deleteMascota(id: string) {
    this.mascotasService.deleteMascota(id).subscribe(
      response => {
        console.log('Mascota eliminada:', response);
        this.toastr.success('Mascota eliminada exitosamente!', 'Éxito');
        this.router.navigate(['/misMascotas']);
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('No se pudo eliminar la mascota', 'Error');
      }
    );
  }
}