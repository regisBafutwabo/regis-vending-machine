import { ActionSection } from '@/components/ActionSection';
import { AdminPanel } from '@/components/AdminPanel';
import { BeverageSelection } from '@/components/BeverageSelection';
import { Header } from '@/components/Header';
import { PaymentSelection } from '@/components/PaymentSelection';
import { Screen } from '@/components/Screen';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="gap-8 items-center flex lg:flex-row flex-col">
        <div className="flex flex-col gap-4 border-[1px] border-slate-300 rounded-lg p-4">
          {/* Header */}
          <Header />
          {/* Select Beverage */}
          <BeverageSelection />
          {/* Payment Method */}
          <PaymentSelection />
          {/* Screen Status */}
          <Screen />
          {/* Action Section */}
          <ActionSection />
        </div>
        <div>
          {/* ADMIN PANEL for restocking stock and recharging cards */}
          <AdminPanel />
        </div>
      </main>
    </div>
  );
}
