"use client";

import { X, Delete } from "lucide-react";

export default function Keypad({ amount, setAmount }) {
    const handlePress = (val) => {
        if (val === ".") {
            if (amount.includes(".")) return;
            setAmount(amount + ".");
        } else {
            // Prevent more than 2 decimal places
            if (amount.includes(".") && amount.split(".")[1].length >= 2) return;
            // Prevent leading zeros
            if (amount === "0") {
                setAmount(val);
            } else {
                setAmount(amount + val);
            }
        }
    };

    const handleDelete = () => {
        if (amount.length <= 1) {
            setAmount("0");
        } else {
            setAmount(amount.slice(0, -1));
        }
    };

    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "delete"];

    return (
        <div className="grid grid-cols-3 gap-y-8 gap-x-12 max-w-xs mx-auto mt-8">
            {keys.map((key) => {
                if (key === "delete") {
                    return (
                        <button
                            key={key}
                            onClick={handleDelete}
                            className="flex items-center justify-center p-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <Delete className="w-8 h-8" />
                        </button>
                    );
                }

                return (
                    <button
                        key={key}
                        onClick={() => handlePress(key)}
                        className="text-3xl font-bold p-4 hover:bg-cashapp/10 rounded-full transition-all"
                    >
                        {key}
                    </button>
                );
            })}
        </div>
    );
}
