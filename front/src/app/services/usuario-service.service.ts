import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface CountResponse {
  count: number;
}

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

  getUserRole(): Observable<any> {
    const email = localStorage.getItem('email');
    if (email) {
      return this.getUserProfile(email);
    } else {
      // Manejar el caso cuando el email no está en localStorage
      console.error('No se encontró el email en localStorage');
      return new Observable(observer => {
        observer.error('No se encontró el email en localStorage');
      });
    }
  }
  // Método para contar el número de usuarios
  getUserCount(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiUrl}/users/count`, { withCredentials: true });
  }

  // Método para obtener el conteo de cuidadores
  getCuidadoresCount(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiUrl}/cuidadores/count`, { withCredentials: true });
  }

  // Método para obtener el conteo de servicios
  getServiciosCount(): Observable<CountResponse> {
    return this.http.get<CountResponse>(`${this.apiUrl}/servicios/count`, { withCredentials: true });
  }

  // Método para obtener el conteo de citas pendientes
  getMacotasCount(): Observable<CountResponse> {
    console.log("Intentando...")
    return this.http.get<CountResponse>(`${this.apiUrl}/mascoticas/count`, { withCredentials: true });
  }

}
