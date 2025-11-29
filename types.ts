export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  materials: string[];
  dimensions: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export type PageView = 
  | 'HOME' 
  | 'SHOP' 
  | 'PRODUCT_DETAILS' 
  | 'CART' 
  | 'CHECKOUT' 
  | 'LOGIN' 
  | 'PROFILE' 
  | 'ADMIN' 
  | 'ABOUT' 
  | 'CONTACT';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'popularity' | 'price-asc' | 'price-desc';
}
