// This component displays the system status log
'use client';
import { useEffect, useRef, useState } from 'react';

import { useVendingStore } from '@/store/vendingStore';

import { Subheader } from '../ui/Subheader';

type LogEntry = {
  id: number;
  status: string;
  timestamp: string;
  error?: string;
  color: string;
};

export const Screen = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const {
    status,
    error,
    selectedBeverage,
    timestamp,
    insertedCash,
    change,
    paymentMethod,
  } = useVendingStore((state) => state);

  const logEndRef = useRef<HTMLDivElement | null>(null); // Create a ref for the log end

  useEffect(() => {
    if (status === 'IDLE') {
      setLogs([]);
      return;
    }
    const addLog = () => {
      setLogs((prev) => {
        return [
          ...prev,
          {
            id: prev.length + 1,
            status:
              status === 'SELECTED BEVERAGE'
                ? `SELECTED BEVERAGE ${selectedBeverage?.name}`
                : status,
            timestamp: timestamp,
            color: status === 'ERROR' ? 'text-red-500' : 'text-green-500',
            error: error || undefined,
          },
        ];
      });
    };
    addLog();
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [status, error, timestamp, selectedBeverage]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Subheader>Status Log</Subheader>
      </div>
      {/* Screen log */}
      <div className="bg-black h-[200px] w-full rounded-lg sm:p-4 p-1 overflow-scroll">
        <div className="max-w-3xl mx-auto">
          <div className=" p-4 rounded bg-black/50 relative">
            <div className="flex flex-col sticky top-0 bg-black z-10 sm:justify-between sm:flex-row mb-2 gap-4 text-green-500 border-b border-green-500 pb-2 sm:p-2 p-0">
              {/* Drink details */}
              <div className="flex flex-col">
                <div className="font-semibold">
                  <span className="text-green-500">Selected Beverage:</span>
                  <span className="text-white">
                    {selectedBeverage?.name || ' -'}
                  </span>
                </div>
                {selectedBeverage && (
                  <div className="font-semibold">
                    <span className="text-green-500">Price:</span>
                    <span className="text-white">
                      {' '}
                      {selectedBeverage?.price || 0} KRW
                    </span>
                  </div>
                )}
              </div>
              {/* Payment & Change Details */}
              {paymentMethod === 'CASH' && (
                <div className="flex flex-col">
                  <div className="font-semibold">
                    <span className="text-green-500">Inserted Cash:</span>
                    <span className="text-white"> {insertedCash || 0} KRW</span>
                  </div>
                  <div className="font-semibold">
                    <span className="text-green-500">Change:</span>
                    <span className="text-white"> {change || 0} KRW</span>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`flex items-start opacity-90 ${log.color}`}
                >
                  <span className="mr-2 opacity-75">[{log.timestamp}]</span>
                  <span className="flex-1">
                    {log.status === 'ERROR' ? log.error : log.status}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
