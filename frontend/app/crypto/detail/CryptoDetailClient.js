"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import PriceChart from "@/components/PriceChart";
import { CRYPTOS, getBarParams } from "@/lib/assets";
import { ArrowLeft, X, CheckCircle2, Loader2 } from "lucide-react";
import PinModal from "@/components/PinModal";
import Keypad from "@/components/Keypad";
import { useToast } from "@/components/Toast";
import api from "@/lib/api";
import { playKaChing } from "@/lib/sound";

const TIME_RANGES = ["1D", "1W", "1M", "1Y", "ALL"];
const PRESET_AMOUNTS = [1, 10, 20, 50, 100];

// Fallback formatter for large numbers
function formatLarge(num) {
  if (!num) return "N/A";
  if (num >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  return num.toLocaleString();
}

export default function CryptoDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const symbolParam = searchParams.get("symbol") || "BTCUSD";
  const toast = useToast();

  const decodedSymbol = decodeURIComponent(symbolParam);
  const cryptoInfo =
    CRYPTOS.find((c) => c.alpacaSymbol === decodedSymbol || c.symbol === decodedSymbol) || CRYPTOS[0];

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

  // Send Bitcoin State
  const [showSend, setShowSend] = useState(false);
  const [sendStep, setSendStep] = useState(1); // 1=cashtag, 2=amount, 3=confirm
  const [sendCashtag, setSendCashtag] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendProcessing, setSendProcessing] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendPinOpen, setSendPinOpen] = useState(false);
  const isBitcoin = cryptoInfo.alpacaSymbol === "BTCUSD";

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

  // CoinGecko Info State
  const [coinInfo, setCoinInfo] = useState({
    marketCap: 0,
    circulatingSupply: 0,
    maxSupply: 0,
    desc: "",
  });
  const [coinLoading, setCoinLoading] = useState(true);

  const cryptoHolding = position.qty;
  const cryptoValue = position.market_value;

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const fetchData = useCallback(async () => {
    try {
      // 1. Quote
      const quoteRes = await api.get(
        `/trading/crypto/quote/${cryptoInfo.symbol}`,
      );
      const q = quoteRes.data.data;
      let currentPrice = q.price;
      let openPrice = q.open || q.prevClose;

      if (!currentPrice) currentPrice = 1;
      if (!openPrice) openPrice = 1;

      const diff = currentPrice - openPrice;
      const pctChange = openPrice ? (diff / openPrice) * 100 : 0;

      setPriceData({
        price: currentPrice,
        change: pctChange,
        isUp: pctChange >= 0,
      });

      // 2. Position
      const posRes = await api.get(
        `/trading/positions/${cryptoInfo.alpacaSymbol}`,
      );
      if (posRes.data.success && posRes.data.data) {
        setPosition(posRes.data.data);
      } else {
        setPosition({ qty: 0, market_value: 0 });
      }

      // 3. Cash Balance
      const balRes = await api.get("/wallet/balance");
      if (balRes.data.success) {
        setCashBalance(balRes.data.data.balance / 100);
      }
    } catch (err) {
      console.error(
        `Failed to fetch ${cryptoInfo.symbol} data:`,
        err.response?.data || err.message,
      );
    }
  }, [cryptoInfo]);

  const fetchChart = useCallback(async () => {
    try {
      const { timeframe, start, limit } = getBarParams(timeRange);
      const res = await api.get(
        `/trading/crypto/bars/${cryptoInfo.symbol}`,
        {
          params: { timeframe, start, limit },
        },
      );
      const bars = res.data.data.bars || [];
      const formatted = bars.map((b) => parseFloat(b.c));

      if (formatted.length > 0) setChartData(formatted);
    } catch (err) {
      console.error(
        `Failed to fetch ${cryptoInfo.symbol} chart:`,
        err.response?.data || err.message,
      );
    }
  }, [timeRange, cryptoInfo]);

  const fetchCoinGecko = useCallback(async () => {
    if (!cryptoInfo.coingeckoId) {
      setCoinLoading(false);
      return;
    }
    setCoinLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoInfo.coingeckoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
      );
      const data = await res.json();
      setCoinInfo({
        marketCap: data.market_data?.market_cap?.usd || 0,
        circulatingSupply: data.market_data?.circulating_supply || 0,
        maxSupply:
          data.market_data?.max_supply || data.market_data?.total_supply || 0,
        desc: data.description?.en
          ? data.description.en.split(". ")[0] + "."
          : `${cryptoInfo.name} is a decentralized cryptocurrency.`,
      });
    } catch (err) {
      console.error("CoinGecko fetch failed:", err);
      setCoinInfo({
        marketCap: 0,
        circulatingSupply: 0,
        maxSupply: 0,
        desc: `${cryptoInfo.name} is a cryptocurrency.`,
      });
    }
    setCoinLoading(false);
  }, [cryptoInfo]);

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    Promise.all([fetchData(), fetchChart()]).finally(() =>
      setDataLoading(false),
    );
  }, [user, timeRange, fetchData, fetchChart]);

  useEffect(() => {
    fetchCoinGecko();
  }, [fetchCoinGecko]);

  const [orderStatusMsg, setOrderStatusMsg] = useState("Filled");

  const handleConfirm = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;

    setIsProcessing(true);
    try {
      const res = await api.post("/trading/order", {
        symbol: cryptoInfo.symbol,
        notional: amt,
        side: orderType,
      });
      const orderStatus = res.data.data?.status;

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
  const cryptoQty = priceData.price ? amt / priceData.price : 0;

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
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              style={{
                backgroundColor: cryptoInfo.color,
                shadowColor: cryptoInfo.color + "40",
              }}
            >
              {cryptoInfo.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{cryptoInfo.name}</h1>
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
              <div className="h-6 w-20 bg-gray-200 dark:bg-zinc-700 animate-pulse rounded" />
            ) : (
              <p className="text-lg font-bold">
                $
                {priceData.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 5,
                })}
              </p>
            )}
          </div>
        </div>

        {/* Holdings */}
        {cryptoHolding > 0 && !dataLoading && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Your {cryptoInfo.name}
            </p>
            <p className="text-xl font-bold mt-1">
              {cryptoHolding.toFixed(8)}{" "}
              {cryptoInfo.alpacaSymbol.split("/")[0]}
            </p>
            <p className="text-sm text-gray-500">≈ ${cryptoValue.toFixed(2)}</p>
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
          <PriceChart data={chartData} color={cryptoInfo.color} height={220} />
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

      {/* About Crypto */}
      <div className="px-6 mb-32">
        <h2 className="text-xl font-bold mb-4">About {cryptoInfo.name}</h2>
        {coinLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-zinc-800/50">
                <span className="text-gray-500 font-medium tracking-tight">
                  Market Cap
                </span>
                <span className="font-bold">
                  ${formatLarge(coinInfo.marketCap)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-zinc-800/50">
                <span className="text-gray-500 font-medium tracking-tight">
                  Circulating Supply
                </span>
                <span className="font-bold">
                  {formatLarge(coinInfo.circulatingSupply)}{" "}
                  {cryptoInfo.alpacaSymbol.split("/")[0]}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-500 font-medium tracking-tight">
                  Max Supply
                </span>
                <span className="font-bold">
                  {formatLarge(coinInfo.maxSupply) === "0"
                    ? "Unlimited"
                    : formatLarge(coinInfo.maxSupply)}{" "}
                  {formatLarge(coinInfo.maxSupply) === "0"
                    ? ""
                    : cryptoInfo.alpacaSymbol.split("/")[0]}
                </span>
              </div>
            </div>
            {/* Strip HTML if returned by CoinGecko */}
            <p
              className="text-sm text-gray-400 mt-4 leading-relaxed font-medium"
              dangerouslySetInnerHTML={{ __html: coinInfo.desc }}
            />
          </>
        )}
      </div>

      {/* Buy / Sell / Send Buttons */}
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
            disabled={cryptoHolding <= 0}
            className="flex-1 bg-gray-100 dark:bg-zinc-800 disabled:opacity-50 font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Sell
          </button>
          {isBitcoin && (
            <button
              onClick={() => {
                setShowSend(true);
                setSendStep(1);
                setSendCashtag("");
                setSendAmount("");
                setSendError("");
                setSendSuccess(false);
              }}
              className="flex-1 bg-[#F7931A] text-white font-bold py-4 rounded-full text-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              Send
            </button>
          )}
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
              {orderType === "buy" ? "Buy" : "Sell"} {cryptoInfo.name}
            </h2>
            <div className="flex justify-center mb-2">
              <span className="text-gray-500 font-medium text-sm">
                $
                {orderType === "buy"
                  ? cashBalance.toLocaleString()
                  : cryptoValue.toLocaleString(undefined, {
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
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {PRESET_AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(String(a))}
                      className={`py-4 rounded-2xl font-bold text-lg transition-all border ${amount === String(a) ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800" : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"}`}
                    >
                      ${a}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setShowKeypad(true);
                      setAmount("");
                    }}
                    className={`py-4 rounded-2xl font-bold text-lg transition-all border ${amount && !PRESET_AMOUNTS.includes(Number(amount)) ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800" : "border-gray-200 dark:border-zinc-700 hover:border-gray-400"}`}
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
                  {cashBalance.toLocaleString()})
                </p>
              )}
            {orderType === "sell" &&
              (!amount || parseFloat(amount) > cryptoValue) &&
              amount !== "" && (
                <p className="text-red-500 text-sm text-center mt-4 mb-2 font-medium">
                  Amount exceeds your {cryptoInfo.name} balance ($
                  {cryptoValue.toFixed(2)})
                </p>
              )}
            <button
              onClick={goToConfirm}
              disabled={
                !amount ||
                parseFloat(amount) <= 0 ||
                (orderType === "sell" && parseFloat(amount) > cryptoValue) ||
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
                {amt.toFixed(2)} of {cryptoInfo.name}
              </p>
              <button
                onClick={() => router.push("/crypto")}
                className="mt-8 text-black dark:text-white font-bold underline"
              >
                Back to Crypto
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between px-8 pb-8">
              <div>
                <h2 className="text-3xl font-bold mb-10">
                  {orderType === "buy" ? "Buy" : "Sell"} ${amt.toFixed(2)} of{" "}
                  {cryptoInfo.name}
                </h2>
                <div className="space-y-4">
                  {[
                    { label: "Funding Source", value: "FlowCash" },
                    { label: "Order Type", value: "Market" },
                    {
                      label: "Approx Price",
                      value: `$${priceData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}`,
                    },
                    {
                      label: "Approx Amount",
                      value: `${cryptoQty.toFixed(8)} ${cryptoInfo.alpacaSymbol.split("/")[0]}`,
                    },
                    {
                      label: "Symbol",
                      value: cryptoInfo.alpacaSymbol.split("/")[0],
                    },
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

      {/* Send Bitcoin Modal */}
      {showSend && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
          onClick={() => setShowSend(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-full" />
            </div>

            {sendSuccess ? (
              <div className="flex flex-col items-center py-12">
                <div className="w-20 h-20 bg-[#F7931A]/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 text-[#F7931A]" />
                </div>
                <h2 className="text-xl font-bold mb-2">Bitcoin Sent! 🎉</h2>
                <p className="text-gray-500 text-center mb-2">
                  ${parseFloat(sendAmount).toFixed(2)} in BTC sent to{" "}
                  <span className="text-[#F7931A] font-bold">
                    {sendCashtag}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mb-8">
                  ≈ {(parseFloat(sendAmount) / priceData.price).toFixed(8)} BTC
                </p>
                <button
                  onClick={() => {
                    setShowSend(false);
                    fetchData();
                  }}
                  className="w-full bg-[#F7931A] text-white font-bold py-4 rounded-full"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-center mb-1">
                  Send Bitcoin
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                  {sendStep === 1
                    ? "Who are you sending to?"
                    : sendStep === 2
                      ? "How much?"
                      : "Confirm details"}
                </p>

                {sendError && (
                  <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm font-medium mb-4 text-center">
                    {sendError}
                  </div>
                )}

                {/* Step 1: Enter $Cashtag */}
                {sendStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4">
                      <span className="text-[#F7931A] font-bold text-lg">
                        $
                      </span>
                      <input
                        type="text"
                        autoFocus
                        placeholder="Enter $Cashtag"
                        className="bg-transparent text-lg font-bold outline-none w-full"
                        value={sendCashtag}
                        onChange={(e) => {
                          setSendCashtag(e.target.value);
                          setSendError("");
                        }}
                      />
                    </div>
                    <button
                      disabled={!sendCashtag.trim()}
                      onClick={() => {
                        setSendError("");
                        setSendStep(2);
                      }}
                      className="w-full bg-[#F7931A] text-white font-bold py-4 rounded-full disabled:opacity-30 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Step 2: Enter Amount */}
                {sendStep === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4">
                      <span className="text-[#F7931A] font-bold text-2xl">
                        $
                      </span>
                      <input
                        type="number"
                        autoFocus
                        placeholder="0.00"
                        className="bg-transparent text-2xl font-bold outline-none w-full"
                        value={sendAmount}
                        onChange={(e) => {
                          setSendAmount(e.target.value);
                          setSendError("");
                        }}
                      />
                    </div>
                    {sendAmount && parseFloat(sendAmount) > 0 && (
                      <p className="text-center text-sm text-gray-500">
                        ≈{" "}
                        <span className="font-bold text-[#F7931A]">
                          {(parseFloat(sendAmount) / priceData.price).toFixed(
                            8,
                          )}{" "}
                          BTC
                        </span>{" "}
                        at ${priceData.price.toLocaleString()}/BTC
                      </p>
                    )}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSendStep(1)}
                        className="flex-1 bg-gray-100 dark:bg-zinc-800 font-bold py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={!sendAmount || parseFloat(sendAmount) <= 0}
                        onClick={() => {
                          setSendError("");
                          setSendStep(3);
                        }}
                        className="flex-1 bg-[#F7931A] text-white font-bold py-4 rounded-full disabled:opacity-30 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {sendStep === 3 && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-zinc-800 rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">To</span>
                        <span className="font-bold text-[#F7931A]">
                          ${sendCashtag}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount (USD)</span>
                        <span className="font-bold">
                          ${parseFloat(sendAmount).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount (BTC)</span>
                        <span className="font-bold">
                          {(parseFloat(sendAmount) / priceData.price).toFixed(
                            8,
                          )}{" "}
                          BTC
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 dark:border-zinc-700 pt-3">
                        <span className="text-gray-500">BTC Price</span>
                        <span className="font-bold">
                          ${priceData.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fee</span>
                        <span className="font-bold text-cashapp">$0.00</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSendStep(2)}
                        className="flex-1 bg-gray-100 dark:bg-zinc-800 font-bold py-4 rounded-full hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={sendProcessing}
                        onClick={() => setSendPinOpen(true)}
                        className="flex-1 bg-[#F7931A] text-white font-bold py-4 rounded-full disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        {sendProcessing ? (
                          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                          "Send Bitcoin"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Send Bitcoin PIN */}
      <PinModal
        isOpen={sendPinOpen}
        onSuccess={async () => {
          setSendPinOpen(false);
          setSendProcessing(true);
          setSendError("");
          try {
            const cashtag = sendCashtag.startsWith("$")
              ? sendCashtag
              : `$${sendCashtag}`;
            await api.post("/transfer/send-bitcoin", {
              cashtag,
              usdAmount: parseFloat(sendAmount),
            });
            playKaChing();
            setSendSuccess(true);
          } catch (err) {
            setSendError(
              err.response?.data?.message || err.message || "Send failed",
            );
          } finally {
            setSendProcessing(false);
          }
        }}
        onClose={() => setSendPinOpen(false)}
        userId={user?.id}
      />

      {/* Buy/Sell PIN */}
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
