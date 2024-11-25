'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BudgetContext } from '@/context/BudgetContext';
import { useContext, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { v4 as uuidv4 } from 'uuid';

// Define the schema for the form
const formSchema = z.object({
  description: z.string().nonempty('Description is required.'),
  amount: z.number(),
  date: z.coerce.date(),
  category: z.string().nonempty('Category is required.'),
});

export default function AddTransactionForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const { addTransaction, setCategoryLimit } = useContext(BudgetContext);
  const { toast } = useToast();
  const [newLimit, setNewLimit] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const handleSetLimit = () => {
    if (selectedCategory && newLimit !== null) {
      setCategoryLimit(selectedCategory, newLimit);
      toast({
        title: 'Budget Limit Updated',
        description: `Limit for "${selectedCategory}" updated to ${newLimit}.`,
        className: 'bg-green-500 text-white',
      });
      onClose();
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const newTransaction: Transaction = {
        id: uuidv4(),
        description: values.description,
        amount: values.amount,
        date: values.date.toISOString(),
        category: values.category,
      };

      const existingTransactions = JSON.parse(
        localStorage.getItem('transactions') || '[]'
      ) as Transaction[];
      const updatedTransactions = [...existingTransactions, newTransaction];
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      addTransaction(newTransaction);

      toast({
        title: 'Transaction Added',
        description: 'Your transaction has been successfully added.',
        className: 'bg-green-500 text-white',
      });
      onClose();
    } catch (error: unknown) {
      const typedError = error as Error;
      toast({
        title: typedError.name,
        description: 'Failed to submit the form. Please try again.',
        className: 'bg-red-500 text-white',
        action: <ToastAction altText="Try again">Undo</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-xl mx-auto py-1"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a description"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter an amount"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Eğlence">Eğlence</SelectItem>
                  <SelectItem value="Seyahat">Seyahat</SelectItem>
                  <SelectItem value="Yemek">Yemek</SelectItem>
                  <SelectItem value="Kira">Kira</SelectItem>
                  <SelectItem value="Faturalar">Faturalar</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Eğlence">Eğlence</SelectItem>
              <SelectItem value="Seyahat">Seyahat</SelectItem>
              <SelectItem value="Yemek">Yemek</SelectItem>
              <SelectItem value="Kira">Kira</SelectItem>
              <SelectItem value="Faturalar">Faturalar</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Enter budget limit"
            value={newLimit || ''}
            onChange={(e) => setNewLimit(Number(e.target.value))}
          />
          <Button className="text-white" onClick={handleSetLimit}>
            Set Limit
          </Button>
        </div>
        <Button className="text-white" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
