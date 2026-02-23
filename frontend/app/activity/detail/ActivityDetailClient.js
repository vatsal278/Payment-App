"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useToast } from "@/components/Toast";
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Building2, Copy, Check, X, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import PinModal from "@/components/PinModal";
import { playKaChing } from "@/lib/sound";
import { useRef } from "react";

export default function TransactionDetailPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [tx, setTx] = useState(null);
    const [ledger, setLedger] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isPinOpen, setIsPinOpen] = useState(false);
    const pendingAction = useRef(null);
    const toast = useToast();

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading]);

    useEffect(() => {
        if (user && id) fetchDetail();
    }, [user, id]);

    const fetchDetail = async () => {
        setIsLoading(true);
        try {
            const { data } = await api.get(`/transfer/${id}`);
            setTx(data.data.transaction);
            setLedger(data.data.ledgerEntries || []);
        } catch (err) {
            console.error("Failed to fetch transaction detail");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRespond = async (action) => {
        try {
            await api.post(`/transfer/respond/${id}`, { action });
            if (action === 'accept') {
                playKaChing();
                toast.success("Payment sent successfully");
            } else {
                toast.success("Request declined");
            }
            await fetchDetail();
        } catch (err) {
            toast.error(`Failed to ${action}: ` + (err.response?.data?.message || err.message));
        }
    };

    const handleCancelOrder = async () => {
        try {
            await api.delete(`/trading/order/${id}`);
            toast.success("Order cancelled and funds refunded");
            await fetchDetail();
        } catch (err) {
            toast.error("Failed to cancel order: " + (err.response?.data?.message || err.message));
        }
    };

    const copyId = () => {
        navigator.clipboard.writeText(id);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (loading || !user || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
                <div className="w-10 h-10 border-4 border-cashapp border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!tx) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black p-6">
                <AlertCircle className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">Transaction not found</p>
                <button onClick={() => router.push("/activity")} className="mt-4 text-cashapp font-bold">Back to Activity</button>
            </div>
        );
    }

    const isSender = tx.sender_id === user.id;
    const isRequest = tx.type === 'request';
    const otherName = isSender ? tx.receiver_name : tx.sender_name;
    const otherCashtag = isSender ? tx.receiver_cashtag : tx.sender_cashtag;

    const statusConfig = {
        completed: { icon: CheckCircle2, color: 'text-cashapp', bg: 'bg-cashapp/10', label: 'Completed' },
        pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Pending' },
        cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Cancelled' },
        failed: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10', label: 'Failed' },
        filled: { icon: CheckCircle2, color: 'text-cashapp', bg: 'bg-cashapp/10', label: 'Filled' },
    };
    const status = statusConfig[tx.status] || statusConfig.pending;
    const StatusIcon = status.icon;

    let actionLabel;
    if (isRequest) {
        const isRequester = tx.receiver_id === user.id;
        actionLabel = isRequester ? `Requested from ${otherName}` : `Request from ${tx.receiver_name}`;
    } else if (tx.type === 'trade') {
        const isBuy = tx.side === 'buy';
        const symbol = tx.symbol?.split('/')[0] || 'Asset';
        actionLabel = `${isBuy ? 'Bought' : 'Sold'} ${symbol}`;
    } else {
        actionLabel = isSender ? `Sent to ${otherName}` : `Received from ${otherName}`;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black p-6">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button onClick={() => router.push("/activity")} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">Transaction Details</h1>
            </div>

            {/* Main Card */}
            <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 mb-6">
                {/* Amount + Direction */}
                <div className="flex flex-col items-center mb-6">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isRequest ? 'bg-amber-500/10 text-amber-500' :
                        isSender ? 'bg-gray-200 dark:bg-zinc-800 text-gray-500' :
                            'bg-cashapp/10 text-cashapp'
                        }`}>
                        {isRequest ? <Clock className="w-7 h-7" /> :
                            tx.type === 'trade' ? (tx.asset_type === 'crypto' ? <span className="text-2xl">₿</span> : <span className="text-2xl">📈</span>) :
                                isSender ? <ArrowUpRight className="w-7 h-7" /> :
                                    <ArrowDownLeft className="w-7 h-7" />}
                    </div>
                    <p className={`text-5xl font-bold tracking-tight ${(!isSender && tx.type === 'send') || (tx.type === 'trade' && tx.side === 'sell') ? 'text-cashapp' : ''
                        }`}>
                        {(!isSender && tx.type === 'send') || (tx.type === 'trade' && tx.side === 'sell') ? '+' : (tx.type === 'send' || (tx.type === 'trade' && tx.side === 'buy')) ? '-' : ''}${(tx.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-500 mt-2 font-medium">{actionLabel}</p>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center mb-6">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${status.bg}`}>
                        <StatusIcon className={`w-4 h-4 ${status.color}`} />
                        <span className={`text-sm font-bold ${status.color}`}>{status.label}</span>
                    </div>
                </div>

                {/* Other Party */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-black rounded-2xl">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-cashapp/10 rounded-full flex items-center justify-center">
                                <span className="text-cashapp font-bold text-lg">{otherName?.charAt(0)?.toUpperCase() || '?'}</span>
                            </div>
                            <div>
                                <p className="font-bold">{otherName}</p>
                                {tx.type !== 'trade' && <p className="text-sm text-cashapp">{otherCashtag}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Trade Details */}
                    {tx.type === 'trade' && (
                        <div className="p-4 bg-white dark:bg-black rounded-2xl space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Asset</span>
                                <span className="text-sm font-bold">{tx.symbol?.split('/')[0]}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Quantity</span>
                                <span className="text-sm font-bold">
                                    {Number(tx.quantity).toLocaleString(undefined, { maximumFractionDigits: tx.asset_type === 'crypto' ? 8 : 4 })}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Average Price</span>
                                <span className="text-sm font-bold">${(tx.price_cents / 100).toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    {/* Note */}
                    {tx.note && (
                        <div className="p-4 bg-white dark:bg-black rounded-2xl">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Note</p>
                            <p className="font-medium italic">"{tx.note}"</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Accept/Decline for pending requests */}
            {isRequest && tx.status === 'pending' && tx.sender_id === user.id && (
                <div className="flex space-x-3 mb-6">
                    <button
                        onClick={() => { pendingAction.current = () => handleRespond('accept'); setIsPinOpen(true); }}
                        className="flex-1 flex items-center justify-center space-x-2 bg-cashapp text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-cashapp/20"
                    >
                        <Check className="w-5 h-5" />
                        <span>Pay ${(tx.amount / 100).toFixed(2)}</span>
                    </button>
                    <button
                        onClick={() => handleRespond('decline')}
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-zinc-800 font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <X className="w-5 h-5" />
                        <span>Decline</span>
                    </button>
                </div>
            )}

            {/* Cancel Pending Order */}
            {tx.type === 'trade' && tx.status === 'pending' && (
                <div className="flex mb-6">
                    <button
                        onClick={() => { pendingAction.current = handleCancelOrder; setIsPinOpen(true); }}
                        className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white font-bold py-4 rounded-2xl hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-500/20"
                    >
                        <X className="w-5 h-5" />
                        <span>Cancel Order</span>
                    </button>
                </div>
            )}

            {/* Details Section */}
            <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Details</h3>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                    <span className="text-sm text-gray-500">Type</span>
                    <span className="text-sm font-bold capitalize">{tx.type}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                    <span className="text-sm text-gray-500">Date</span>
                    <span className="text-sm font-bold">
                        {new Date(tx.created_at).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                    <span className="text-sm text-gray-500">Time</span>
                    <span className="text-sm font-bold">
                        {new Date(tx.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <button
                    onClick={copyId}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
                >
                    <span className="text-sm text-gray-500">Transaction ID</span>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-gray-400">{id?.slice(0, 8)}...</span>
                        {copied ? <CheckCircle2 className="w-4 h-4 text-cashapp" /> : <Copy className="w-4 h-4 text-gray-400" />}
                    </div>
                </button>

                {/* Ledger Entries */}
                {ledger.length > 0 && (
                    <>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-6 mb-2">Ledger</h3>
                        {ledger.map((entry, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl">
                                <span className="text-sm text-gray-500 capitalize">{entry.entry_type}</span>
                                <span className={`text-sm font-bold ${entry.entry_type === 'credit' ? 'text-cashapp' : 'text-red-400'}`}>
                                    {entry.entry_type === 'credit' ? '+' : '-'}${(entry.amount / 100).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <PinModal
                isOpen={isPinOpen}
                onSuccess={() => { setIsPinOpen(false); if (pendingAction.current) { pendingAction.current(); pendingAction.current = null; } }}
                onClose={() => { setIsPinOpen(false); pendingAction.current = null; }}
                userId={user?.id}
            />
        </div>
    );
}
