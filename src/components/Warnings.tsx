"use client";
import React, { useContext } from "react";
import {BudgetContext} from "@/context/BudgetContext";

const Warnings = () => {
    const { warnings } = useContext(BudgetContext);

    if (!warnings.length) return null;

    return (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
            <h2>Uyarılar</h2>
            <ul>
                {warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                ))}
            </ul>
        </div>
    );
};

export default Warnings;
