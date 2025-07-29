import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // ✅ Utilise localhost si backend et frontend sont sur la même machine
  private API_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, {
      email,
      password
    });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.API_URL}/signup`, {
      name,
      email,
      password
    });
  }
}
