// src/app/hotel-sports-leisure/hotel-sports-leisure.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Assurez-vous d'importer CommonModule si nécessaire

@Component({
  selector: 'app-hotel-sports-leisure',
  standalone: true,
  imports: [CommonModule], // Ajoutez CommonModule si vous utilisez des directives comme *ngIf, *ngFor
  templateUrl: './hotel-sports-leisure.component.html',
  styleUrls: ['./hotel-sports-leisure.component.css']
})
export class HotelSportsLeisureComponent { // <-- Changez ceci si votre classe est nommée HotelSportsLeisure
  // Votre code existant pour le composant des sports et loisirs
  // Si la classe était 'export class HotelSportsLeisure {', changez-la en 'export class HotelSportsLeisureComponent {'
  // OU dans app.routes.ts, changez l'import pour 'm => m.HotelSportsLeisure'
}
