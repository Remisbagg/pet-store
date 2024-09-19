import { Routes } from '@angular/router';

import { PerfilComponent } from '../../perfil/perfil.component';
import { HomeComponent } from '../../home/home.component';
import { MascotasComponent } from '../../mascotas/mascotas.component';
import { MisMascotasComponent } from '../../mis-mascotas/mis-mascotas.component';
import { DetalleMascotaComponent } from '../../detalle-mascota/detalle-mascota.component';
import { CuidadoresComponent } from '../../cuidadores/cuidadores.component';
import { AuthGuard } from '../../auth.guard';  // Asegúrate de que la ruta sea correcta
import { RegistroCuidadorComponent } from '../../registro-cuidador/registro-cuidador.component';
import { DetalleCuidadorComponent } from '../../detalle-cuidador/detalle-cuidador.component';
import { ServicioComponent } from '../../servicio/servicio.component';
import { DashboardServiciosComponent } from '../../dashboard-servicios/dashboard-servicios.component';

export const AdminLayoutRoutes: Routes = [
    { canActivate: [AuthGuard], path: 'home', component: HomeComponent },
    { canActivate: [AuthGuard], path: 'perfil', component: PerfilComponent },
    { canActivate: [AuthGuard], path: 'mascotas', component: MascotasComponent },
    { canActivate: [AuthGuard], path: 'misMascotas', component: MisMascotasComponent },
    { canActivate: [AuthGuard], path: 'detalleMascotas/:id', component: DetalleMascotaComponent },
    { canActivate: [AuthGuard], path: 'cuidadores', component: CuidadoresComponent },
    { canActivate: [AuthGuard], path: 'registroCuidador', component: RegistroCuidadorComponent },
    { canActivate: [AuthGuard], path: 'detalleCuidador/:id', component: DetalleCuidadorComponent},
    { canActivate: [AuthGuard],path: 'servicio/:id', component: ServicioComponent },
    { canActivate: [AuthGuard], path: 'dashboard', component: DashboardServiciosComponent },

];
