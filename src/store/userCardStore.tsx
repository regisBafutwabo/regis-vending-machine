import { create } from 'zustand';

import { PaymentCard } from '@/types';

interface UserCardState {
  cards: PaymentCard[];
  // Actions
  useCard: (cardId: string, amount: number) => void;
  resetCards: () => void;
}

const INITIAL_CARD: PaymentCard[] = [
  { id: 'card1', name: 'Card 1', balance: 5000 },
  { id: 'card2', name: 'Card 2', balance: 500 },
];

export const useUserCardStore = create<UserCardState>((set) => ({
  cards: INITIAL_CARD,
  resetCards: () =>
    set({
      cards: INITIAL_CARD,
    }),
  useCard: (cardId: string, amount: number) => {
    set((state) => ({
      cards: state.cards.map((card) =>
        card.id === cardId ? { ...card, balance: card.balance - amount } : card,
      ),
    }));
  },
}));
