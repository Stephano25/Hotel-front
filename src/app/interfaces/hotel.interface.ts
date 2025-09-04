// src/app/interfaces/hotel.interface.ts

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  imageUrl: string; // ✅ Ajout de la propriété 'imageUrl'
}