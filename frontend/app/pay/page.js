"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Keypad from "@/components/Keypad";
import useDebounce from "@/hooks/useDebounce";
import api from "@/lib/api";
import { X, Search, Loader2, CheckCircle2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { playKaChing } from "@/lib/sound";
import PinModal from "@/components/PinModal";

export default function PayPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [amount, setAmount] = useState("0");
    const [step, setStep] = useState(1); // 1: Amount, 2: Recipient
    const [cashtag, setCashtag] = useState("");
    const [note, setNote] = useState("");
    const [mode, setMode] = useState("pay"); // "pay" or "request"
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // User search
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isPinOpen, setIsPinOpen] = useState(false);
    const pendingAction = useRef(null);

    const debouncedCashtag = useDebounce(cashtag, 300);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlMode = params.get("mode");
        const urlCashtag = params.get("cashtag");

        if (urlMode === "request") setMode("request");
        if (urlCashtag) {
            setCashtag(urlCashtag.startsWith("$") ? urlCashtag : `$${urlCashtag}`);
        }
    }, []);

    // Debounced user search
    useEffect(() => {
        const query = debouncedCashtag.replace(/^\$/, '').trim();
        if (query.length < 1) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        setShowResults(true);
        const search = async () => {
            setIsSearching(true);
            try {
                const { data } = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
                setSearchResults(data.data?.users || []);
            } catch (err) {
                console.error("Search failed");
            } finally {
                setIsSearching(false);
            }
        };
        search();
    }, [debouncedCashtag]);

    const selectUser = (selectedUser) => {
        setCashtag(selectedUser.cashtag);
        setShowResults(false);
        setSearchResults([]);
    };

    const handleAction = (m) => {
        if (parseFloat(amount) > 0) {
            setMode(m);
            setStep(2);
        }
    };

    const handleSend = async () => {
        setIsSubmitting(true);
        setError("");

        try {
            const amountCents = Math.round(parseFloat(amount) * 100);
            const idempotencyKey = uuidv4();

            const payload = {
                cashtag: cashtag.startsWith("$") ? cashtag : `$${cashtag}`,
                amount: amountCents,
                note: note || (mode === "request" ? "Request from FlowCash" : "Sent via FlowCash"),
            };

            const endpoint = mode === "request" ? "/transfer/request" : "/transfer/send";
            await api.post(endpoint, payload, {
                headers: { "X-Idempotency-Key": idempotencyKey }
            });

            setSuccess(true);
            playKaChing();
            setTimeout(() => router.push("/"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Transaction failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className={`flex flex-col items-center justify-center min-h-screen ${mode === 'request' ? 'bg-zinc-900' : 'bg-cashapp'} text-white animate-in fade-in zoom-in duration-300`}>
                <CheckCircle2 className="w-24 h-24 mb-6 animate-bounce" />
                <h1 className="text-3xl font-bold">{mode === 'request' ? 'Requested!' : 'Sent!'}</h1>
                <p className="mt-2 text-white/80">${parseFloat(amount).toFixed(2)} {mode === 'request' ? 'from' : 'to'} {cashtag}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => step === 1 ? router.back() : setStep(1)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                    <X className="w-8 h-8" />
                </button>
                {step === 2 && (
                    <div className="flex-1 text-center">
                        <p className="text-cashapp font-bold text-xl">${parseFloat(amount).toFixed(2)}</p>
                    </div>
                )}
                <div className="w-10" />
            </div>

            {step === 1 ? (
                <div className="flex-1 flex flex-col justify-center items-center">
                    <div className="text-center mb-8">
                        <span className="text-7xl font-bold tracking-tighter">
                            <span className="text-cashapp opacity-50 mr-2">$</span>
                            {amount === "0" ? "0" : amount}
                        </span>
                    </div>

                    <Keypad amount={amount} setAmount={setAmount} />

                    <div className="flex space-x-4 mt-8 w-full pb-8">
                        <button
                            onClick={() => handleAction("pay")}
                            disabled={parseFloat(amount) <= 0}
                            className="flex-1 bg-cashapp text-white font-bold py-5 rounded-full shadow-lg shadow-cashapp/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                        >
                            Pay
                        </button>
                        <button
                            onClick={() => handleAction("request")}
                            disabled={parseFloat(amount) <= 0}
                            className="flex-1 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 font-bold py-5 rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                        >
                            Request
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="space-y-6">
                        <div className="relative">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">To</label>
                            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-transparent focus-within:border-cashapp transition-all">
                                <span className="text-cashapp font-bold text-lg">$</span>
                                <input
                                    autoFocus
                                    className="bg-transparent outline-none flex-1 font-bold text-lg"
                                    placeholder="Search name or cashtag"
                                    value={cashtag.replace(/^\$/, '')}
                                    onChange={(e) => setCashtag(e.target.value)}
                                    onFocus={() => cashtag.replace(/^\$/, '').length > 0 && setShowResults(true)}
                                />
                                {isSearching ? (
                                    <Loader2 className="w-5 h-5 text-cashapp animate-spin" />
                                ) : (
                                    <Search className="w-5 h-5 text-gray-500" />
                                )}
                            </div>

                            {/* Search Results Dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-xl z-20 max-h-60 overflow-y-auto">
                                    {searchResults.map((u) => (
                                        <button
                                            key={u.id}
                                            onClick={() => selectUser(u)}
                                            className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all first:rounded-t-2xl last:rounded-b-2xl"
                                        >
                                            <div className="w-10 h-10 bg-cashapp/10 rounded-full flex items-center justify-center">
                                                <span className="text-cashapp font-bold text-sm">
                                                    {u.full_name?.charAt(0)?.toUpperCase() || '?'}
                                                </span>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-sm">{u.full_name}</p>
                                                <p className="text-xs text-cashapp">{u.cashtag}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">For</label>
                            <input
                                className="w-full bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl outline-none border border-transparent focus:border-cashapp transition-all font-medium"
                                placeholder="Add a note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                    </div>

                    <button
                        disabled={!cashtag || isSubmitting}
                        onClick={() => { pendingAction.current = handleSend; setIsPinOpen(true); }}
                        className={`mt-10 ${mode === 'request' ? 'bg-zinc-100 text-black shadow-zinc-200/20' : 'bg-cashapp text-white shadow-cashapp/20'} font-bold py-5 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-95 shadow-lg mb-8`}
                    >
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>{mode === 'request' ? 'Request' : 'Pay'} ${parseFloat(amount).toFixed(2)}</span>}
                    </button>
                </div>
            )}

            <PinModal
                isOpen={isPinOpen}
                onSuccess={() => { setIsPinOpen(false); if (pendingAction.current) { pendingAction.current(); pendingAction.current = null; } }}
                onClose={() => { setIsPinOpen(false); pendingAction.current = null; }}
                userId={user?.id}
            />
        </div>
    );
}
