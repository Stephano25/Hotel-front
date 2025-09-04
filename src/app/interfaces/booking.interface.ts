// src/app/interfaces/booking.interface.ts
import { Room } from './room.interface';

export interface Booking {
  _id: string;
  name: string;
  email: string;
  roomName: string; // ✅ Ajout pour correspondre au template
  checkInDate: Date; // ✅ Changé de checkIn à checkInDate
  checkOutDate: Date; // ✅ Changé de checkOut à checkOutDate
  totalPrice: number;
  createdAt: Date;
}