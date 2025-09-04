// src/app/services/gallery.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gallery } from '../interfaces/gallery.interface'; // Assurez-vous d'avoir cette interface

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost:5000/api/gallery';

  constructor(private http: HttpClient) { }

  getGalleryImages(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(this.apiUrl);
  }
}