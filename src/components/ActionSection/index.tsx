'use client';
import { useVendingStore } from '@/store/vendingStore';

import { Button } from '../ui/Buttons/Button';

export const ActionSection = () => {
  const {
    reset,
    paymentMethod,
    processCashPayment,
    insertedCash,
    selectedBeverage,
  } = useVendingStore();
  const resetMachine = () => {
    reset();
  };

  const dispenseDrink = () => {
    processCashPayment();
  };

  return (
    <div className="flex flex-col gap-4">
      {paymentMethod === 'CASH' && (
        <Button
          onClick={dispenseDrink}
          disabled={
            selectedBeverage === null || insertedCash < selectedBeverage.price
          }
          className="bg-green-700"
        >
          Dispense Drink
        </Button>
      )}
      <Button onClick={resetMachine}>Reset</Button>
    </div>
  );
};
