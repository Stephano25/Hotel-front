// src/app/services/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/booking.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';
  private adminApiUrl = 'http://localhost:5000/api/admin/bookings';

  constructor(private http: HttpClient) { }

  // Création d'une nouvelle réservation (accessible publiquement)
  createBooking(bookingData: Omit<Booking, '_id'>): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, bookingData);
  }

  // Récupération de toutes les réservations (pour l'administrateur)
  getBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Booking[]>(this.adminApiUrl, { headers });
  }
}