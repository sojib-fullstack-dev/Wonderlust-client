
export interface IDestination {
  _id: string;
  name: string;
  country: string;
  category: "Beach" | "Mountain" | "City" | "Adventure" | "Cultural";
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}