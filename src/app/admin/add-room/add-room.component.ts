// src/app/admin/add-room/add-room.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importez Router
import { RoomService } from '../../services/room.service';
import { Room } from '../../interfaces/room.interface';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ FormsModule est ici
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  newRoom: Omit<Room, '_id'> = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    amenities: []
  };

  constructor(private roomService: RoomService, private router: Router) {} // ✅ Router injecté

  onSubmit(): void {
    console.log('Soumission du formulaire déclenchée !', this.newRoom); // Log de test

    this.roomService.createRoom(this.newRoom).subscribe({
      next: (response) => {
        alert('Chambre ajoutée avec succès !');
        this.router.navigate(['/rooms']); // Redirection après succès
      },
      error: (err) => {
        alert('Échec de l\'ajout de la chambre.');
        console.error(err);
      }
    });
  }
}