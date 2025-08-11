// src/app/hotel-rooms/hotel-rooms.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-rooms',
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css'],
  standalone: true // Indique que c'est un composant autonome
})
export class HotelRoomsComponent { // <-- Exportation NOMMÉE
  // ...
}