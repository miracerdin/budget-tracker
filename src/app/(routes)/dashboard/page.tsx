'use client';
import Warnings from '@/components/Warnings';
import TransactionList from '@/components/TransactionList/TransactionList';
import Header from '@/app/_components/Header';
import BudgetChart from '@/app/_components/BudgetChart';
import React, { useContext, useMemo } from 'react';
import { BudgetContext } from '@/context/BudgetContext';

export default function DashboardLayout() {
  const { transactions } = useContext(BudgetContext);

  const mergedTransactions = useMemo(() => {
    return transactions.reduce(
      (acc: { category: string; amount: number }[], curr: Transaction) => {
        const existing = acc.find((item) => item.category === curr.category);
        if (existing) {
          existing.amount += curr.amount;
        } else {
          acc.push({ category: curr.category, amount: curr.amount });
        }
        return acc;
      },
      []
    );
  }, [transactions]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Header />
      <div className="w-[75%] m-4">
        <BudgetChart data={mergedTransactions} />
      </div>
      <Warnings />
      <div className="w-[75%] m-4">
        {transactions.length > 0 ? (
          <TransactionList />
        ) : (
          <p className="text-center text-gray-500">Veri mevcut değil</p>
        )}
      </div>
    </div>
  );
}
