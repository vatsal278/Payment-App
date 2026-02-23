"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext();

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
}

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const timers = useRef({});

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        if (timers.current[id]) {
            clearTimeout(timers.current[id]);
            delete timers.current[id];
        }
    }, []);

    const toast = useCallback(
        ({ type = "info", message, duration = 3000 }) => {
            const id = ++toastId;
            setToasts((prev) => [...prev.slice(-4), { id, type, message }]);
            timers.current[id] = setTimeout(() => removeToast(id), duration);
            return id;
        },
        [removeToast]
    );

    const success = useCallback((msg) => toast({ type: "success", message: msg }), [toast]);
    const error = useCallback((msg) => toast({ type: "error", message: msg }), [toast]);
    const info = useCallback((msg) => toast({ type: "info", message: msg }), [toast]);

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            Object.values(timers.current).forEach(clearTimeout);
        };
    }, []);

    return (
        <ToastContext.Provider value={{ toast, success, error, info }}>
            {children}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 w-full max-w-sm px-4 pointer-events-none">
                {toasts.map((t) => (
                    <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-cashapp shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const bgColors = {
    success: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800",
    info: "bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800",
};

function ToastItem({ toast, onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg backdrop-blur-sm pointer-events-auto transition-all duration-300 ${bgColors[toast.type] || bgColors.info
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
            {icons[toast.type] || icons.info}
            <p className="text-sm font-medium flex-1 text-gray-800 dark:text-gray-200">
                {toast.message}
            </p>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
                <X className="w-4 h-4 text-gray-400" />
            </button>
        </div>
    );
}
