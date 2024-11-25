'use client';
import React, { useContext } from 'react';
import { BudgetContext } from '@/context/BudgetContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

const TransactionList = () => {
  const { transactions, isDarkMode } = useContext(BudgetContext);

  return (
    <Table className="border-2">
      <TableCaption style={isDarkMode ? { color: 'white' } : {}}>
        A list of your recent invoices.
      </TableCaption>
      <TableHeader style={isDarkMode ? { color: 'red' } : {}}>
        <TableRow>
          <TableHead>Açıklama</TableHead>
          <TableHead>Tip</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Miktar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>
              {transaction.date ? format(transaction.date, 'PPP') : ''}
            </TableCell>
            <TableCell>{transaction.amount} TL</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionList;
