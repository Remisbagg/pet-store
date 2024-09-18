import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/users/login`, credentials, { withCredentials: true });
  }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/users/register`, user, { withCredentials: true });
  }
}
