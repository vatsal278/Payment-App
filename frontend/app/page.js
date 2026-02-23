"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import Modal from "@/components/Modal";
import PinModal from "@/components/PinModal";
import { useToast } from "@/components/Toast";
import StripeCardForm from "@/components/StripeCardForm";
import api from "@/lib/api";
import {
  User,
  Bell,
  QrCode,
  LogOut,
  Copy,
  CreditCard,
  ShieldCheck,
  Link2,
  Maximize,
  RefreshCw,
  Check,
  X,
  Search,
  ChevronDown,
  Plus,
  Trash2,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import QrScanner from "react-qr-scanner";
import StockLogo from "@/components/StockLogo";
import { STOCKS, CRYPTOS } from "@/lib/assets";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [activity, setActivity] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const toast = useToast();

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [camError, setCamError] = useState(false);
  const [isAddCashOpen, setIsAddCashOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isCashOutOpen, setIsCashOutOpen] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState("");
  const [cashOutSpeed, setCashOutSpeed] = useState("standard");
  const [isCashingOut, setIsCashingOut] = useState(false);

  // Savings goal state
  const [isSavingsOpen, setIsSavingsOpen] = useState(false);
  const [savingsGoalName, setSavingsGoalName] = useState("");
  const [savingsTargetAmount, setSavingsTargetAmount] = useState("");
  const [savingsGoals, setSavingsGoals] = useState([]);
  const [isSaveToGoalOpen, setIsSaveToGoalOpen] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);
  const [saveToGoalAmount, setSaveToGoalAmount] = useState("");
  const [isSavingToGoal, setIsSavingToGoal] = useState(false);

  // Stripe & card management state
  const [stripePublishableKey, setStripePublishableKey] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const pendingAction = useRef(null);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      fetchData();
      // Load savings goals from localStorage
      try {
        const saved = localStorage.getItem(`flowcash_savings_${user.id}`);
        if (saved) setSavingsGoals(JSON.parse(saved));
      } catch { }
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [balRes, transRes, methodsRes, notifRes, fundingRes, tradeRes] =
        await Promise.all([
          api.get("/wallet/balance"),
          api.get("/transfer/history?limit=10"),
          api.get("/funding/methods"),
          api.get("/notifications?limit=10"),
          api.get("/funding/history?limit=10"),
          api.get("/trading/orders?limit=10"),
        ]);

      setBalance(balRes.data.data?.balance || 0);

      // Unify activities: Transfer Transactions + Fund Movements
      const transfers = (transRes.data.data?.transactions || []).map((t) => {
        const isSender = t.sender_id === user.id;
        let displayType, otherParty, otherCashtag;
        let isRequest = false;

        if (t.type === "request") {
          isRequest = true;
          // For requests: receiver = the requester, sender = person being asked
          const isRequester = t.receiver_id === user.id; // Is the current user the one who made the request?
          if (isRequester) {
            displayType = "Requested from"; // User requested from sender
            otherParty = t.sender_name;
            otherCashtag = t.sender_cashtag;
          } else {
            displayType = "Request from"; // User received a request from receiver
            otherParty = t.receiver_name;
            otherCashtag = t.receiver_cashtag;
          }
        } else if (t.type === "bitcoin_send") {
          displayType = isSender ? "Sent Bitcoin to" : "Received Bitcoin from";
          otherParty = isSender ? t.receiver_name : t.sender_name;
          otherCashtag = isSender ? t.receiver_cashtag : t.sender_cashtag;
        } else {
          displayType = isSender ? "Sent to" : "Received from";
          otherParty = isSender ? t.receiver_name : t.sender_name;
          otherCashtag = isSender ? t.receiver_cashtag : t.sender_cashtag;
        }

        return {
          ...t,
          displayType,
          otherParty: otherParty || otherCashtag || "Unknown",
          otherCashtag,
          isCashIn: false,
          isRequest: isRequest,
          isIncomingRequest:
            isRequest && t.receiver_id === user.id && t.status === "pending",
        };
      });

      const funding = (fundingRes.data.data?.movements || []).map((f) => ({
        ...f,
        displayType:
          f.direction === "cash_in" ? "Added from Bank" : "Withdrawal",
        otherParty: f.nickname || f.brand || "Bank Account",
        isCashIn: true,
        type: f.direction === "cash_in" ? "receive" : "send", // for color coding
      }));

      const trades = (tradeRes.data.data || []).map((o) => {
        const isCrypto = o.asset_class === "crypto" || o.symbol.includes("/");
        const symbolStr = isCrypto ? o.symbol.split("/")[0] : o.symbol;

        return {
          id: o.id,
          displayType: o.side === "buy" ? "Bought" : "Sold",
          otherParty: symbolStr,
          isCashIn: o.side === "sell",
          type: "trade",
          amount:
            parseFloat(o.notional || o.filled_avg_price * o.filled_qty || 0) *
            100,
          created_at: o.filled_at || o.submitted_at,
          status:
            o.status === "accepted" || o.status === "new"
              ? "pending"
              : o.status,
          isTrade: true,
        };
      });

      const combined = [...transfers, ...funding, ...trades]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10);

      setActivity(combined);
      setPaymentMethods(methodsRes.data.data?.paymentMethods || []);
      setNotifications(notifRes.data.data?.notifications || []);
      setUnreadCount(notifRes.data.data?.unreadCount || 0);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  const handlePullRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const onTouchStart = (e) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };

  const onTouchMove = (e) => {
    if (!isPulling.current) return;
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(diff * 0.4, 80));
    }
  };

  const onTouchEnd = () => {
    if (pullDistance > 50) {
      handlePullRefresh();
    }
    setPullDistance(0);
    isPulling.current = false;
  };

  // PIN gate helper: store an action, show PIN modal, execute on success
  const requirePin = (action) => {
    pendingAction.current = action;
    setIsPinOpen(true);
  };

  const onPinSuccess = () => {
    setIsPinOpen(false);
    if (pendingAction.current) {
      pendingAction.current();
      pendingAction.current = null;
    }
  };

  const handleRespondToRequest = async (transactionId, action) => {
    try {
      await api.post(`/transfer/respond/${transactionId}`, { action });
      await fetchData();
    } catch (err) {
      toast.error(
        `Failed to ${action} request: ` +
        (err.response?.data?.message || err.message),
      );
    }
  };

  // Fetch Stripe publishable key on mount
  useEffect(() => {
    api.get("/funding/stripe-config")
      .then(res => setStripePublishableKey(res.data.data?.publishableKey))
      .catch(() => { });
  }, []);

  const handleCardLinked = async () => {
    await fetchData();
    setShowAddCard(false);
    // Select the newly added card (last in the array)
    setSelectedCardIndex(paymentMethods.length); // Will be set after refresh
  };

  const handleDeleteCard = async (id, e) => {
    e.stopPropagation();
    try {
      await api.delete(`/funding/methods/${id}`);
      await fetchData();
      if (selectedCardIndex >= paymentMethods.length - 1) {
        setSelectedCardIndex(Math.max(0, paymentMethods.length - 2));
      }
      if (paymentMethods.length === 1) {
        setShowCardSelector(false);
      }
      toast.success("Card removed successfully");
    } catch (err) {
      toast.error("Failed to remove card");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      fetchData();
    } catch (err) {
      console.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      fetchData();
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  const handleAddCashDirect = async () => {
    if (!addAmount || isNaN(addAmount)) return;
    if (!paymentMethods || paymentMethods.length === 0) {
      alert("Please link a card first");
      return;
    }
    const idx = Math.min(selectedCardIndex, paymentMethods.length - 1);
    setIsAdding(true);
    try {
      await api.post("/funding/cash-in", {
        payment_method_db_id: paymentMethods[idx].id,
        amount: Math.round(parseFloat(addAmount) * 100),
      });
      await fetchData();
      setIsAddCashOpen(false);
      setAddAmount("");
    } catch (err) {
      toast.error(
        "Failed to add cash: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddCash = () => requirePin(handleAddCashDirect);

  const handleCashOutDirect = async () => {
    if (!cashOutAmount || isNaN(cashOutAmount)) return;
    setIsCashingOut(true);
    try {
      const amountCents = Math.round(parseFloat(cashOutAmount) * 100);
      await api.post("/funding/cash-out", {
        amount: amountCents,
        speed: cashOutSpeed,
      });
      await fetchData();
      setIsCashOutOpen(false);
      setCashOutAmount("");
    } catch (err) {
      toast.error(
        "Withdrawal failed: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setIsCashingOut(false);
    }
  };

  const handleCashOut = () => requirePin(handleCashOutDirect);

  // Record savings activity to localStorage for the activity page
  const recordSavingsActivity = (type, goalName, amount) => {
    try {
      const key = `flowcash_savings_activity_${user.id}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.unshift({
        id: `sav_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        type, // 'save' | 'withdraw' | 'withdraw_all' | 'goal_complete' | 'goal_deleted'
        goalName,
        amount, // in dollars
        created_at: new Date().toISOString(),
      });
      // Keep last 100 entries
      localStorage.setItem(key, JSON.stringify(existing.slice(0, 100)));
    } catch { }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-cashapp border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull-to-refresh indicator */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-200"
        style={{
          height:
            pullDistance > 0
              ? `${pullDistance}px`
              : isRefreshing
                ? "50px"
                : "0px",
        }}
      >
        <RefreshCw
          className={`w-6 h-6 text-cashapp ${isRefreshing ? "animate-spin" : ""}`}
          style={{ transform: `rotate(${pullDistance * 3}deg)` }}
        />
      </div>

      {/* ──── Sticky Header ──── */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 pt-4 pb-3 border-b border-gray-100/50 dark:border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-9 h-9 bg-cashapp/10 rounded-full flex items-center justify-center border-2 border-transparent hover:border-cashapp transition-all active:scale-95"
            >
              <span className="text-cashapp font-bold text-sm">
                {(user.fullName || user.full_name || "?")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </button>
          </div>
          <h1 className="text-lg font-bold">Money</h1>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 relative hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-black">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* ──── Scrollable Content ──── */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 pt-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-500 font-medium">Cash Balance</p>
            <button
              onClick={() => setIsQrOpen(true)}
              className="text-xs text-cashapp font-bold hover:underline"
            >
              Account & Routing
            </button>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            $
            {(balance / 100).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setIsAddCashOpen(true)}
              className="flex-1 bg-white dark:bg-black font-bold py-3.5 rounded-xl text-sm border border-gray-200 dark:border-zinc-700 hover:border-cashapp hover:text-cashapp transition-all active:scale-95 shadow-sm"
            >
              Add Cash
            </button>
            <button
              onClick={() => setIsCashOutOpen(true)}
              className="flex-1 bg-white dark:bg-black font-bold py-3.5 rounded-xl text-sm border border-gray-200 dark:border-zinc-700 hover:border-cashapp hover:text-cashapp transition-all active:scale-95 shadow-sm"
            >
              Withdrawal
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/crypto")}
            className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <span className="text-xl">₿</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Buy Crypto</p>
              <p className="text-[10px] text-gray-400 font-bold">Buy & Sell</p>
            </div>
          </button>
          <button
            onClick={() => router.push("/stocks")}
            className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Invest in stocks</p>
              <p className="text-[10px] text-gray-400 font-bold">Buy & Sell</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group">
            <div className="w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">📋</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Free tax filing</p>
              <p className="text-[10px] text-gray-400 font-bold">Coming soon</p>
            </div>
          </button>
          <button
            onClick={() => router.push("/banking")}
            className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Banking and Saving</p>
              <p className="text-[10px] text-gray-400 font-bold">Coming soon</p>
            </div>
          </button>
        </div>

        {/* Savings Goal Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-800/10 rounded-2xl p-5 border border-amber-200/30 dark:border-amber-700/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">💰 Savings</p>
              {savingsGoals.length > 0 ? (
                <>
                  <p className="text-2xl font-bold mt-1">
                    ${savingsGoals.reduce((sum, g) => sum + (g.saved || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {savingsGoals.length} goal{savingsGoals.length > 1 ? "s" : ""} • Earning 5% interest
                  </p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold mt-1">$0.00</p>
                  <p className="text-xs text-gray-500 mt-1">Start saving & earn 5% interest</p>
                </>
              )}
            </div>
            <button
              onClick={() => setIsSavingsOpen(true)}
              className="px-4 py-2 bg-white dark:bg-black rounded-full text-sm font-bold border border-amber-200 dark:border-amber-700 hover:border-amber-400 transition-all text-amber-600 hover:scale-105 active:scale-95"
            >
              {savingsGoals.length > 0 ? "+ New" : "Start"}
            </button>
          </div>
          {savingsGoals.length > 0 && (
            <div className="mt-4 space-y-3">
              {savingsGoals.map((goal, idx) => {
                const saved = goal.saved || 0;
                const target = parseFloat(goal.target) || 1;
                const pct = Math.min(100, (saved / target) * 100);
                return (
                  <div
                    key={idx}
                    onClick={() => { setSelectedGoalIndex(idx); setSaveToGoalAmount(""); setIsSaveToGoalOpen(true); }}
                    className="bg-white/60 dark:bg-black/20 rounded-xl p-3 cursor-pointer hover:bg-white/80 dark:hover:bg-black/30 transition-all active:scale-[0.98]"
                  >
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold">{goal.name}</span>
                      <span className="text-xs text-gray-500">
                        ${saved.toLocaleString(undefined, { minimumFractionDigits: 2 })} / ${target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-1.5 mt-2">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-amber-600 font-bold mt-1.5">Tap to add money →</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Scan / QR / Search Quick Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => router.push("/search")}
            className="flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            <Search className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-xs text-center">Search</span>
          </button>
          <button
            onClick={() => setIsScanOpen(true)}
            className="flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            <Maximize className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-xs text-center">Scan to Pay</span>
          </button>
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            <QrCode className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-xs text-center">My QR</span>
          </button>
        </div>
      </div>

      {/* ──── Modals (unchanged) ──── */}
      <Modal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title="My Profile"
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 bg-cashapp/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-cashapp text-2xl font-bold">
              {(user.fullName || user.full_name || "?").charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            {user.fullName || user.full_name}
          </h3>
          <p className="text-cashapp font-bold text-lg mb-8">{user.cashtag}</p>

          <div className="w-full space-y-2">
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/profile");
              }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">Edit Profile</span>
              </div>
            </button>
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/settings");
              }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">Settings</span>
              </div>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl text-red-500"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span className="font-bold text-sm">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title="My Cashtag"
      >
        <div className="flex flex-col items-center py-8">
          <div className="p-8 bg-white rounded-3xl mb-8 shadow-inner border-2 border-gray-100 flex items-center justify-center">
            <QRCodeSVG
              value={`${window.location.origin}/pay?cashtag=${user.cashtag}`}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"Q"}
              includeMargin={false}
              imageSettings={{
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/2048px-Square_Cash_app_logo.svg.png",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">{user.cashtag}</h3>
          <p className="text-gray-500 text-sm mb-8">
            Scan to pay anyone on FlowCash
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(user.cashtag);
                toast.success("Cashtag copied!");
              }}
              className="flex items-center space-x-2 bg-gray-50 dark:bg-zinc-800 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all border border-gray-100 dark:border-zinc-800"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Cashtag</span>
            </button>
            <button
              onClick={() => {
                const link = `${window.location.origin}/pay?cashtag=${user.cashtag}`;
                navigator.clipboard.writeText(link);
                toast.success("Payment link copied!");
              }}
              className="flex items-center space-x-2 bg-cashapp text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-cashapp/20"
            >
              <Link2 className="w-4 h-4" />
              <span>Pay Link</span>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isScanOpen}
        onClose={() => {
          setIsScanOpen(false);
          setCamError(false);
        }}
        title="Scan to Pay"
      >
        <div className="flex flex-col items-center py-8">
          <div className="w-64 h-64 border-4 border-cashapp rounded-3xl relative overflow-hidden bg-black mb-8 flex items-center justify-center">
            {camError ? (
              <div className="text-center p-4">
                <QrCode className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">Camera Access Needed</p>
                <p className="text-xs text-zinc-400 mt-1">Please allow camera permissions in your browser to scan QR codes.</p>
              </div>
            ) : (
              <>
                <QrScanner
                  delay={300}
                  onScan={(data) => {
                    if (data && data.text) {
                      const url = new URL(data.text);
                      const scannedCashtag = url.searchParams.get("cashtag");
                      if (scannedCashtag) {
                        setIsScanOpen(false);
                        router.push(`/pay?cashtag=${scannedCashtag}`);
                      }
                    }
                  }}
                  onError={(err) => {
                    if (err?.name === "NotAllowedError" || err?.message?.includes("Permission")) {
                      setCamError(true);
                    } else {
                      console.error(err);
                    }
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  constraints={{ video: { facingMode: "environment" } }}
                />
                <div className="w-full h-1 bg-cashapp absolute top-0 animate-[scan_2s_linear_infinite]" />
                <p className="absolute bottom-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
                  Point camera at QR
                </p>
              </>
            )}
          </div>
          <p className="text-gray-500 text-center mb-8 text-sm px-8">
            Align a FlowCash QR code within the frame to automatically pay or
            request.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Notifications"
      >
        <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-cashapp font-bold mb-2 ml-auto block"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 ? (
            notifications.map((n) => {
              const isRequest =
                n.type === "payment_request" ||
                (n.message && n.message.includes("requested"));
              return (
                <div
                  key={n.id}
                  onClick={() => {
                    if (!n.is_read) handleMarkAsRead(n.id);
                    if (isRequest) {
                      setIsNotificationsOpen(false);
                      router.push("/activity?filter=requests");
                    }
                  }}
                  className={`p-4 rounded-2xl flex items-start space-x-4 transition-all cursor-pointer ${n.is_read
                    ? "bg-transparent border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900"
                    : "bg-cashapp/5 border border-cashapp/10 shadow-sm"
                    }`}
                >
                  <div
                    className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.is_read ? "bg-transparent" : "bg-cashapp animate-pulse"}`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${n.is_read ? "text-gray-500" : "font-bold"}`}
                    >
                      {n.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                      {isRequest && (
                        <span className="text-[10px] text-cashapp font-bold uppercase tracking-wider">
                          Tap to respond →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center py-12 text-gray-500">
              <Bell className="w-12 h-12 mb-4 opacity-10" />
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isAddCashOpen}
        onClose={() => setIsAddCashOpen(false)}
        title="Add Cash"
      >
        <div className="py-4 space-y-6">
          {showAddCard || !paymentMethods || paymentMethods.length === 0 ? (
            /* ── Stripe Elements Card Entry ── */
            stripePublishableKey ? (
              <StripeCardForm
                publishableKey={stripePublishableKey}
                onSuccess={handleCardLinked}
                onCancel={paymentMethods?.length > 0 ? () => setShowAddCard(false) : null}
              />
            ) : (
              <div className="text-center py-8">
                <CreditCard className="w-10 h-10 text-cashapp mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading payment form...</p>
              </div>
            )
          ) : (
            <>
              {/* ── Amount Input ── */}
              <div className="flex items-center space-x-4 bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
                <span className="text-3xl font-bold text-cashapp">$</span>
                <input
                  type="number"
                  autoFocus
                  placeholder="0.00"
                  className="bg-transparent text-3xl font-bold outline-none w-full"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>

              {/* ── Card Selector ── */}
              <div className="relative">
                <div
                  onClick={() => setShowCardSelector(!showCardSelector)}
                  className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center space-x-4 border border-transparent hover:border-cashapp transition-all cursor-pointer"
                >
                  <div className="w-12 h-10 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center overflow-hidden">
                    <span className="text-[10px] text-zinc-400 font-bold tracking-tighter uppercase">
                      {paymentMethods[Math.min(selectedCardIndex, paymentMethods.length - 1)]?.brand || "CARD"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">
                      {paymentMethods[Math.min(selectedCardIndex, paymentMethods.length - 1)]?.brand || "Card"} •••• {paymentMethods[Math.min(selectedCardIndex, paymentMethods.length - 1)]?.last_four || "****"}
                    </p>
                    <p className="text-xs text-gray-500">Connected</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCardSelector ? "rotate-180" : ""}`} />
                </div>

                {/* ── Card Dropdown ── */}
                {showCardSelector && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 z-50 overflow-hidden">
                    {paymentMethods.map((pm, idx) => (
                      <div
                        key={pm.id}
                        onClick={() => { setSelectedCardIndex(idx); setShowCardSelector(false); }}
                        className={`flex items-center space-x-4 p-4 cursor-pointer transition-colors ${idx === Math.min(selectedCardIndex, paymentMethods.length - 1)
                          ? "bg-cashapp/10"
                          : "hover:bg-gray-50 dark:hover:bg-zinc-700"
                          }`}
                      >
                        <div className="w-10 h-8 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center">
                          <span className="text-[9px] text-zinc-400 font-bold uppercase">
                            {pm.brand || "CARD"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{pm.brand || "Card"} •••• {pm.last_four || "****"}</p>
                        </div>
                        <button
                          onClick={(e) => handleDeleteCard(pm.id, e)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {idx === Math.min(selectedCardIndex, paymentMethods.length - 1) && (
                          <Check className="w-4 h-4 text-cashapp" />
                        )}
                      </div>
                    ))}
                    {/* Add new card option */}
                    <div
                      onClick={() => { setShowCardSelector(false); setShowAddCard(true); }}
                      className="flex items-center space-x-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700 border-t border-gray-100 dark:border-zinc-700"
                    >
                      <div className="w-10 h-8 bg-cashapp/10 rounded-lg flex items-center justify-center">
                        <Plus className="w-4 h-4 text-cashapp" />
                      </div>
                      <p className="font-bold text-sm text-cashapp">Add Another Card</p>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Submit Button ── */}
              <button
                disabled={!addAmount || isAdding}
                onClick={handleAddCash}
                className="w-full bg-cashapp text-white font-bold py-5 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {isAdding
                  ? "Processing..."
                  : `Add $${parseFloat(addAmount || 0).toFixed(2)}`}
              </button>
            </>
          )}
        </div>
      </Modal>

      {/* Cash Out Modal */}
      <Modal
        isOpen={isCashOutOpen}
        onClose={() => setIsCashOutOpen(false)}
        title="Withdrawal"
      >
        <div className="py-4 space-y-6">
          <div className="flex items-center space-x-4 bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
            <span className="text-3xl font-bold text-cashapp">$</span>
            <input
              type="number"
              autoFocus
              placeholder="0.00"
              className="bg-transparent text-3xl font-bold outline-none w-full"
              value={cashOutAmount}
              onChange={(e) => setCashOutAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-center mb-4">
            {paymentMethods && paymentMethods.length > 0 ? (
              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all border border-gray-200 dark:border-zinc-700/50">
                <span className="text-[10px] text-zinc-500 font-bold uppercase">
                  Cash out to
                </span>
                <span className="text-sm font-bold">
                  {paymentMethods[0].brand || "Card"} •••• {paymentMethods[0].last_four || "****"}
                </span>
              </div>
            ) : (
              <button
                onClick={() => router.push("/cards")}
                className="flex items-center space-x-2 bg-cashapp/10 text-cashapp px-4 py-2 rounded-full cursor-pointer hover:bg-cashapp/20 transition-all border border-cashapp/20 text-sm font-bold"
              >
                <CreditCard className="w-4 h-4" />
                <span>Link a Bank or Card to Cash Out</span>
              </button>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-3 font-bold uppercase tracking-widest">
              Transfer Speed
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setCashOutSpeed("standard")}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all border ${cashOutSpeed === "standard"
                  ? "bg-cashapp text-white border-cashapp shadow-lg shadow-cashapp/20"
                  : "bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800"
                  }`}
              >
                Standard
                <p className="text-[10px] opacity-70 mt-1">1-3 days • Free</p>
              </button>
              <button
                onClick={() => setCashOutSpeed("instant")}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all border ${cashOutSpeed === "instant"
                  ? "bg-cashapp text-white border-cashapp shadow-lg shadow-cashapp/20"
                  : "bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800"
                  }`}
              >
                Instant
                <p className="text-[10px] opacity-70 mt-1">
                  Seconds • 1.5% fee
                </p>
              </button>
            </div>
          </div>

          {cashOutAmount &&
            !isNaN(cashOutAmount) &&
            parseFloat(cashOutAmount) > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold">
                    ${parseFloat(cashOutAmount).toFixed(2)}
                  </span>
                </div>
                {cashOutSpeed === "instant" && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fee (1.5%)</span>
                    <span className="font-bold text-amber-500">
                      -$
                      {Math.max(
                        0.25,
                        parseFloat(cashOutAmount) * 0.015,
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-100 dark:border-zinc-800 pt-2">
                  <span className="text-gray-500 font-bold">You receive</span>
                  <span className="font-bold text-cashapp">
                    $
                    {(
                      parseFloat(cashOutAmount) -
                      (cashOutSpeed === "instant"
                        ? Math.max(0.25, parseFloat(cashOutAmount) * 0.015)
                        : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

          <button
            disabled={
              !cashOutAmount || isCashingOut || parseFloat(cashOutAmount) <= 0
            }
            onClick={handleCashOut}
            className="w-full bg-cashapp text-white font-bold py-5 rounded-full flex items-center justify-center disabled:opacity-50 shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isCashingOut
              ? "Processing..."
              : `Withdraw $${parseFloat(cashOutAmount || 0).toFixed(2)}`}
          </button>
        </div>
      </Modal>

      {/* Recent Activity */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Activity</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePullRefresh}
              className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => router.push("/activity")}
              className="text-cashapp text-sm font-bold"
            >
              See All
            </button>
          </div>
        </div>
        <div className="space-y-0">
          {activity.length > 0 ? (
            activity.map((item, idx) => {
              const isSender = item.sender_id === user.id;
              const isIncoming = item.isCashIn || (!isSender && item.type === "send");

              return (
                <div
                  key={item.id}
                  className={`flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 px-1 -mx-1 rounded-xl transition-all ${idx < activity.length - 1 ? "border-b border-gray-100 dark:border-zinc-800/50" : ""
                    }`}
                  onClick={() =>
                    !item.isCashIn && router.push(`/activity/detail?id=${item.id}`)
                  }
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {item.isTrade ? (
                      <StockLogo
                        assetInfo={
                          CRYPTOS.find(c => c.symbol.startsWith(item.otherParty)) || STOCKS.find(s => s.symbol === item.otherParty)
                        }
                        symbol={item.otherParty}
                        size="w-10 h-10"
                      />
                    ) : item.type === "bitcoin_send" ? (
                      <StockLogo
                        assetInfo={CRYPTOS.find(c => c.alpacaSymbol === "BTCUSD")}
                        symbol="BTC"
                        size="w-10 h-10"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${item.isCashIn ? "bg-blue-500" :
                        item.type === "request" ? "bg-orange-500" :
                          isIncoming ? "bg-cashapp" : "bg-gray-400 dark:bg-zinc-600"
                        }`}>
                        {item.isCashIn ? "🏦" :
                          item.type === "request" ? "!" :
                            isIncoming ? "↓" : "↑"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[15px] truncate">
                        {item.otherCashtag || item.otherParty}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.displayType}
                        {" · "}
                        {new Date(item.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right ml-3 shrink-0">
                    <p className={`font-bold text-[15px] ${isIncoming ? "text-cashapp" : ""}`}>
                      {isIncoming ? "+" : "-"}${(item.amount / 100).toFixed(2)}
                    </p>
                    {item.status && item.status !== "completed" && item.status !== "filled" && (
                      <p className={`text-[10px] font-medium mt-0.5 ${item.status === "pending" ? "text-amber-500" :
                        item.status === "failed" || item.status === "declined" ? "text-red-500" :
                          "text-gray-400"
                        }`}>
                        {item.status}
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 py-8 text-sm">
              No recent activity
            </p>
          )}
        </div>
      </div>

      {/* Savings Goal Modal */}
      <Modal
        isOpen={isSavingsOpen}
        onClose={() => { setIsSavingsOpen(false); setSavingsGoalName(""); setSavingsTargetAmount(""); }}
        title="Start Saving & Earn 5% Interest"
      >
        <div className="py-4 space-y-5">
          <p className="text-sm text-gray-500 text-center">
            What are you saving for? Enter a goal name and target amount.
          </p>

          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Goal Name</label>
              <input
                type="text"
                placeholder="e.g. Vacation, Emergency Fund..."
                className="bg-transparent text-base font-bold outline-none w-full"
                value={savingsGoalName}
                onChange={(e) => setSavingsGoalName(e.target.value)}
              />
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4">
              <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Target Amount</label>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-cashapp">$</span>
                <input
                  type="number"
                  placeholder="1,000"
                  className="bg-transparent text-base font-bold outline-none w-full"
                  value={savingsTargetAmount}
                  onChange={(e) => setSavingsTargetAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => { setIsSavingsOpen(false); setSavingsGoalName(""); setSavingsTargetAmount(""); }}
              className="flex-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
            >
              Cancel
            </button>
            <button
              disabled={!savingsGoalName || !savingsTargetAmount || parseFloat(savingsTargetAmount) <= 0}
              onClick={() => {
                const newGoal = { name: savingsGoalName, target: savingsTargetAmount, createdAt: new Date().toISOString() };
                const updated = [...savingsGoals, newGoal];
                setSavingsGoals(updated);
                localStorage.setItem(`flowcash_savings_${user.id}`, JSON.stringify(updated));
                setSavingsGoalName("");
                setSavingsTargetAmount("");
                setIsSavingsOpen(false);
              }}
              className="flex-1 bg-cashapp text-white font-bold py-4 rounded-full shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              Create Goal
            </button>
          </div>
        </div>
      </Modal>

      {/* Save to Goal Modal */}
      <Modal
        isOpen={isSaveToGoalOpen}
        onClose={() => { setIsSaveToGoalOpen(false); setSaveToGoalAmount(""); setSelectedGoalIndex(null); }}
        title={selectedGoalIndex !== null && savingsGoals[selectedGoalIndex]
          ? savingsGoals[selectedGoalIndex].name
          : "Savings Goal"}
      >
        {selectedGoalIndex !== null && savingsGoals[selectedGoalIndex] && (() => {
          const goal = savingsGoals[selectedGoalIndex];
          const saved = goal.saved || 0;
          const target = parseFloat(goal.target) || 1;
          const pct = Math.min(100, (saved / target) * 100);
          const isComplete = pct >= 100;

          return (
            <div className="py-4 space-y-5">
              {/* Completion Celebration */}
              {isComplete && (
                <div className="text-center py-4 space-y-2">
                  <p className="text-5xl">🎉</p>
                  <p className="text-xl font-bold text-amber-600">Goal Reached!</p>
                  <p className="text-sm text-gray-500">
                    Congratulations! You saved ${target.toLocaleString()} for "{goal.name}"
                  </p>
                </div>
              )}

              {/* Progress */}
              <div className="text-center">
                <p className="text-3xl font-bold">
                  ${saved.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  <span className="text-base text-gray-500 font-medium"> / ${target.toLocaleString()}</span>
                </p>
                <div className="w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 mt-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${isComplete ? "bg-cashapp" : "bg-amber-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {isComplete ? "✅ Goal complete!" : `${pct.toFixed(1)}% of goal reached`}
                </p>
              </div>

              {/* Amount input */}
              <div className="flex items-center space-x-4 bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
                <span className="text-3xl font-bold text-amber-600">$</span>
                <input
                  type="number"
                  autoFocus
                  placeholder="0.00"
                  className="bg-transparent text-3xl font-bold outline-none w-full"
                  value={saveToGoalAmount}
                  onChange={(e) => setSaveToGoalAmount(e.target.value)}
                />
              </div>

              <p className="text-xs text-gray-500 text-center">
                Balance: <span className="font-bold">${(balance / 100).toFixed(2)}</span>
                {saved > 0 && <> · In savings: <span className="font-bold">${saved.toFixed(2)}</span></>}
              </p>

              {/* Action buttons */}
              <div className="flex space-x-3">
                {/* Withdraw button */}
                <button
                  disabled={!saveToGoalAmount || parseFloat(saveToGoalAmount) <= 0 || parseFloat(saveToGoalAmount) > saved || isSavingToGoal}
                  onClick={async () => {
                    const amt = parseFloat(saveToGoalAmount);
                    if (!amt || amt <= 0 || amt > saved) return;
                    const cents = Math.round(amt * 100);
                    setIsSavingToGoal(true);
                    try {
                      await api.post("/wallet/credit", { amount: cents, description: `Withdraw from: ${goal.name}` });
                      const updated = [...savingsGoals];
                      updated[selectedGoalIndex] = {
                        ...updated[selectedGoalIndex],
                        saved: Math.max(0, (updated[selectedGoalIndex].saved || 0) - amt),
                      };
                      setSavingsGoals(updated);
                      localStorage.setItem(`flowcash_savings_${user.id}`, JSON.stringify(updated));
                      await fetchData();
                      setSaveToGoalAmount("");
                      toast.success(`$${amt.toFixed(2)} withdrawn to balance`);
                      recordSavingsActivity('withdraw', goal.name, amt);
                    } catch (err) {
                      toast.error("Withdraw failed: " + (err.response?.data?.message || err.message));
                    } finally {
                      setIsSavingToGoal(false);
                    }
                  }}
                  className="flex-1 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold py-4 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all disabled:opacity-50"
                >
                  {isSavingToGoal ? "..." : "Withdraw"}
                </button>

                {/* Save button */}
                <button
                  disabled={!saveToGoalAmount || parseFloat(saveToGoalAmount) <= 0 || parseFloat(saveToGoalAmount) * 100 > balance || isSavingToGoal}
                  onClick={async () => {
                    const amt = parseFloat(saveToGoalAmount);
                    if (!amt || amt <= 0) return;
                    const cents = Math.round(amt * 100);
                    if (cents > balance) {
                      toast.error("Insufficient balance");
                      return;
                    }
                    setIsSavingToGoal(true);
                    try {
                      await api.post("/wallet/debit", { amount: cents, description: `Savings: ${goal.name}` });
                      const updated = [...savingsGoals];
                      updated[selectedGoalIndex] = {
                        ...updated[selectedGoalIndex],
                        saved: (updated[selectedGoalIndex].saved || 0) + amt,
                      };
                      setSavingsGoals(updated);
                      localStorage.setItem(`flowcash_savings_${user.id}`, JSON.stringify(updated));
                      await fetchData();
                      setSaveToGoalAmount("");
                      const newPct = Math.min(100, ((updated[selectedGoalIndex].saved || 0) / target) * 100);
                      if (newPct >= 100) {
                        toast.success(`🎉 Goal "${goal.name}" reached!`);
                        recordSavingsActivity('goal_complete', goal.name, amt);
                      } else {
                        toast.success(`$${amt.toFixed(2)} saved to "${goal.name}"`);
                        recordSavingsActivity('save', goal.name, amt);
                      }
                    } catch (err) {
                      toast.error("Failed to save: " + (err.response?.data?.message || err.message));
                    } finally {
                      setIsSavingToGoal(false);
                    }
                  }}
                  className="flex-1 bg-amber-500 text-white font-bold py-4 rounded-full shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSavingToGoal ? "..." : "Save"}
                </button>
              </div>

              {/* Withdraw All & Delete Goal */}
              <div className="flex space-x-3 pt-1">
                {saved > 0 && (
                  <button
                    disabled={isSavingToGoal}
                    onClick={async () => {
                      const cents = Math.round(saved * 100);
                      setIsSavingToGoal(true);
                      try {
                        await api.post("/wallet/credit", { amount: cents, description: `Withdraw all from: ${goal.name}` });
                        const updated = [...savingsGoals];
                        updated[selectedGoalIndex] = { ...updated[selectedGoalIndex], saved: 0 };
                        setSavingsGoals(updated);
                        localStorage.setItem(`flowcash_savings_${user.id}`, JSON.stringify(updated));
                        await fetchData();
                        toast.success(`$${saved.toFixed(2)} withdrawn to balance`);
                        recordSavingsActivity('withdraw_all', goal.name, saved);
                      } catch (err) {
                        toast.error("Withdraw failed: " + (err.response?.data?.message || err.message));
                      } finally {
                        setIsSavingToGoal(false);
                      }
                    }}
                    className="flex-1 text-amber-600 font-bold text-sm py-3 rounded-full border border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50"
                  >
                    Withdraw All
                  </button>
                )}
                <button
                  disabled={isSavingToGoal}
                  onClick={() => {
                    if (saved > 0 && !confirm(`This goal has $${saved.toFixed(2)} saved. Withdraw to balance and delete?`)) return;
                    (async () => {
                      setIsSavingToGoal(true);
                      try {
                        if (saved > 0) {
                          const cents = Math.round(saved * 100);
                          await api.post("/wallet/credit", { amount: cents, description: `Deleted goal: ${goal.name}` });
                          await fetchData();
                        }
                        const updated = savingsGoals.filter((_, i) => i !== selectedGoalIndex);
                        setSavingsGoals(updated);
                        localStorage.setItem(`flowcash_savings_${user.id}`, JSON.stringify(updated));
                        setIsSaveToGoalOpen(false);
                        setSelectedGoalIndex(null);
                        toast.success(`Goal "${goal.name}" deleted`);
                        recordSavingsActivity('goal_deleted', goal.name, saved);
                      } catch (err) {
                        toast.error("Failed: " + (err.response?.data?.message || err.message));
                      } finally {
                        setIsSavingToGoal(false);
                      }
                    })();
                  }}
                  className="flex-1 text-red-500 font-bold text-sm py-3 rounded-full border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all disabled:opacity-50"
                >
                  Delete Goal
                </button>
              </div>
            </div>
          );
        })()}
      </Modal>

      <PinModal
        isOpen={isPinOpen}
        onSuccess={onPinSuccess}
        onClose={() => {
          setIsPinOpen(false);
          pendingAction.current = null;
        }}
        userId={user.id}
      />

      <Navbar />
    </div>
  );
}
