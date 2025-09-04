export interface AboutUs {
  _id: string;
  title: string;
  history: string;
  mission: string;
  team: {
    name: string;
    role: string;
    bio: string;
    imageUrl?: string;
  }[];
}