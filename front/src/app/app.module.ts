import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app.routing';
import { ToastrModule } from 'ngx-toastr';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { MisMascotasComponent } from './mis-mascotas/mis-mascotas.component';
import { DetalleMascotaComponent } from './detalle-mascota/detalle-mascota.component';
import { CuidadoresComponent } from './cuidadores/cuidadores.component';
import { RegistroCuidadorComponent } from './registro-cuidador/registro-cuidador.component';
import { DetalleCuidadorComponent } from './detalle-cuidador/detalle-cuidador.component';
import { ServicioComponent } from './servicio/servicio.component';
import { DashboardServiciosComponent } from './dashboard-servicios/dashboard-servicios.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  imports: [
    BrowserAnimationsModule,  // Necesario para Toastr
    BrowserModule,
    FormsModule,  // FormsModule para ngModel
    BsDropdownModule.forRoot(),
    RouterModule,
    HttpClientModule,
    NgApexchartsModule,
    NgScrollbarModule,
    SidebarModule,
    NavbarModule,
    AppRoutingModule,
    ToastrModule.forRoot({  // Configuración del Toast
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    AdminLayoutComponent,
    MascotasComponent,
    MisMascotasComponent,
    DetalleMascotaComponent,
    CuidadoresComponent,
    RegistroCuidadorComponent,
    DetalleCuidadorComponent,
    ServicioComponent,
    DashboardServiciosComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }