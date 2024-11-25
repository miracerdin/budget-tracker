'use client';
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { checkBudgetWarnings } from '../lib/utils';
import { BudgetState } from '@/types/BudgetState';

const initialState: BudgetState = {
  transactions: [],
  warnings: [],
  isDarkMode: false,
  addTransaction: () => {},
  clearWarnings: () => {},
  toggleDarkMode: () => {},
};

type BudgetAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'CLEAR_WARNINGS' }
  | { type: 'TOGGLE_DARK_MODE' };

const reducer = (state: BudgetState, action: BudgetAction): BudgetState => {
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

export const BudgetContext = createContext<BudgetState>(initialState);

export const BudgetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const savedTransactions = JSON.parse(
      localStorage.getItem('transactions') || '[]'
    );
    const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';

    if (savedTransactions.length > 0) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: savedTransactions });
    }

    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
      dispatch({ type: 'TOGGLE_DARK_MODE' });
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
