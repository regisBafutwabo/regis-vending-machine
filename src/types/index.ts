export interface Beverage {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface PaymentCard {
  id: string;
  name: string;
  balance: number;
}

export type VendingStatus =
  | 'IDLE'
  | 'PROCESSING...'
  | 'DISPENSING...'
  | 'ERROR'
  | 'SELECTED BEVERAGE'
  | 'INSERTING CASH...'
  | 'RETURNING CHANGE...'
  | 'CONTACTING BANK'
  | 'AUTHENTICATING'
  | 'AUTHORIZATION REQUEST';

export type PaymentMethod = 'CARD' | 'CASH';
