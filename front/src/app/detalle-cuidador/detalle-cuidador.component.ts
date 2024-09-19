import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cuidadorService } from '../services/cuidador-service.service';
import { ToastrService } from 'ngx-toastr'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-cuidador',
  templateUrl: './detalle-cuidador.component.html',
  styleUrl: './detalle-cuidador.component.css'
})
export class DetalleCuidadorComponent implements OnInit {
  cuidador: any; // Define un tipo adecuado si tienes uno
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cuidadorService: cuidadorService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit() {
    // Recupera el ID de la mascota desde la ruta
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        // Llama al servicio para obtener la información de la mascota
        this.cuidadorService.getCuidadorById(this.id).subscribe(
          data => {
            this.cuidador = data;
          },
          error => {
            console.error('Error al obtener la mascota:', error);
          }
        );
      }
    });
  }
  
  deleteCuidador(id: string) {
    this.cuidadorService.deleteCuidador(id).subscribe(
      response => {
        console.log('Cuidador eliminad@:', response);
        this.toastr.success('Cuidador eliminad@ exitosamente!', 'Éxito');
        this.router.navigate(['/cuidadores']);
      },
      error => {
        console.error('Error:', error);
        this.toastr.error('No se pudo eliminar la mascota', 'Error');
      }
    );
  }
}