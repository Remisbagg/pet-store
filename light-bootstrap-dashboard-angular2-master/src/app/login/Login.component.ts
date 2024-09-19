import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';  // Importar Toastr
import { UsuarioServiceService } from 'app/service/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(
    private usuarioService: UsuarioServiceService,
    private router: Router,
    private toastr: ToastrService  // Inyecta el servicio Toastr
  ) {}

  login() {
        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      }
}
