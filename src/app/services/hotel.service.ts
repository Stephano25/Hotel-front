// src/app/services/hotel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel.interface'; // Assurez-vous d'avoir cette interface

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5000/api/hotel';

  constructor(private http: HttpClient) { }

  getHotelData(): Observable<Hotel> {
    return this.http.get<Hotel>(this.apiUrl);
  }
}