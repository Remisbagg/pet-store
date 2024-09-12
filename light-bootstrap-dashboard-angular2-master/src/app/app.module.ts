import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MascotasComponent } from './mascotas/mascotas.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,  // Necesario para Toastr
    FormsModule,  // FormsModule para ngModel
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    ToastrModule.forRoot({  // Configuración del Toast
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MascotasComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }