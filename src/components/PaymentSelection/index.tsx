// This component handles the payment selection interface
'use client';
import { useUserCardStore } from '@/store/userCardStore';
import { useVendingStore } from '@/store/vendingStore';
import { PaymentCard } from '@/types';

import { ToggleButton } from '../ui/Buttons/ToggleButton';
import { Subheader } from '../ui/Subheader';

const CASH_OPTIONS = [100, 500, 1000, 5000, 10000];

export const PaymentSelection = () => {
  const { insertCash, processCardPayment, paymentMethod } = useVendingStore();
  const { cards } = useUserCardStore();

  const handleCashInsertion = (amount: number) => {
    insertCash(amount);
  };

  const handleCardPayment = (Card: PaymentCard) => {
    processCardPayment(Card);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Subheader>Select Payment Method</Subheader>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-lg font-semibold">Pay With Cash</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
          {CASH_OPTIONS.map((option) => (
            <ToggleButton
              key={option}
              onClick={() => handleCashInsertion(option)}
              className="min-w-[125px]"
            >
              <span className="font-semibold">{option} KRW</span>
            </ToggleButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <p className="text-lg font-semibold">Pay With Card</p>
          {paymentMethod === 'CASH' && (
            <span className="text-sm text-red-400">
              (Not available during cash payment)
            </span>
          )}
        </div>
        <div className=" flex lg:justify-start justify-center">
          <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
            {cards.map((card) => (
              <ToggleButton
                key={card.id}
                onClick={() => handleCardPayment(card)}
                disabled={paymentMethod === 'CASH'}
                className="min-w-[172px] flex flex-col"
              >
                <span className="font-semibold">{card.name}</span>
                <span className="text-sm text-gray-500">
                  {card.balance.toLocaleString()} KRW
                </span>
              </ToggleButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
