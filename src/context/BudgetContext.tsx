'use client';
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { checkBudgetWarnings } from '../lib/utils';
import { BudgetState } from '@/types/BudgetState';

const initialState: BudgetState = {
  transactions: [],
  warnings: [],
  addTransaction: () => {},
  clearWarnings: () => {},
};

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

    if (savedTransactions.length > 0) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: savedTransactions });
    }
  }, []);

  const addTransaction = (transaction: Transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const clearWarnings = () => {
    dispatch({ type: 'CLEAR_WARNINGS' });
  };

  return (
    <BudgetContext.Provider value={{ ...state, addTransaction, clearWarnings }}>
      {children}
    </BudgetContext.Provider>
  );
};
