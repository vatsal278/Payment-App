"use client";

import { useState, useEffect, useRef } from "react";
import { X, Lock, ShieldCheck } from "lucide-react";

/*
 * PinModal — Cash App–style 4-digit PIN gate.
 *
 * First time: user sets a PIN (stored in localStorage per user).
 * After that: user must enter the correct PIN before any transaction.
 *
 * Props:
 *   isOpen      – boolean controlling visibility
 *   onSuccess   – callback fired when the correct PIN is entered
 *   onClose     – callback to dismiss the modal
 *   userId      – current user ID (for per-user storage)
 *   title       – optional heading override (default: "Enter PIN")
 */
export default function PinModal({ isOpen, onSuccess, onClose, userId, title }) {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [phase, setPhase] = useState("enter");   // "enter" | "create" | "confirm"
    const [newPin, setNewPin] = useState("");
    const [error, setError] = useState("");
    const [shake, setShake] = useState(false);
    const refs = useRef([]);

    const storageKey = `fc_pin_${userId}`;

    useEffect(() => {
        if (isOpen) {
            const saved = localStorage.getItem(storageKey);
            setPhase(saved ? "enter" : "create");
            setPin(["", "", "", ""]);
            setNewPin("");
            setError("");
            setTimeout(() => refs.current[0]?.focus(), 100);
        }
    }, [isOpen, storageKey]);

    const handleChange = (index, value) => {
        if (value.length > 1) value = value.slice(-1);
        if (!/^\d*$/.test(value)) return;

        const next = [...pin];
        next[index] = value;
        setPin(next);
        setError("");

        if (value && index < 3) {
            refs.current[index + 1]?.focus();
        }

        // Auto-submit when 4 digits entered
        if (value && index === 3) {
            const code = next.join("");
            if (code.length === 4) {
                setTimeout(() => handleSubmit(code), 150);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            refs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (code) => {
        if (phase === "create") {
            setNewPin(code);
            setPhase("confirm");
            setPin(["", "", "", ""]);
            setTimeout(() => refs.current[0]?.focus(), 100);
            return;
        }

        if (phase === "confirm") {
            if (code === newPin) {
                localStorage.setItem(storageKey, code);
                setPin(["", "", "", ""]);
                onSuccess?.();
            } else {
                triggerError("PINs don't match. Try again.");
                setPhase("create");
                setNewPin("");
            }
            return;
        }

        // phase === "enter"
        const saved = localStorage.getItem(storageKey);
        if (code === saved) {
            setPin(["", "", "", ""]);
            onSuccess?.();
        } else {
            triggerError("Wrong PIN. Try again.");
        }
    };

    const triggerError = (msg) => {
        setError(msg);
        setShake(true);
        setPin(["", "", "", ""]);
        setTimeout(() => {
            setShake(false);
            refs.current[0]?.focus();
        }, 500);
    };

    if (!isOpen) return null;

    const heading =
        phase === "create" ? "Create a PIN" :
            phase === "confirm" ? "Confirm your PIN" :
                title || "Enter PIN";

    const subtitle =
        phase === "create" ? "Set a 4-digit PIN for transactions" :
            phase === "confirm" ? "Enter the same PIN again" :
                "Enter your 4-digit PIN to continue";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-sm mx-4 bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Close */}
                <div className="flex justify-end -mt-2 -mr-2 mb-2">
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-cashapp/10 rounded-2xl flex items-center justify-center">
                        {phase === "create" || phase === "confirm" ? (
                            <ShieldCheck className="w-8 h-8 text-cashapp" />
                        ) : (
                            <Lock className="w-8 h-8 text-cashapp" />
                        )}
                    </div>
                </div>

                <h2 className="text-xl font-bold text-center mb-1">{heading}</h2>
                <p className="text-sm text-gray-500 text-center mb-8">{subtitle}</p>

                {/* PIN Dots */}
                <div className={`flex justify-center space-x-4 mb-6 ${shake ? 'animate-shake' : ''}`}>
                    {pin.map((digit, i) => (
                        <div key={i} className="relative">
                            <input
                                ref={el => refs.current[i] = el}
                                type="password"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 dark:bg-zinc-800 rounded-2xl border-2 outline-none transition-all caret-transparent"
                                style={{
                                    borderColor: digit ? 'var(--cashapp-color, #00D632)' : error ? '#EF4444' : 'transparent',
                                    color: 'transparent',
                                    textShadow: '0 0 0 transparent'
                                }}
                                value={digit}
                                onChange={e => handleChange(i, e.target.value)}
                                onKeyDown={e => handleKeyDown(i, e)}
                            />
                            {/* Dot indicator */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className={`w-3.5 h-3.5 rounded-full transition-all ${digit ? 'bg-cashapp scale-100' : 'bg-gray-200 dark:bg-zinc-700 scale-75'
                                    }`} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm font-medium text-center mb-4">{error}</p>
                )}

                {/* Reset PIN link (only when entering existing PIN) */}
                {phase === "enter" && (
                    <button
                        onClick={() => {
                            localStorage.removeItem(storageKey);
                            setPhase("create");
                            setPin(["", "", "", ""]);
                            setError("");
                            setTimeout(() => refs.current[0]?.focus(), 100);
                        }}
                        className="block mx-auto text-xs text-cashapp font-bold hover:underline mt-2"
                    >
                        Reset PIN
                    </button>
                )}
            </div>

            {/* Shake animation */}
            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-8px); }
                    40% { transform: translateX(8px); }
                    60% { transform: translateX(-6px); }
                    80% { transform: translateX(6px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </div>
    );
}
