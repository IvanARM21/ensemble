

import { Alert, Size, Color, Category, ProductForm } from '@/interfaces';
export interface SizeContext {
  size: Size;
  alert: Alert;
}

export interface ColorContext {
  color: Color;
  alert: Alert;
}

export interface CategoryContext {
  category: Category;
  alert: Alert;
}

  
export interface ProductContext {
  product: ProductForm;
  alert: Alert;
}

export interface Step<T> {
    numStep: number;
    labelStep: string;
    context: T;
    condition: (context: T) => boolean;
  }

  
export type ContextType = SizeContext | ColorContext | ProductContext | CategoryContext;