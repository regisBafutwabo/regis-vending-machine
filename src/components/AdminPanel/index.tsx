'use client';
import { useInventoryStore } from '@/store/inventoryStore';
import { useUserCardStore } from '@/store/userCardStore';

import { Button } from '../ui/Buttons/Button';

export const AdminPanel = () => {
  const { restockBeverages } = useInventoryStore();
  const { resetCards } = useUserCardStore();

  return (
    <div className="flex flex-col gap-4 border-[1px] border-slate-300 rounded-lg p-4">
      <div>
        <h2 className="text-3xl font-bold">Admin Panel</h2>
        <p className="text-description ">
          Admin panel for restocking and recharging cards
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Button onClick={() => restockBeverages()}>Restock Beverages</Button>
        <Button onClick={() => resetCards()}>Reset Cards</Button>
      </div>
    </div>
  );
};
