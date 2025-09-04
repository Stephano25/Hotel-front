// src/app/hotel-home/hotel-home.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { environment } from '../../environments/environment'; 
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-hotel-home',
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel-home.component.css'],
  standalone: true, 
  imports: [CommonModule]
})
export class HotelHomeComponent implements OnInit {
  hotelData: any; 
  error: string | null = null;
  loading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchHotelData();
  }

  fetchHotelData() {
    this.loading = true;
    this.http.get<any>(`${environment.apiUrl}/hotel`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des données de l\'hôtel', err);
          if (err.status === 401) {
            this.error = 'Non autorisé. Veuillez vous connecter.';
          } else {
            this.error = 'Impossible de charger les données de l\'hôtel.';
          }
          this.loading = false;
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.hotelData = data;
          this.error = null;
        }
        this.loading = false;
      });
  }
}