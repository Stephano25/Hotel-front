// src/app/interfaces/restaurant.interface.ts

export interface Restaurant { // ✅ Assurez-vous d'avoir 'export'
  _id: string;
  name: string;
  description: string;
  menu: string[];
}