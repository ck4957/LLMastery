// Common types used across components

export type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google';

export interface PaymentDetails {
  amount: number;
  currency: string;
  description?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface PaymentSummary {
  items: ProductItem[];
  subtotal: number;
  tax?: number;
  discount?: number;
  total: number;
}