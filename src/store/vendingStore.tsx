// This store manages the vending machine state
import { create } from 'zustand';

import { Beverage, PaymentCard, PaymentMethod, VendingStatus } from '@/types';
import { getTimestamp } from '@/utils';

import { useInventoryStore } from './inventoryStore';
import { useUserCardStore } from './userCardStore';

interface VendingState {
  selectedBeverage: Beverage | null;
  insertedCash: number;
  change: number;
  error: string | null;
  status: VendingStatus;
  timestamp: string;
  paymentMethod: PaymentMethod;
  // Actions
  selectBeverage: (beverage: Beverage) => void;
  insertCash: (amount: number) => void;
  processCardPayment: (card: PaymentCard) => Promise<void>;
  processCashPayment: () => Promise<void>;
  reset: () => void;
}

const INITIAL_STATE = {
  selectedBeverage: null,
  insertedCash: 0,
  change: 0,
  error: null,
  status: 'IDLE' as const,
  paymentMethod: 'CARD' as const,
  timestamp: getTimestamp(),
};

export const useVendingStore = create<VendingState>()((set, get) => ({
  ...INITIAL_STATE,
  selectBeverage: (beverage) =>
    set({
      selectedBeverage: beverage,
      status: 'SELECTED BEVERAGE',
      timestamp: getTimestamp(),
      error: null,
    }),

  insertCash: (amount) =>
    set((state) => {
      if (!state.selectedBeverage) {
        return {
          ...state,
          status: 'ERROR',
          timestamp: getTimestamp(),
          error: 'Please select a beverage first',
        };
      }

      const newTotal = state.insertedCash + amount;
      const change =
        newTotal >= state.selectedBeverage.price
          ? newTotal - state.selectedBeverage.price
          : 0;

      return {
        ...state,
        insertedCash: newTotal,
        change,
        status: 'INSERTING CASH...',
        paymentMethod: 'CASH',
        timestamp: getTimestamp(),
        error: null,
      };
    }),

  processCardPayment: async (card: PaymentCard) => {
    const { selectedBeverage } = get();
    set({
      status: 'PROCESSING...',
      timestamp: getTimestamp(),
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (!selectedBeverage) {
        set({
          status: 'ERROR',
          error: 'No beverage selected',
          timestamp: getTimestamp(),
        });
        return;
      }
      // Simulate card processing
      set({ status: 'CONTACTING BANK', timestamp: getTimestamp() });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ status: 'AUTHENTICATING', timestamp: getTimestamp() });
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ status: 'AUTHORIZATION REQUEST', timestamp: getTimestamp() });
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simulate card payment
      if (card.balance < selectedBeverage?.price) {
        set({
          status: 'ERROR',
          error: 'Insufficient balance',
          timestamp: getTimestamp(),
        });
        return;
      }
      useUserCardStore.getState().useCard(card.id, selectedBeverage.price);

      // Simulate dispensing
      useInventoryStore.getState().decreaseStock(selectedBeverage?.id);
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ status: 'DISPENSING...', timestamp: getTimestamp() });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset state
      set(INITIAL_STATE);
    } catch (error: unknown) {
      set({
        status: 'ERROR',
        error: `Card payment failed: ${(error as Error)?.message}`,
      });
    }
  },
  processCashPayment: async () => {
    const state = get();
    const { selectedBeverage, change } = state;

    if (!selectedBeverage) {
      set({
        error: 'No beverage selected',
        status: 'ERROR',
        timestamp: getTimestamp(),
      });
      return;
    }

    set({ status: 'PROCESSING...', timestamp: getTimestamp() });

    try {
      // Simulate cash payment
      useInventoryStore.getState().decreaseStock(selectedBeverage.id);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ status: 'DISPENSING...', timestamp: getTimestamp() });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Return change
      if (change > 0)
        set({ status: 'RETURNING CHANGE...', timestamp: getTimestamp() });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset state
      set(INITIAL_STATE);
    } catch (error: unknown) {
      set({
        status: 'ERROR',
        timestamp: getTimestamp(),
        error: `Failed to process payment${(error as Error)?.message && ': ' + (error as Error).message}`,
      });
    }
  },
  reset: () => set(INITIAL_STATE),
}));
