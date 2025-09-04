// src/app/booking/booking.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Importez CommonModule
import { FormsModule } from '@angular/forms'; // ✅ Importez FormsModule
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Booking } from '../interfaces/booking.interface';

@Component({
  selector: 'app-booking',
  standalone: true, // ✅ Spécifiez que c'est un composant autonome
  imports: [CommonModule, FormsModule], // ✅ Importez les modules ici
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {

  newBooking: Omit<Booking, '_id'> = { // ✅ Le type attendu par votre service
    name: '',
    email: '',
    roomName: '',
    checkInDate: new Date(),
    checkOutDate: new Date(),
    totalPrice: 0,
    createdAt: new Date(), // ✅ Ajout de la propriété 'createdAt'
  };

  constructor(private bookingService: BookingService, private router: Router) { }

  onSubmit(): void {
    this.bookingService.createBooking(this.newBooking).subscribe({
      next: (response) => {
        alert('Votre réservation a été enregistrée avec succès !');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Échec de la réservation. Veuillez vérifier les informations.');
        console.error(err);
      }
    });
  }
}