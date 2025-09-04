// src/app/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5000/api/rooms'; // ✅ URL pour les chambres publiques
  private adminUrl = 'http://localhost:5000/api/admin/rooms'; // ✅ URL pour l'admin

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl); // ✅ Appelle la bonne URL
  }

  createRoom(roomData: Omit<Room, '_id'>): Observable<Room> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Room>(this.adminUrl, roomData, { headers }); // ✅ Appelle la bonne URL avec auth
  }
}