"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import { CreditCard, ArrowRight, Lock, Unlock, Eye, EyeOff, Copy, Check } from "lucide-react";

/**
 * Derive deterministic card details from a user's UUID.
 * Each user gets their own unique card number, CVV, and expiry.
 */
function generateCardDetails(userId) {
  // Simple hash: convert UUID hex chars to a numeric seed
  const hex = userId.replace(/-/g, "");
  let seed = 0;
  for (let i = 0; i < hex.length; i++) {
    seed = ((seed << 5) - seed + parseInt(hex[i], 16)) | 0;
  }
  // Make seed positive
  seed = Math.abs(seed);

  // Generate a 16-digit card number starting with 4 (Visa)
  const digits = [4];
  let s = seed;
  for (let i = 1; i < 16; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    digits.push(s % 10);
  }
  // Fix last digit with Luhn check digit
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let d = digits[i];
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  digits[15] = (10 - (sum % 10)) % 10;

  const cardNumber = digits.join("");
  const formatted = cardNumber.replace(/(.{4})/g, "$1 ").trim();
  const lastFour = cardNumber.slice(-4);

  // Generate CVV (3 digits)
  s = (seed * 7919 + 104729) & 0x7fffffff;
  const cvv = String(100 + (s % 900));

  // Generate expiry (month 01-12, year 2026-2030)
  const month = String(1 + (seed % 12)).padStart(2, "0");
  const year = String(26 + (seed % 5));

  return { cardNumber, formatted, lastFour, cvv, expiry: `${month}/${year}` };
}

export default function CardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [hasCard, setHasCard] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      const savedHasCard = localStorage.getItem(`flowcash_card_active_${user.id}`);
      const savedIsLocked = localStorage.getItem(`flowcash_card_locked_${user.id}`);

      if (savedHasCard === "true") setHasCard(true);
      if (savedIsLocked === "true") setIsLocked(true);
      setIsMounted(true);
    }
  }, [user, loading, router]);

  const card = useMemo(() => {
    if (!user) return null;
    return generateCardDetails(user.id);
  }, [user]);

  const handleGetCard = () => {
    setHasCard(true);
    localStorage.setItem(`flowcash_card_active_${user.id}`, "true");
  };

  const toggleLock = () => {
    const newStatus = !isLocked;
    setIsLocked(newStatus);
    localStorage.setItem(`flowcash_card_locked_${user.id}`, newStatus ? "true" : "false");
  };

  const handleCopyNumber = () => {
    if (card) {
      navigator.clipboard.writeText(card.cardNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading || !user || !isMounted || !card) return null;

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6">Cash Card</h1>

      {!hasCard ? (
        <div className="flex flex-col items-center justify-center text-center mt-12 space-y-6">
          {/* Card Mockup for "Get Card" screen */}
          <div className="w-48 h-72 bg-gradient-to-br from-cashapp via-green-500 to-green-300 rounded-3xl p-6 text-white rotate-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-4 left-4">
              <img
                src="/flowcash-logo.png"
                alt="FlowCash"
                className="w-8 h-8 rounded-lg shadow-sm"
              />
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold mb-1">Card Holder</p>
              <p className="text-sm font-bold truncate">
                {user.fullName || user.full_name}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Get Your Free Cash Card
            </h2>
            <p className="text-sm text-gray-500 max-w-[250px] mx-auto">
              A customizable, zero-fee debit card tied to your FlowCash balance.
            </p>
          </div>

          <button
            onClick={handleGetCard}
            className="w-full max-w-[250px] bg-cashapp text-white font-bold py-4 rounded-full shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Get Free Cash Card
          </button>
        </div>
      ) : (
        <>
          {/* Active Card Visual */}
          <div className={`max-w-[300px] mx-auto rounded-3xl p-6 text-white mb-8 aspect-[1.6/1] flex flex-col justify-between shadow-2xl transition-all duration-300 relative overflow-hidden ${isLocked ? "bg-gradient-to-br from-zinc-800 to-zinc-600 grayscale opacity-80" : "bg-gradient-to-br from-zinc-900 to-zinc-700"}`}>
            {isLocked && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                <Lock className="w-10 h-10 text-white mb-2 opacity-90 drop-shadow-lg" />
                <span className="text-sm font-bold opacity-90 uppercase tracking-widest">Locked</span>
              </div>
            )}
            <div className="flex items-center justify-between relative z-0">
              <img
                src="/flowcash-logo.png"
                alt="FlowCash"
                className="w-10 h-10 rounded-lg"
              />
              <p className="text-xs opacity-60 font-bold tracking-widest">VISA</p>
            </div>
            <div className="relative z-0">
              <p className="text-lg tracking-[0.3em] font-mono opacity-80">
                {showDetails
                  ? card.formatted
                  : `•••• •••• •••• ${card.lastFour}`}
              </p>
              <div className="flex justify-between items-end mt-3">
                <div>
                  <p className="text-[10px] opacity-50 uppercase font-bold tracking-wider">Card Holder</p>
                  <p className="text-sm font-bold">
                    {user.fullName || user.full_name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] opacity-50 uppercase font-bold tracking-wider">Expires</p>
                  <p className="text-sm font-bold">{card.expiry}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Details Panel — revealed on toggle */}
          {showDetails && (
            <div className="max-w-[300px] mx-auto mb-6 p-5 bg-gray-50 dark:bg-zinc-900 rounded-2xl space-y-4 border border-gray-100 dark:border-zinc-800 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Card Number</p>
                  <p className="text-base font-bold font-mono tracking-wider">{card.formatted}</p>
                </div>
                <button
                  onClick={handleCopyNumber}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-cashapp/10 hover:bg-cashapp/20 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-cashapp" />
                  ) : (
                    <Copy className="w-4 h-4 text-cashapp" />
                  )}
                </button>
              </div>
              <div className="flex space-x-8">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Expiry</p>
                  <p className="text-base font-bold font-mono">{card.expiry}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">CVV</p>
                  <p className="text-base font-bold font-mono">{card.cvv}</p>
                </div>
              </div>
            </div>
          )}

          {/* Card Actions */}
          <div className="space-y-3">
            <div
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-cashapp/10 rounded-full flex items-center justify-center">
                  {showDetails ? (
                    <EyeOff className="w-5 h-5 text-cashapp" />
                  ) : (
                    <Eye className="w-5 h-5 text-cashapp" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">{showDetails ? "Hide Details" : "Card Details"}</p>
                  <p className="text-xs text-gray-500">
                    {showDetails ? "Hide card number and CVV" : "View card number and CVV"}
                  </p>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${showDetails ? "rotate-90" : ""}`} />
            </div>

            <div
              onClick={toggleLock}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isLocked ? "bg-amber-500/10" : "bg-red-500/10"}`}>
                  {isLocked ? (
                    <Unlock className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">{isLocked ? "Unlock Card" : "Lock Card"}</p>
                  <p className="text-xs text-gray-500">
                    {isLocked ? "Re-enable payments" : "Temporarily disable your card"}
                  </p>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isLocked ? "bg-amber-500" : "bg-gray-200 dark:bg-zinc-700"}`}>
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isLocked ? "translate-x-4" : "translate-x-0"}`} />
              </div>
            </div>
          </div>
        </>
      )}


    </div>
  );
}
