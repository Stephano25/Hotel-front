// src/app/interfaces/activity.interface.ts
export interface Activity {
  _id: string;
  name: string;
  description: string;
  hours: string;
  imageUrl: string; // ✅ Ajout de la propriété
}