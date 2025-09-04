// src/app/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  // Cette méthode récupère les données du tableau de bord de l'administrateur.
  // Elle envoie le token d'authentification pour prouver que l'utilisateur est un administrateur.
  getDashboardData(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupère le token stocké localement
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }
}