export interface Room {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  amenities?: string[]; // La propriété 'amenities' est facultative
}