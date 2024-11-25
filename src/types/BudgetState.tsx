export interface BudgetState {
  transactions: Transaction[];
  warnings: string[];
  addTransaction: (transaction: Transaction) => void;
  clearWarnings: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setCategoryLimit: (category: string, limit: number) => void;
  categoryLimits: Record<string, number>;
}
