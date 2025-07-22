import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // URL de base de l'API
  private API_URL = 'http://192.168.88.163:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/signup`, {  // <-- corrigé ici
      name,
      email,
      password
    });
  }
}
