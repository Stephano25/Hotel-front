// src/app/hotel-pool/hotel-pool.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Assurez-vous d'importer CommonModule si nécessaire

@Component({
  selector: 'app-hotel-pool',
  standalone: true,
  imports: [CommonModule], // Ajoutez CommonModule si vous utilisez des directives comme *ngIf, *ngFor
  templateUrl: './hotel-pool.component.html',
  styleUrls: ['./hotel-pool.component.css']
})
export class HotelPoolComponent { // <-- Changez ceci si votre classe est nommée HotelPool
  // Votre code existant pour le composant de la piscine
  // Si la classe était 'export class HotelPool {', changez-la en 'export class HotelPoolComponent {'
  // OU dans app.routes.ts, changez l'import pour 'm => m.HotelPool'
}
