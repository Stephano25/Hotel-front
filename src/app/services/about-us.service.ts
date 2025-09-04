// src/app/services/about-us.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutUs } from '../interfaces/about-us.interface'; // Assurez-vous d'avoir cette interface

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  private apiUrl = 'http://localhost:5000/api/about-us';

  constructor(private http: HttpClient) { }

  getAboutUsData(): Observable<AboutUs> {
    return this.http.get<AboutUs>(this.apiUrl);
  }
}