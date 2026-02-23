"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import PriceChart from "@/components/PriceChart";
import { STOCKS, getBarParams, getCompanyInfo } from "@/lib/assets";
import { ArrowLeft, X, CheckCircle2, Loader2 } from "lucide-react";
import PinModal from "@/components/PinModal";
import Keypad from "@/components/Keypad";
import { useToast } from "@/components/Toast";
import api from "@/lib/api";
import { playKaChing } from "@/lib/sound";

const TIME_RANGES = ["1D", "1W", "1M", "1Y", "ALL"];
const PRESET_AMOUNTS = [1, 10, 20, 50, 100];

export default function StockDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const symbol = searchParams.get("symbol")?.toUpperCase();

  const stock = STOCKS.find((s) => s.symbol === symbol);

  const [timeRange, setTimeRange] = useState("1D");
  const [showBuy, setShowBuy] = useState(false);
  const [showSell, setShowSell] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderType, setOrderType] = useState("buy");
  const [isPinOpen, setIsPinOpen] = useState(false);

  // Live Data State
  const [priceData, setPriceData] = useState({
    price: 0,
    change: 0,
    isUp: true,
  });
  const [chartData, setChartData] = useState([]);
  const [position, setPosition] = useState({ qty: 0, market_value: 0 });
  const [cashBalance, setCashBalance] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  const shareQty = position.qty;
  const shareValue = position.market_value;

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Fetch live quote & position
  const fetchData = useCallback(async () => {
    if (!symbol) return;
    try {
      // 1. Quote
      const quoteRes = await api.get(`/trading/quote/${symbol}`);
      const q = quoteRes.data.data;
      const currentPrice = q.price;
      const openPrice = q.open || q.prevClose || currentPrice;

      const diff = currentPrice - openPrice;
      const pctChange = openPrice ? (diff / openPrice) * 100 : 0;

      setPriceData({
        price: currentPrice,
        change: pctChange,
        isUp: pctChange >= 0,
      });

      // 2. Position
      const posRes = await api.get(
        `/trading/positions/${stock.alpacaSymbol || symbol}`,
      );
      if (posRes.data.success && posRes.data.data) {
        setPosition(posRes.data.data);
      }

      // 3. Cash Balance
      const balRes = await api.get("/wallet/balance");
      if (balRes.data.success) {
        setCashBalance(balRes.data.data.balance / 100);
      }
    } catch (err) {
      console.error(
        "Failed to fetch stock data:",
        err.response?.data || err.message,
      );
    }
  }, [symbol, stock]);

  // Fetch historical chart bars
  const fetchChart = useCallback(async () => {
    if (!symbol) return;
    try {
      const { timeframe, start, limit } = getBarParams(timeRange);
      const res = await api.get(`/trading/bars/${symbol}`, {
        params: { timeframe, start, limit },
      });
      const bars = res.data.data.bars || [];

      const formatted = bars.map((b) => parseFloat(b.c));

      if (formatted.length > 0) {
        setChartData(formatted);
      }
    } catch (err) {
      console.error(
        "Failed to fetch stock chart:",
        err.response?.data || err.message,
      );
    }
  }, [symbol, timeRange]);

  useEffect(() => {
    if (!user || !stock) return;
    setDataLoading(true);
    Promise.all([fetchData(), fetchChart()]).finally(() =>
      setDataLoading(false),
    );
  }, [user, stock, timeRange, fetchData, fetchChart]);

  if (!stock) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <p className="text-gray-500">Stock not found</p>
      </div>
    );
  }

  const [orderStatusMsg, setOrderStatusMsg] = useState("Filled");

  const handleConfirm = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;

    setIsProcessing(true);
    try {
      const res = await api.post("/trading/order", {
        symbol,
        notional: amt,
        side: orderType,
      });
      const orderStatus = res.data.data?.status;

      // Refresh position
      await fetchData();

      setIsProcessing(false);
      setOrderStatusMsg(
        orderStatus === "accepted" || orderStatus === "new"
          ? "Queued (Market Closed)"
          : "Filled",
      );
      playKaChing();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowConfirm(false);
        setShowBuy(false);
        setShowSell(false);
        setAmount("");
      }, 1800);
    } catch (err) {
      setIsProcessing(false);
      toast.error("Order failed: " + (err.response?.data?.message || err.message));
      setShowConfirm(false);
    }
  };

  const openBuy = () => {
    setOrderType("buy");
    setAmount("");
    setShowBuy(true);
    setShowKeypad(false);
  };
  const openSell = () => {
    setOrderType("sell");
    setAmount("");
    setShowSell(true);
    setShowKeypad(false);
  };
  const goToConfirm = () => {
    const amt = parseFloat(amount);
    if (amt && amt > 0) {
      setShowBuy(false);
      setShowSell(false);
      setShowConfirm(true);
    }
  };

  if (loading || !user) return null;

  const amt = parseFloat(amount) || 0;
  const estQty = priceData.price ? amt / priceData.price : 0;
  const companyInfo = getCompanyInfo(stock.symbol, stock.name);

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="w-10" />
      </div>

      {/* Asset Info */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: stock.color + "20" }}
            >
              {stock.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{stock.name}</h1>
              {dataLoading ? (
                <div className="h-4 w-16 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mt-1" />
              ) : (
                <p
                  className={`text-sm font-bold ${priceData.isUp ? "text-cashapp" : "text-red-500"}`}
                >
                  {priceData.isUp ? "↑" : "↓"}{" "}
                  {Math.abs(priceData.change).toFixed(2)}%
                </p>
              )}
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-full">
            {dataLoading ? (
              <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-700 animate-pulse rounded" />
            ) : (
              <p className="text-lg font-bold">
                $
                {priceData.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
          </div>
        </div>

        {/* Holdings */}
        {shareQty > 0 && !dataLoading && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Your Position
            </p>
            <p className="text-xl font-bold mt-1">
              {shareQty.toFixed(4)} Shares
            </p>
            <p className="text-sm text-gray-500">
              ≈ $
              {shareValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="px-2 mt-6 relative">
        {dataLoading && chartData.length === 0 ? (
          <div className="h-[220px] flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
          </div>
        ) : (
          <PriceChart data={chartData} color={stock.color} height={220} />
        )}
      </div>

      {/* Time Range Tabs */}
      <div className="flex justify-center space-x-2 px-6 mt-4 mb-8">
        {TIME_RANGES.map((t) => (
          <button
            key={t}
            onClick={() => setTimeRange(t)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${timeRange === t
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* About Company */}
      <div className="px-6 mb-8 mt-6">
        <h3 className="text-xl font-bold mb-4">About</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {companyInfo.about}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
              CEO
            </p>
            <p className="font-bold text-sm">{companyInfo.ceo}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
              Employees
            </p>
            <p className="font-bold text-sm">{companyInfo.employees}</p>
          </div>
          <div className="col-span-2 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
              Headquarters
            </p>
            <p className="font-bold text-sm">{companyInfo.hq}</p>
          </div>
        </div>
      </div>

      {/* Buy / Sell Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-gray-100 dark:border-zinc-800">
        <div className="flex space-x-3">
          <button
            onClick={openBuy}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Buy
          </button>
          <button
            onClick={openSell}
            disabled={shareQty <= 0}
            className="flex-1 bg-gray-100 dark:bg-zinc-800 font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Buy/Sell Sheet */}
      {(showBuy || showSell) && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => {
            setShowBuy(false);
            setShowSell(false);
          }}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full" />
            </div>

            <h2 className="text-xl font-bold text-center mb-1">
              {orderType === "buy" ? "Buy" : "Sell"} {stock.name}
            </h2>
            <div className="flex justify-center mb-2">
              <span className="text-gray-500 font-medium text-sm">
                $
                {orderType === "buy"
                  ? cashBalance.toLocaleString()
                  : shareValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                Available
              </span>
            </div>
            <div className="flex justify-center mb-6 mt-4">
              <span className="px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm font-medium">
                One-Time Purchase ▾
              </span>
            </div>

            {showKeypad ? (
              <div className="animate-in fade-in duration-200">
                <div className="text-center text-4xl font-bold mb-6 mt-4">
                  ${amount || "0"}
                </div>
                <Keypad amount={amount} setAmount={setAmount} />
                <button
                  onClick={() => setShowKeypad(false)}
                  className="w-full mt-6 py-4 text-gray-500 font-bold hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-full transition-all"
                >
                  Cancel Custom Amount
                </button>
              </div>
            ) : (
              <>
                {/* Preset Amounts */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className={`py-4 rounded-2xl font-bold text-lg transition-all border ${amount === String(a)
                        ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800"
                        : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"
                        }`}
                    >
                      ${a}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowKeypad(true);
                      setAmount("");
                    }}
                    className={`py-4 rounded-2xl font-bold text-lg transition-all border ${amount && !PRESET_AMOUNTS.includes(Number(amount))
                      ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800"
                      : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"
                      }`}
                  >
                    {amount && !PRESET_AMOUNTS.includes(Number(amount))
                      ? `$${amount}`
                      : "..."}
                  </button>
                </div>
              </>
            )}

            {orderType === "buy" &&
              (!amount || parseFloat(amount) > cashBalance) &&
              amount !== "" && (
                <p className="text-red-500 text-sm text-center mt-4 mb-2 font-medium">
                  Amount exceeds your cash balance ($
                  {cashBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  )
                </p>
              )}
            {orderType === "sell" &&
              (!amount || parseFloat(amount) > shareValue) &&
              amount !== "" && (
                <p className="text-red-500 text-sm text-center mt-4 mb-2 font-medium">
                  Amount exceeds your stock balance ($
                  {shareValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  )
                </p>
              )}

            <button
              onClick={goToConfirm}
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                (orderType === "sell" && parseFloat(amount) > shareValue) ||
                (orderType === "buy" && parseFloat(amount) > cashBalance)
              }
              className={`w-full mt-4 bg-cashapp text-white font-bold py-4 rounded-full text-lg shadow-lg disabled:opacity-30 disabled:shadow-none hover:scale-[1.02] active:scale-95 transition-all ${showKeypad ? "" : ""}`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Confirm Sheet */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-black">
          <div className="flex justify-end p-6">
            <button
              onClick={() => {
                setShowConfirm(false);
                setAmount("");
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {success ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <CheckCircle2 className="w-20 h-20 text-cashapp mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold">Order Placed!</h2>
              <p className="text-gray-500 mt-2 font-medium">
                {orderStatusMsg} • {orderType === "buy" ? "Bought" : "Sold"} $
                {amt.toFixed(2)} of {stock.name}
              </p>
              <button
                onClick={() => router.push("/stocks")}
                className="mt-8 text-black dark:text-white font-bold underline"
              >
                Back to Stocks
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between px-8 pb-8">
              <div>
                <h2 className="text-3xl font-bold mb-10">
                  {orderType === "buy" ? "Buy" : "Sell"} ${amt.toFixed(2)} of{" "}
                  {stock.name}
                </h2>

                <div className="space-y-4">
                  {[
                    { label: "Funding Source", value: "FlowCash" },
                    { label: "Order Type", value: "Market" },
                    {
                      label: "Approx Price",
                      value: `$${priceData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    },
                    { label: "Approx Shares", value: `${estQty.toFixed(4)}` },
                    { label: "Symbol", value: stock.symbol },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="font-bold">{row.value}</span>
                    </div>
                  ))}

                  <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount</span>
                      <span className="font-bold">${amt.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fees</span>
                      <span className="font-bold">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-bold">
                        Total Cost
                      </span>
                      <span className="font-bold text-lg">
                        ${amt.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsPinOpen(true)}
                disabled={isProcessing}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-5 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          )}
        </div>
      )}

      <PinModal
        isOpen={isPinOpen}
        onSuccess={() => {
          setIsPinOpen(false);
          handleConfirm();
        }}
        onClose={() => setIsPinOpen(false)}
        userId={user?.id}
      />
    </div>
  );
}
