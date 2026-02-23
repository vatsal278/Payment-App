"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import StockLogo from "@/components/StockLogo";
import { useToast } from "@/components/Toast";
import api from "@/lib/api";
import {
  ArrowLeft,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Check,
  X,
  Building2,
} from "lucide-react";

import { STOCKS, CRYPTOS } from "@/lib/assets";

export default function ActivityPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activity, setActivity] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const toast = useToast();

  // Read filter from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get("filter");
    if (
      urlFilter &&
      ["all", "sent", "received", "requests", "investing", "bitcoin", "savings"].includes(
        urlFilter,
      )
    ) {
      setFilter(urlFilter);
    }
  }, []);

  // Pull-to-refresh
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    if (user) fetchActivity();
  }, [user, filter]);

  const fetchActivity = async () => {
    setIsRefreshing(true);
    try {
      const filterParam = filter !== "all" ? `&type=${filter}` : "";
      const [transRes, fundingRes, tradeRes] = await Promise.all([
        filter !== "investing"
          ? api.get(`/transfer/history?limit=50${filterParam}`)
          : Promise.resolve({ data: { data: { transactions: [] } } }),
        filter === "all" || filter === "funding"
          ? api.get("/funding/history?limit=20")
          : Promise.resolve({ data: { data: { movements: [] } } }),
        filter === "all" || filter === "investing"
          ? api.get("/trading/orders?limit=30")
          : Promise.resolve({ data: { data: [] } }),
      ]);

      const transfers = (transRes.data.data?.transactions || []).map((t) => {
        const isSender = t.sender_id === user.id;
        let displayType, otherParty, otherCashtag;

        if (t.type === "request") {
          const isRequester = t.receiver_id === user.id;
          displayType = isRequester ? "Requested from" : "Request from";
          otherParty = isRequester ? t.sender_name : t.receiver_name;
          otherCashtag = isRequester ? t.sender_cashtag : t.receiver_cashtag;
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
        };
      });

      const funding = (fundingRes.data.data?.movements || []).map((f) => ({
        ...f,
        displayType:
          f.direction === "cash_in" ? "Added from Bank" : "Withdrawal",
        otherParty: f.nickname || f.brand || "Bank Account",
        isCashIn: true,
        type: f.direction === "cash_in" ? "receive" : "send",
      }));

      const trades = (tradeRes.data.data || []).map((o) => {
        const isCrypto = o.asset_class === "crypto" || o.symbol.includes("/");
        const qtyStr =
          Number(o.filled_qty) > 0
            ? Number(o.filled_qty).toLocaleString(undefined, {
              maximumFractionDigits: isCrypto ? 6 : 4,
            }) + " "
            : "";
        const symbolStr = isCrypto ? o.symbol.split("/")[0] : o.symbol;

        return {
          id: o.id,
          displayType: o.side === "buy" ? `Bought ${qtyStr}` : `Sold ${qtyStr}`,
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

      const combined = [...transfers, ...funding, ...trades].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

      // Load savings activities from localStorage
      let savingsItems = [];
      try {
        const savingsRaw = localStorage.getItem(`flowcash_savings_activity_${user.id}`);
        if (savingsRaw) {
          savingsItems = JSON.parse(savingsRaw).map((s) => {
            const isDeposit = s.type === 'save' || s.type === 'goal_complete';
            let displayType;
            switch (s.type) {
              case 'save': displayType = 'Saved to'; break;
              case 'goal_complete': displayType = '🎉 Goal Reached:'; break;
              case 'withdraw': displayType = 'Withdrew from'; break;
              case 'withdraw_all': displayType = 'Withdrew all from'; break;
              case 'goal_deleted': displayType = 'Deleted goal:'; break;
              default: displayType = 'Savings';
            }
            return {
              ...s,
              displayType,
              otherParty: s.goalName,
              isCashIn: isDeposit,
              isSavings: true,
              type: 'savings',
              amount: Math.round((s.amount || 0) * 100),
              status: 'completed',
            };
          });
        }
      } catch { }

      // Filter savings based on active filter
      if (filter === "savings") {
        setActivity(savingsItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } else if (filter === "all") {
        setActivity([...combined, ...savingsItems].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        ));
      } else {
        setActivity(combined);
      }
    } catch (err) {
      console.error("Failed to fetch activity");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRespondToRequest = async (transactionId, action) => {
    try {
      await api.post(`/transfer/respond/${transactionId}`, { action });
      await fetchActivity();
    } catch (err) {
      toast.error(
        `Failed to ${action} request: ` +
        (err.response?.data?.message || err.message),
      );
    }
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
    if (diff > 0 && window.scrollY === 0)
      setPullDistance(Math.min(diff * 0.4, 80));
  };
  const onTouchEnd = () => {
    if (pullDistance > 50) fetchActivity();
    setPullDistance(0);
    isPulling.current = false;
  };

  if (loading || !user) return null;

  const filters = [
    { key: "all", label: "All" },
    { key: "investing", label: "Investing" },
    { key: "bitcoin", label: "Bitcoin" },
    { key: "savings", label: "Savings" },
    { key: "sent", label: "Sent" },
    { key: "received", label: "Received" },
    { key: "requests", label: "Requests" },
  ];

  return (
    <div
      className="pb-24 pt-8 px-6 min-h-screen flex flex-col bg-white dark:bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-200"
        style={{
          height:
            pullDistance > 0
              ? `${pullDistance}px`
              : isRefreshing
                ? "40px"
                : "0px",
        }}
      >
        <RefreshCw
          className={`w-5 h-5 text-cashapp ${isRefreshing ? "animate-spin" : ""}`}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Activity</h1>
        </div>
        <button
          onClick={fetchActivity}
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          <RefreshCw
            className={`w-5 h-5 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === f.key
              ? "bg-cashapp text-white shadow-sm"
              : "bg-gray-100 dark:bg-zinc-900 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-0 flex-1">
        {activity.length > 0 ? (
          activity.map((item, idx) => {
            const isSender = item.sender_id === user.id;
            const isIncoming = item.isSavings
              ? !item.isCashIn  // savings withdraw = money back to you
              : (item.isCashIn || (!isSender && item.type === "send"));

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-900 px-1 -mx-1 rounded-xl transition-all ${idx < activity.length - 1 ? "border-b border-gray-100 dark:border-zinc-800/50" : ""
                  }`}
                onClick={() =>
                  !item.isCashIn && !item.isSavings && router.push(`/activity/detail?id=${item.id}`)
                }
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {/* Icon */}
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
                  ) : item.isSavings ? (
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-sm">
                      💰
                    </div>
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

                  {/* Text */}
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

                {/* Amount */}
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
          <div className="flex flex-col items-center justify-center pt-20 text-gray-500">
            <Clock className="w-12 h-12 mb-4 opacity-15" />
            <p className="font-medium text-sm">No activity yet</p>
          </div>
        )}
      </div>

      <Navbar />
    </div >
  );
}
