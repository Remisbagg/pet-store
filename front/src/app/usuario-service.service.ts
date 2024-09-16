import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  private baseUrl = 'http://localhost:8000'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    const url = `${this.baseUrl}/users/register`;
    return this.http.post(url, user);
  }

  login(credentials: any): Observable<any> {
    const url = `${this.baseUrl}/users/login`;
    return this.http.post(url, credentials);
  }
}
