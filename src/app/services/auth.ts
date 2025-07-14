import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://192.168.88.168:5000'; // Remplace par l'IP/port corrects

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, {
      email: email,
      password: password
    });
  }
}
