import { category } from "./category.models";

export interface product{
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  creationAt : string;
  category: category;
}
