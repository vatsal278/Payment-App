"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceChart from "@/components/PriceChart";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { TrendingUp } from "lucide-react";
import api from "@/lib/api";
import { STOCKS, CRYPTOS } from "@/lib/assets";
import StockLogo from "@/components/StockLogo";

const TIME_RANGES = ["1D", "1W", "1M", "1Y", "ALL"];

export default function InvestingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState("stocks"); // 'stocks' | 'crypto'
  const [timeRange, setTimeRange] = useState("1D");

  // Stocks State
  const [stocksEquity, setStocksEquity] = useState(0);
  const [stocksInvested, setStocksInvested] = useState(0);
  const [stocksChart, setStocksChart] = useState([]);
  const [stocksActivity, setStocksActivity] = useState([]);
  const [stocksLoading, setStocksLoading] = useState(true);

  // Crypto State
  const [cryptoEquity, setCryptoEquity] = useState(0);
  const [cryptoInvested, setCryptoInvested] = useState(0);
  const [cryptoChart, setCryptoChart] = useState([]);
  const [cryptoActivity, setCryptoActivity] = useState([]);
  const [cryptoLoading, setCryptoLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const fetchStocksData = useCallback(async () => {
    setStocksLoading(true);
    try {
      const [posRes, histRes, ordersRes] = await Promise.all([
        api.get("/trading/positions"),
        api.get(
          `/trading/portfolio/history?period=${getPeriod(timeRange)}&timeframe=${getTimeframe(timeRange)}`,
        ),
        api.get("/trading/orders?limit=30&status=all"),
      ]);

      // Fix: User's invested balance is ONLY the value of their held STOCKS, not the giant $50k master cash pool.
      const positions = posRes.data.data || [];
      const userStockEquity = positions
        .filter(
          (p) => !p.symbol.includes("/") && p.asset_class !== "crypto",
        )
        .reduce((sum, p) => sum + p.market_value, 0);

      const userStockInvested = positions
        .filter(
          (p) => !p.symbol.includes("/") && p.asset_class !== "crypto",
        )
        .reduce((sum, p) => sum + parseFloat(p.cost_basis || 0), 0);

      setStocksEquity(userStockEquity);
      setStocksInvested(userStockInvested);

      const bars = histRes.data.data.equity || [];
      // Remove nulls which indicate non-trading hours
      const validBars = bars.filter((b) => b !== null);
      setStocksChart(validBars);

      const orders = ordersRes.data.data || [];
      setStocksActivity(
        orders.filter(
          (o) => !o.symbol.includes("/") && o.asset_class !== "crypto",
        ),
      );
    } catch (err) {
      console.error("Failed to fetch stocks investing data", err);
    } finally {
      setStocksLoading(false);
    }
  }, [timeRange]);

  const fetchCryptoData = useCallback(async () => {
    setCryptoLoading(true);
    try {
      const [posRes, chartRes, ordersRes, transfersRes] = await Promise.all([
        api.get(`/trading/positions`),
        api.get(`/trading/crypto/bars/BTC/USD`, {
          params: getBtcBarParams(timeRange),
        }),
        api.get("/trading/orders?limit=30&status=all"),
        api.get("/transfer/history?limit=30"),
      ]);

      const positions = posRes.data.data || [];
      const userCryptoEquity = positions
        .filter((p) => p.asset_class === "crypto" || p.symbol.includes("/"))
        .reduce((sum, p) => sum + p.market_value, 0);

      const userCryptoInvested = positions
        .filter((p) => p.asset_class === "crypto" || p.symbol.includes("/"))
        .reduce((sum, p) => sum + parseFloat(p.cost_basis || 0), 0);

      setCryptoEquity(userCryptoEquity);
      setCryptoInvested(userCryptoInvested);

      const bars = chartRes.data.data.bars || [];
      setCryptoChart(bars.map((b) => parseFloat(b.c)));

      const orders = ordersRes.data.data || [];
      const cryptoOrders = orders.filter(
        (o) => o.symbol?.includes("/") || o.asset_class === "crypto",
      );

      // Blend in P2P Bitcoin transfers
      const transfers = transfersRes.data?.data?.transactions || [];
      const btcTransfers = transfers.filter((t) => t.type === "bitcoin_send").map(t => ({
        ...t,
        symbol: "BTC", // Ensure the UI knows it's Bitcoin
      }));

      // Sort combined activity by date descending
      const combinedActivity = [...cryptoOrders, ...btcTransfers].sort(
        (a, b) => new Date(b.created_at || b.submitted_at || b.filled_at) - new Date(a.created_at || a.submitted_at || a.filled_at)
      );

      setCryptoActivity(combinedActivity);
    } catch (err) {
      console.error("Failed to fetch crypto data", err);
    } finally {
      setCryptoLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    if (user) {
      if (tab === "stocks") fetchStocksData();
      else fetchCryptoData();
    }
  }, [user, tab, timeRange, fetchStocksData, fetchCryptoData]);

  if (loading || !user) return null;

  // Helpers
  function getPeriod(tr) {
    if (tr === "1D") return "1D";
    if (tr === "1W") return "1W";
    if (tr === "1M") return "1M";
    if (tr === "1Y") return "1A";
    return "all";
  }

  function getTimeframe(tr) {
    if (tr === "1D") return "5Min";
    if (tr === "1W") return "15Min";
    if (tr === "1M") return "1H";
    if (tr === "1Y") return "1D";
    return "1D";
  }

  function getBtcBarParams(tr) {
    const now = new Date();
    let start, timeframe, limit;
    switch (tr) {
      case "1D":
        start = new Date(now);
        start.setDate(now.getDate() - 1);
        timeframe = "15Min";
        limit = 96;
        break;
      case "1W":
        start = new Date(now);
        start.setDate(now.getDate() - 7);
        timeframe = "1Hour";
        limit = 168;
        break;
      case "1M":
        start = new Date(now);
        start.setMonth(now.getMonth() - 1);
        timeframe = "1Day";
        limit = 30;
        break;
      case "1Y":
        start = new Date(now);
        start.setFullYear(now.getFullYear() - 1);
        timeframe = "1Day";
        limit = 365;
        break;
      case "ALL":
        start = new Date(now);
        start.setFullYear(now.getFullYear() - 5);
        timeframe = "1Week";
        limit = 260;
        break;
      default:
        start = new Date(now);
        start.setDate(now.getDate() - 1);
        timeframe = "15Min";
        limit = 96;
    }
    return { timeframe, start: start.toISOString(), limit };
  }

  // Render configuration
  const isStocks = tab === "stocks";
  const primaryColor = isStocks ? "#00d632" : "#F7931A"; // Green for stocks, Orange for Crypto
  const textColorClass = isStocks ? "text-cashapp" : "text-[#F7931A]";

  const balance = isStocks ? stocksEquity : cryptoEquity;
  const invested = isStocks ? stocksInvested : cryptoInvested;
  const totalGain = balance - invested;
  const gainPrefix = totalGain >= 0 ? "+" : "";

  const chartData = isStocks ? stocksChart : cryptoChart;
  const activityData = isStocks ? stocksActivity : cryptoActivity;
  const isLoading = isStocks ? stocksLoading : cryptoLoading;

  // Calculate chart delta safely
  let pctChange = 0;
  let diff = 0;
  if (chartData.length > 0) {
    const first = chartData[0];
    const last = chartData[chartData.length - 1];
    if (first > 0) {
      diff = last - first;
      pctChange = (diff / first) * 100;
    }
  }
  // We visually enforce the chart direction on the summary line for realism
  const isUp = pctChange >= 0;

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-2">
        <h1 className="text-2xl font-bold">Investing</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/search")}
            className="p-2 -mr-2 text-gray-800 dark:text-gray-200"
          >
            <Search className="w-6 h-6" style={{ color: primaryColor }} />
          </button>
          <button
            className="w-8 h-8 bg-cashapp/10 rounded-full flex items-center justify-center border border-transparent font-bold text-xs"
            style={{ color: primaryColor }}
          >
            {(user.fullName || user.full_name || "?").charAt(0).toUpperCase()}
          </button>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="mx-6 mt-4 mb-8 bg-gray-50 dark:bg-zinc-900 p-1 rounded-full flex overflow-hidden">
        <button
          onClick={() => setTab("stocks")}
          className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all ${isStocks
            ? "bg-white dark:bg-zinc-800 shadow-sm text-cashapp"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Stocks
        </button>
        <button
          onClick={() => setTab("crypto")}
          className={`flex-1 py-2.5 rounded-full font-bold text-sm transition-all ${!isStocks
            ? "bg-white dark:bg-zinc-800 shadow-sm text-[#F7931A]"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Crypto
        </button>
      </div>

      {/* Balance area */}
      <div className="px-6 text-center mt-6">
        <h2 className="text-5xl font-bold tracking-tight mb-2">
          $
          {balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h2>
        <div
          className="flex items-center justify-center space-x-1 font-bold text-sm"
          style={{ color: primaryColor }}
        >
          <span>
            {isUp ? "+" : "-"} ${Math.abs(diff).toFixed(2)}
          </span>
          <span className="mx-1">
            {isUp ? "↑" : "↓"} {Math.abs(pctChange).toFixed(2)}%
          </span>
          <span>Today</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="mt-8 px-2 relative h-[250px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
          </div>
        ) : chartData.length > 0 ? (
          <PriceChart data={chartData} color={primaryColor} height={250} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
            No data available
          </div>
        )}
      </div>

      {/* Time Ranges */}
      <div className="flex justify-center space-x-2 px-6 mt-4 mb-8">
        {TIME_RANGES.map((t) => (
          <button
            key={t}
            onClick={() => setTimeRange(t)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${timeRange === t
              ? "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* My Investments Card */}
      <div className="mx-6 mb-8 bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/60 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            My Investments
          </h3>
          <div className="w-8 h-8 rounded-full bg-white dark:bg-black/50 flex items-center justify-center shadow-sm">
            <span className="text-gray-400">•••</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div>
            {isLoading ? (
              <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mb-2" />
            ) : (
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                $
                {invested.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
            <p className="text-sm font-semibold text-gray-500">
              Total Invested
            </p>
          </div>

          <div>
            {isLoading ? (
              <div className="h-6 w-24 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mb-2" />
            ) : (
              <p
                className={`text-xl font-bold ${totalGain > 0 ? "text-cashapp" : totalGain < 0 ? "text-red-500" : "text-gray-500"}`}
              >
                {gainPrefix}$
                {Math.abs(totalGain).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            )}
            <p className="text-sm font-semibold text-gray-500">Total Gain</p>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {isStocks ? (
          <button
            onClick={() => router.push("/stocks")}
            className="w-full bg-gray-50 dark:bg-zinc-900 rounded-2xl p-5 flex items-center justify-between group hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all font-bold"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">📈</span>
              <span>Discover Stocks</span>
            </div>
            <span className="text-gray-400 group-hover:text-cashapp transition-colors">
              Buy
            </span>
          </button>
        ) : (
          <button
            onClick={() => router.push("/crypto")}
            className="w-full bg-gray-50 dark:bg-zinc-900 rounded-2xl p-5 flex items-center justify-between group hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all font-bold"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl text-[#F7931A]">₿</span>
              <span>Explore Crypto</span>
            </div>
            <span className="text-gray-400 group-hover:text-[#F7931A] transition-colors">
              Buy / Sell
            </span>
          </button>
        )}
      </div>

      {/* Activity Section */}
      {activityData.length > 0 && (
        <div className="px-6 mt-8 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              Activity
            </h3>
            <button
              onClick={() => router.push("/activity?filter=investing")}
              className="px-4 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all"
            >
              See All
            </button>
          </div>
          <div className="space-y-4">
            {activityData.slice(0, 5).map((order) => {
              const amount =
                parseFloat(order.filled_avg_price || 0) *
                parseFloat(order.filled_qty || 0) ||
                parseFloat(order.notional) ||
                parseFloat(order.amount) / 100 ||
                0;
              const isP2P = order.type === "bitcoin_send";
              const isReceived = isP2P && order.receiver_id === user.id;
              const isBuy = !isP2P && order.side === "buy";
              const isCrypto =
                isP2P || order.asset_class === "crypto" || order.symbol?.includes("/");
              const symbolStr = isP2P
                ? "BTC"
                : isCrypto
                  ? order.symbol.split("/")[0]
                  : order.symbol;
              const date = new Date(
                order.filled_at || order.submitted_at || order.created_at,
              ).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });

              const assetInfo = isCrypto
                ? CRYPTOS.find(c => c.symbol.startsWith(symbolStr) || c.alpacaSymbol === order.symbol)
                : STOCKS.find(s => s.symbol === order.symbol);

              let actionText = isBuy ? "Bought" : "Sold";
              if (isP2P) actionText = isReceived ? "Received" : "Sent";

              const isPositiveCashFlow = isP2P ? isReceived : !isBuy;

              let qtyText = "";
              if (!isP2P && Number(order.filled_qty) > 0) {
                qtyText = Number(order.filled_qty).toLocaleString(undefined, {
                  maximumFractionDigits: isCrypto ? 6 : 4,
                }) + " ";
              }

              let displayAmount = `${actionText} ${qtyText}${symbolStr}`;
              if (isP2P) {
                displayAmount = `${actionText} Bitcoin`;
                // If the default note format is used (e.g. "0.00500000 BTC ($..."), extract it
                if (order.note && order.note.match(/^[\d.]+ BTC/)) {
                  displayAmount = `${actionText} ${order.note.split(' ')[0]} ${symbolStr}`;
                }
              }

              return (
                <button
                  key={order.id}
                  onClick={() => router.push(`/activity/detail?id=${order.id}`)}
                  className="w-full flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-zinc-900 p-2 -mx-2 rounded-xl transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <StockLogo
                      assetInfo={assetInfo}
                      symbol={symbolStr}
                      textClass={isBuy || isReceived ? "text-cashapp" : "text-red-500"}
                    />
                    <div className="text-left">
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {displayAmount}
                      </p>
                      <p className="text-xs text-gray-500 font-medium capitalize">
                        {order.status} • {date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                      $
                      {amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      className={`text-xs font-bold ${isPositiveCashFlow ? "text-cashapp" : "text-gray-400"}`}
                    >
                      {isPositiveCashFlow ? "+" : "-"}$
                      {amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stocks Discovery Sections */}
      {isStocks && (
        <div className="px-6 space-y-6 mt-2 mb-8">
          {/* Most Traded Monthly */}
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/60 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Most Traded Monthly
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed hidden sm:block">
              These stocks were bought and sold more over the last 30 days than
              any other stocks available on Cash App.
            </p>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed sm:hidden">
              These stocks were bought and sold more over the last 30 days than
              any other stocks available.
            </p>

            <div className="space-y-4">
              {[
                "V",
                "NVDA",
                "NFLX"
              ].map((sym) => {
                const stock = STOCKS.find(s => s.symbol === sym);
                if (!stock) return null;
                return (
                  <div
                    key={stock.symbol}
                    className="flex justify-between items-center cursor-pointer group hover:bg-white dark:hover:bg-zinc-800 p-2 -mx-2 rounded-xl transition-all"
                    onClick={() => router.push(`/stocks/detail?symbol=${stock.symbol}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <StockLogo
                        assetInfo={stock}
                        symbol={stock.symbol}
                        size="w-10 h-10"
                        textClass="text-cashapp"
                      />
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {stock.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-cashapp">
                        ↑ {(Math.random() * 2).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-6 space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></div>
            </div>
          </div>

          {/* Biggest Daily Movers */}
          <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800/60 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
              Biggest Daily Movers
            </h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              These companies gained or lost the most value today of any stock
              on Cash App.
            </p>

            <div className="space-y-4">
              {[
                "TSLA",
                "AAPL",
                "META"
              ].map((sym) => {
                const stock = STOCKS.find(s => s.symbol === sym);
                if (!stock) return null;
                const isUp = Math.random() > 0.5;
                return (
                  <div
                    key={stock.symbol}
                    className="flex justify-between items-center cursor-pointer group hover:bg-white dark:hover:bg-zinc-800 p-2 -mx-2 rounded-xl transition-all"
                    onClick={() => router.push(`/stocks/detail?symbol=${stock.symbol}`)}
                  >
                    <div className="flex items-center space-x-4">
                      <StockLogo
                        assetInfo={stock}
                        symbol={stock.symbol}
                        size="w-10 h-10"
                        textClass={isUp ? "text-cashapp" : "text-red-500"}
                      />
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {stock.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-bold ${isUp ? "text-cashapp" : "text-red-500"}`}>
                        {isUp ? "↑" : "↓"} {(Math.random() * 5).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-6 space-x-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
}
