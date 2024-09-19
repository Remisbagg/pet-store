import { Routes } from '@angular/router';

import { PerfilComponent } from '../../perfil/perfil.component';
import { HomeComponent } from '../../home/home.component';
import { MascotasComponent } from '../../mascotas/mascotas.component';
import { MisMascotasComponent } from '../../mis-mascotas/mis-mascotas.component';
import { DetalleMascotaComponent } from '../../detalle-mascota/detalle-mascota.component';
import { AuthGuard } from '../../auth.guard';  // Asegúrate de que la ruta sea correcta

export const AdminLayoutRoutes: Routes = [
    { canActivate: [AuthGuard], path: 'home', component: HomeComponent },
    { canActivate: [AuthGuard], path: 'perfil', component: PerfilComponent },
    { canActivate: [AuthGuard], path: 'mascotas', component: MascotasComponent },
    { canActivate: [AuthGuard], path: 'misMascotas', component: MisMascotasComponent },
    { canActivate: [AuthGuard], path: 'detalleMascotas/:id', component: DetalleMascotaComponent }, 
];
