import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from '../services/servicio.service';
import { cuidadorService } from '../services/cuidador-service.service';
import { MascotasService } from '../services/mascotas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  id: string | null = null;
  mascota: any;
  servicio: string = '';
  cuidador: number | null = null;
  cuidadores: Array<{ id: number, nombre: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private ServicioService: ServicioService,
    private mascotasService: MascotasService,
    private cuidadoresService: cuidadorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log("La ideota: ",this.id);
      if (this.id !== null) { console
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
    this.cargarCuidadores();
  }

  cargarCuidadores(): void {
    this.cuidadoresService.getCuidador().subscribe(
      response => {
        this.cuidadores = response;
      },
      error => {
        console.error('Error al cargar los cuidadores:', error);
        this.toastr.error('No se pudieron cargar los cuidadores', 'Error');
      }
    );
  }

  asignarServicio(): void {
    if (this.id === null) {
      this.toastr.error('ID de mascota no válido', 'Error');
      return;
    }

    const servicio = {
      id_mascota: this.id,
      servicio: this.servicio,
      cuidador: this.cuidador,
    };

    console.log ("el servicio:", servicio);
    this.ServicioService.asignarServicio(servicio).subscribe(
      response => {
        this.toastr.success('Servicio asignado exitosamente', 'Éxito');
        this.router.navigate(['/misMascotas']);
      },
      error => {
        console.error('Error al asignar el servicio:', error);
        this.toastr.error('Error al asignar el servicio', 'Error');
      }
    );
  }
}

