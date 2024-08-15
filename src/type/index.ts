export type product = {
  name: string;
  weight: string;
  price: number;
  img: string;
  get_offer: string;
  categories: string[];
  details: string;
  how_to_use: string;
  rating: number;
  _id: string;
};

export interface User {
  name: string;
  email: string;
}
