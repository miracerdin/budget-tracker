'use client';
import { Button } from '@/components/ui/button';
import AddTransactionForm from '@/components/AddTransactionForm';
import { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function AddNewTransaction() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            <AddTransactionForm onClose={handleModalClose} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
}
