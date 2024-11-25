'use client';
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { checkBudgetWarnings } from '../lib/utils';
import { BudgetState } from '@/types/BudgetState';

// Başlangıç durumu
const initialState: BudgetState = {
  transactions: [],
  warnings: [],
  isDarkMode: false, // Dark mode için yeni alan
  addTransaction: () => {},
  clearWarnings: () => {},
  toggleDarkMode: () => {}, // Dark mode yönetimi için yeni metot
};

// Reducer fonksiyonu
const reducer = (state: BudgetState, action: any): BudgetState => {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      const warnings = checkBudgetWarnings(action.payload, {
        Gıda: 1000,
        Eğlence: 500,
      });
      return { ...state, transactions: action.payload, warnings };

    case 'ADD_TRANSACTION':
      const newTransactions = [...state.transactions, action.payload];
      const updatedWarnings = checkBudgetWarnings(newTransactions, {
        Gıda: 1000,
        Eğlence: 500,
      });
      return {
        ...state,
        transactions: newTransactions,
        warnings: updatedWarnings,
      };

    case 'CLEAR_WARNINGS':
      return { ...state, warnings: [] };

    case 'TOGGLE_DARK_MODE':
      const newDarkModeState = !state.isDarkMode;

      // Tailwind dark mode sınıflarını yönet
      if (newDarkModeState) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('isDarkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('isDarkMode', 'false');
      }

      return { ...state, isDarkMode: newDarkModeState };

    default:
      return state;
  }
};

// Context oluşturma
export const BudgetContext = createContext<BudgetState>(initialState);

// Provider bileşeni
export const BudgetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // LocalStorage'dan verileri yükle
    const savedTransactions = JSON.parse(
      localStorage.getItem('transactions') || '[]'
    );
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';

    // Transactions varsa dispatch et
    if (savedTransactions.length > 0) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: savedTransactions });
    }

    // Dark mode başlangıç durumu
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
      dispatch({ type: 'TOGGLE_DARK_MODE' }); // Başlangıç durumu
    }
  }, []);

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const clearWarnings = () => {
    dispatch({ type: 'CLEAR_WARNINGS' });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  return (
    <BudgetContext.Provider
      value={{
        ...state,
        addTransaction,
        clearWarnings,
        toggleDarkMode,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
