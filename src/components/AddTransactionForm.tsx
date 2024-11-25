"use client";
import React, { useState, useContext } from 'react';
import {BudgetContext} from "@/context/BudgetContext";

const AddTransactionForm = () => {
    const { addTransaction } = useContext(BudgetContext);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number | null>(null);
    const [category, setCategory] = useState('');

    const handleSubmit = () => {
        if (description && amount) {
            const newTransaction = {
                id: Date.now().toString(),
                description,
                amount,
                date: new Date().toISOString(),
                category,
            };

            // First, update the localStorage with the new transaction
            const existingTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
            existingTransactions.push(newTransaction);
            localStorage.setItem("transactions", JSON.stringify(existingTransactions));

            // Then, update the context state with the new transaction
            addTransaction(newTransaction);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Açıklama"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Tutar"
                value={amount ?? ''}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Kategori Seç</option>
                <option value="Eğlence">Eğlence</option>
                <option value="Gıda">Gıda</option>
            </select>
            <button onClick={handleSubmit}>Ekle</button>
        </div>
    );
};

export default AddTransactionForm;