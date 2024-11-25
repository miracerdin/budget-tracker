import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export function checkBudgetWarnings(
  transactions: Transaction[],
  budgetLimits: Record<string, number>
): string[] {
  const warnings: string[] = [];

  const categoryTotals = transactions.reduce(
    (totals, transaction) => {
      const category = transaction.category;
      totals[category] = (totals[category] || 0) + transaction.amount;
      return totals;
    },
    {} as Record<string, number>
  );

  Object.entries(budgetLimits).forEach(([category, limit]) => {
    if (categoryTotals[category] > limit * 0.8) {
      warnings.push(
        `${category} kategorisi için limitin %80'ine ulaşıldı (${categoryTotals[category]}/${limit})`
      );
    }
  });

  return warnings;
}
