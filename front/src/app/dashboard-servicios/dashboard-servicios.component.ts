import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioServiceService } from '../services/usuario-service.service';
import { ServicioService } from '../services/servicio.service';
import { MascotasService } from '../services/mascotas.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";


export interface Asignacion {
  cuidador: string;
  servicio: string;
  perroId: string; // Usa `perroId` en lugar de `perro` para representar el ID
}

export interface Mascota {
  id: string;
  nombre: string;
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard-servicios',
  templateUrl: './dashboard-servicios.component.html',
  styleUrls: ['./dashboard-servicios.component.css']
})
export class DashboardServiciosComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  cuidadoresData: { cuidador: string, servicios: number }[] = [];
  usuariosCount: number = 0;
  cuidadoresCount: number = 0;
  serviciosCount: number = 0;
  mascotasPendientes: number = 0;
  

  constructor(
    private usuarioService: UsuarioServiceService,
    private ServicioService: ServicioService
  ) { }

  ngOnInit(): void {
    this.loadCuidadoresData();
    this.loadCounts();
  }

  loadCuidadoresData(): void {
    this.ServicioService.getServiciosPorCuidador().subscribe(response => {
      this.cuidadoresData = response; 
      console.log('Cuidadores Data Response:', response);
  
      this.createCharts();
    }, error => {
      console.error('Error al obtener los datos de los cuidadores', error);
    });
  }
  loadCounts(): void {
    this.usuarioService.getUserCount().subscribe(response => {
      console.log('Usuarios Count Response:', response);
      this.usuariosCount = response.count;
    });

    this.usuarioService.getCuidadoresCount().subscribe(response => {
      this.cuidadoresCount = response.count;
    });

    this.usuarioService.getServiciosCount().subscribe(response => {
      this.serviciosCount = response.count;
    });

    this.usuarioService.getMacotasCount().subscribe(response => {
      console.log('Macotas Count Response:', response);
      this.mascotasPendientes = response.count;
    });
  }



  createCharts(): void {
    // Mapear los nombres de los cuidadores y la cantidad de servicios para la gráfica
    const cuidadores = this.cuidadoresData.map(data => data.cuidador);
    console.log("Cuidadores:", cuidadores);
    const counts = this.cuidadoresData.map(data => data.servicios); // Cambia `count` a `servicios` si esa es la propiedad correcta
    console.log("Cuenta:", counts);
  
    this.chartOptions = {
      series: [
        {
          name: "Servicios Asignados",
          data: counts // Datos obtenidos dinámicamente
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + " servicios";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: cuidadores, // Los nombres de los cuidadores
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + " servicios";
          }
        }
      },
      title: {
        text: "Servicios Asignados por Cuidador",
        floating: false,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }
}
