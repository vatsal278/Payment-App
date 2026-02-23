"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceChart from "@/components/PriceChart";
import { STOCKS } from "@/lib/assets";
import { ArrowLeft, TrendingUp, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function StocksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [stocksData, setStocksData] = useState([]);
  const [positions, setPositions] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchStocks = async () => {
      try {
        // 1. Fetch live quotes for all stocks
        const symbols = STOCKS.map((s) => s.symbol).join(",");
        const quotesRes = await api.get(`/trading/quotes?symbols=${symbols}`);
        const quotes = quotesRes.data.data;

        // 2. Fetch positions
        const posRes = await api.get(
          "/trading/positions?asset_class=us_equity",
        );
        const posData = posRes.data.data || [];

        // Map positions by symbol
        const posMap = {};
        posData.forEach((p) => {
          posMap[p.symbol] = p;
        });
        setPositions(posMap);

        // 3. Merge static STOCKS with live quote data
        const merged = STOCKS.map((stock) => {
          const q = quotes[stock.symbol] || {};
          let currentPrice = q.price || 0;
          let openPrice = q.open || q.prevClose || currentPrice;

          const diff = currentPrice - openPrice;
          const pctChange = openPrice ? (diff / openPrice) * 100 : 0;

          // Simple 2-point chart to show daily direction without 6 extra API calls
          const miniChart = [openPrice, currentPrice];

          return {
            ...stock,
            price: currentPrice,
            change: pctChange,
            isUp: pctChange >= 0,
            chartData: miniChart,
          };
        });

        setStocksData(merged);
      } catch (err) {
        console.error("Failed to fetch stocks data:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchStocks();
  }, [user]);

  if (loading || !user) return null;

  // Calculate total portfolio value from positions
  const totalValue = Object.values(positions).reduce(
    (sum, p) => sum + p.market_value,
    0,
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Header */}
      <div className="flex items-center space-x-4 p-6 pb-2">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Invest</h1>
      </div>

      {/* Stocks / Crypto Toggle */}
      <div className="mx-6 mt-4 mb-4 bg-gray-100 dark:bg-zinc-900 p-1 rounded-full flex overflow-hidden">
        <button className="flex-1 py-2.5 rounded-full font-bold text-sm transition-all bg-white dark:bg-zinc-800 shadow-sm text-purple-600">
          Stocks
        </button>
        <button
          onClick={() => router.push("/crypto")}
          className="flex-1 py-2.5 rounded-full font-bold text-sm transition-all text-gray-500 hover:text-gray-700"
        >
          Crypto
        </button>
      </div>

      {/* Portfolio Value */}
      {(totalValue > 0 || dataLoading) && (
        <div className="px-6 py-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Portfolio Value
          </p>
          {dataLoading ? (
            <div className="h-8 w-32 bg-gray-200 dark:bg-zinc-800 animate-pulse rounded mt-1" />
          ) : (
            <p className="text-3xl font-bold mt-1">
              $
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          )}
        </div>
      )}

      {/* Promo Banner */}
      <div className="mx-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-5 border border-blue-100/50 dark:border-blue-800/20">
        <div className="flex items-center space-x-3 mb-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <p className="font-bold text-sm">Start investing with just $1</p>
        </div>
        <p className="text-xs text-gray-500">
          Buy stocks in your favorite companies to give your money a chance to
          grow.
        </p>
      </div>

      {/* Most Traded */}
      <div className="px-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Most Traded Stocks
        </h3>

        {dataLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
          </div>
        ) : (
          <div className="space-y-3">
            {stocksData.map((stock) => {
              const pos = positions[stock.symbol];
              const qty = pos?.qty || 0;

              return (
                <button
                  key={stock.symbol}
                  onClick={() => router.push(`/stocks/detail?symbol=${stock.symbol}`)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl overflow-hidden bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700">
                      <img
                        src={stock.logo}
                        alt={stock.name}
                        className="w-full h-full object-contain p-1.5"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <span
                        style={{ display: "none" }}
                        className="w-12 h-12 items-center justify-center text-xl"
                      >
                        {stock.icon}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-sm">{stock.name}</p>
                      <p className="text-xs text-gray-500">
                        {stock.symbol}
                        {qty > 0 ? ` • ${qty.toFixed(4)} shares` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Mini chart (2 points showing day direction) */}
                    <div className="w-16 h-8">
                      <PriceChart
                        data={stock.chartData}
                        color={stock.isUp ? "#00D632" : "#EF4444"}
                        height={32}
                      />
                    </div>
                    <div className="text-right min-w-[70px]">
                      <p className="font-bold text-sm">
                        $
                        {stock.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p
                        className={`text-xs font-bold ${stock.isUp ? "text-cashapp" : "text-red-500"}`}
                      >
                        {stock.isUp ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
}
