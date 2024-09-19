import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from '../services/usuario-service.service'; // Ajusta la ruta si es necesario

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/misMascotas', title: 'Mis Mascotas',  icon:'pe-7s-like', class: '' },
  { path: '/perfil', title: 'Perfil de Usuario',  icon:'pe-7s-user', class: '' },
  { path: '/cuidadores', title: 'Cuidadores',  icon:'pe-7s-magic-wand', class: '' },
  { path: '/dashboard', title: 'Dashboard',  icon:'pe-7s-display1', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  userRole: string = '';

  constructor(private usuarioService: UsuarioServiceService) { }

  ngOnInit() {
    this.usuarioService.getUserRole().subscribe(
      (data: any) => {
        console.log("LA DATOTA:",data);
        this.userRole = data.rol;
        this.filterMenu();
      },
      (error) => {
        console.error('Error al obtener el rol del usuario:', error);
      }
    );
  }

  filterMenu() {
    this.menuItems = ROUTES.filter(menuItem => {
      if (menuItem.path === '/cuidadores') {
        return this.userRole === 'admin';
      }
      if (menuItem.path === '/dashboard') {
        return this.userRole === 'admin';
      }
      return true; // Para los demás elementos del menú
    });
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
}
