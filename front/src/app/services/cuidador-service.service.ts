import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class cuidadorService {

  private apiUrl = 'http://localhost:8000'; // Cambia por tu URL de la API

  constructor(private http: HttpClient) { }

  getCuidador(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cuidador`);
  }
  registerCuidador(mascota: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cuidador/register`, mascota);
  }
  getCuidadorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cuidador/${id}`);
  }
  deleteCuidador(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cuidador/${id}`);
  }
}

