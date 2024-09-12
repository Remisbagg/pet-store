import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/Login.component'; // Importa el componente de login

const routes: Routes =[
  {
    path: '',
    redirectTo: 'login',  // Cambia el redireccionamiento al componente login
    pathMatch: 'full',
  },
  {
    path: 'login',   // Nueva ruta para el componente de login
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'  // Cambia el redireccionamiento a login
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
       useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule { }
