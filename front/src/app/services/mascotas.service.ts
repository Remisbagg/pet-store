import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private apiUrl = 'http://localhost:8000'; // Cambia por tu URL de la API

  constructor(private http: HttpClient) { }

  getMascotasByCorreo(correoUsuario: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/mascotas/${correoUsuario}`);
  }
  registerMascota(mascota: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mascotas/register`, mascota);
  }
  getMascotaById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/mascota/${id}`);
  }
  deleteMascota(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mascota/${id}`);
  }
}

