// src/app/interfaces/pool.interface.ts
export interface Pool {
  _id: string;
  name: string;
  description: string;
  amenities: string[];
  imageUrl: string; // ✅ Ajout de la propriété
}