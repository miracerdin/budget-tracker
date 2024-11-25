'use client';
import React, { useContext, useEffect, useState } from 'react';
import { BudgetContext } from '@/context/BudgetContext';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Warnings = () => {
  const { warnings } = useContext(BudgetContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (warnings.length > 0) {
      setIsDialogOpen(true);
    }
  }, [warnings]);

  if (!warnings.length) return null;
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Uyarılar</AlertDialogTitle>
          <ul>
            {warnings.map((warning, index) => (
              <AlertDialogDescription key={index}>
                {warning}{' '}
              </AlertDialogDescription>
            ))}
          </ul>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Warnings;
