// src/app/hotel-rooms/hotel-rooms.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../services/room.service';
import { Room } from '../interfaces/room.interface';

@Component({
  selector: 'app-hotel-rooms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-rooms.component.html',
  styleUrls: ['./hotel-rooms.component.css']
})
export class HotelRoomsComponent implements OnInit {
  rooms: Room[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe({
      next: (data) => {
        this.rooms = data; // ✅ Ici, 'data' doit contenir les chambres réelles
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération des chambres.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}