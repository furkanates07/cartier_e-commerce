export interface IProduct {
  id: number;
  brand: string;
  category: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
}
