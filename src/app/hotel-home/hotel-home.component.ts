// src/app/hotel-home/hotel-home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Assurez-vous d'importer CommonModule si vous utilisez des directives Angular (*ngIf, *ngFor, etc.)

@Component({
  selector: 'app-hotel-home',
  standalone: true, // Indique que c'est un composant autonome
  imports: [CommonModule], // Ajoutez CommonModule ici
  templateUrl: './hotel-home.component.html',
  styleUrls: ['./hotel-home.component.css']
})
export class HotelHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Vous pouvez ajouter ici la logique pour charger des données
    // ou initialiser des éléments si nécessaire.
  }
}
