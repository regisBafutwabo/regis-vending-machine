// This store manages the inventory of beverages
import { create } from 'zustand';

import { Beverage } from '@/types';

interface InventoryState {
  beverages: Beverage[];
  // Actions
  decreaseStock: (beverageId: string) => void;
  restockBeverages: () => void;
  isBeverageAvailable: (beverageId: string) => boolean;
}

const INITIAL_BEVERAGES: Beverage[] = [
  { id: 'cola', name: 'Cola', price: 1100, stock: 5 },
  { id: 'water', name: 'Water', price: 600, stock: 5 },
  { id: 'coffee', name: 'Coffee', price: 700, stock: 5 },
];

export const useInventoryStore = create<InventoryState>((set, get) => ({
  beverages: INITIAL_BEVERAGES,

  decreaseStock: (beverageId: string) =>
    set((state) => ({
      beverages: state.beverages.map((b) =>
        b.id === beverageId ? { ...b, stock: Math.max(0, b.stock - 1) } : b,
      ),
    })),

  restockBeverages: () =>
    set({
      beverages: INITIAL_BEVERAGES,
    }),

  isBeverageAvailable: (beverageId: string) => {
    const beverage = get().beverages.find((b) => b.id === beverageId);
    return beverage?.stock ? beverage.stock > 0 : false;
  },
}));
