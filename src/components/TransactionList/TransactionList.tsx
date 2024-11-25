"use client"; // Ensure client-side rendering
import styles from "./TransactionList.module.css";
import React, { useEffect, useState } from "react";

interface Transaction {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
}

const TransactionList = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Fetch transactions from localStorage when the component mounts
    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
        setTransactions(storedTransactions);
    }, []);

    return (
        <div>
            <h2>Transaction List</h2>
            {transactions.length === 0 ? (
                <p>No transactions available.</p>
            ) : (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className={styles["transaction-item"]}>
                            <p><strong>Description:</strong> {transaction.description}</p>
                            <p><strong>Amount:</strong> {transaction.amount} TL</p>
                            <p><strong>Category:</strong> {transaction.category}</p>
                            <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionList;
