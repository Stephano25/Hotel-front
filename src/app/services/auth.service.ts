// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // ✅ Correction du chemin

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token: string | null = null;
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  public role$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.fetchUserRole().catch(() => this.logout());
    }
  }

  async login(email: string, password: string): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
    );

    if (response.token) {
      this.token = response.token;
      // ✅ CORRECTION : Vérifiez que this.token n'est pas null
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
      this.updateUserRole(response.role);
    }
  }

  async registerClient(name: string, email: string, password: string): Promise<void> {
    const response = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/auth/register`, { name, email, password })
    );
    if (response.token) {
      this.token = response.token;
      // ✅ CORRECTION : Vérifiez que this.token n'est pas null
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
      this.updateUserRole(response.role);
    }
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  private updateUserRole(role: string): void {
    this.userRoleSubject.next(role);
    this.router.navigateByUrl(role === 'admin' ? '/admin' : '/dashboard');
  }

  private async fetchUserRole(): Promise<void> {
    const headers = { Authorization: `Bearer ${this.token}` };
    const user = await firstValueFrom(
      this.http.get<any>(`${this.apiUrl}/auth/me`, { headers }).pipe(
        tap((data) => this.userRoleSubject.next(data.role))
      )
    );
    this.userRoleSubject.next(user.role);
  }
}