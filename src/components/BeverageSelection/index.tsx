// This component handles the product selection interface
'use client';

import { useInventoryStore } from '@/store/inventoryStore';
import { useVendingStore } from '@/store/vendingStore';
import { Beverage } from '@/types';

import { ToggleButton } from '../ui/Buttons/ToggleButton';
import { Subheader } from '../ui/Subheader';

export const BeverageSelection = () => {
  const { selectBeverage, selectedBeverage } = useVendingStore();
  const { beverages } = useInventoryStore();

  const handleSelection = (beverage: Beverage) => {
    if (selectedBeverage?.id === beverage.id) return;
    selectBeverage(beverage);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Subheader>Select a Beverage</Subheader>
      </div>
      <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4">
        {beverages.map((beverage) => (
          <ToggleButton
            key={beverage.id}
            disabled={beverage.stock <= 0}
            className="flex flex-col w-[200px]"
            active={selectedBeverage?.id === beverage.id}
            onClick={() => handleSelection(beverage)}
          >
            <span className="font-bold">{beverage.name}</span>
            <span className=" font-semibold">
              {beverage.price.toLocaleString()} KRW
            </span>
            <span className="text-sm font-semibold text-gray-500">
              {beverage.stock.toLocaleString()} left
            </span>
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};
