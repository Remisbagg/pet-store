import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/users/login`, credentials, { withCredentials: true }).pipe(
      tap(response => {
        // Guardar el token en el almacenamiento local si está presente en la respuesta
        localStorage.setItem('email', credentials.email);
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(user: any) {
    return this.http.post(`${this.apiUrl}/users/register`, user, { withCredentials: true });
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): Promise<boolean> {
    return this.http.get(`${this.apiUrl}/users/check-auth`, { withCredentials: true })
      .toPromise()
      .then(response => true)
      .catch(error => false);
  }

  // Método para cerrar sesión
  logout() {
    return this.http.post(`${this.apiUrl}/users/logout`, {}, { withCredentials: true });
  }

  getUserProfile(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile/${email}`, { withCredentials: true });
  }

  // Método para actualizar el perfil del usuario
  updateUserProfile(email: string, userProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/profile/${email}`, userProfile, { withCredentials: true });
  }
}
