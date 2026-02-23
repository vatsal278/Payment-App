"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceChart from "@/components/PriceChart";
import { CRYPTOS } from "@/lib/assets";
import { ArrowLeft, Loader2 } from "lucide-react";
import api from "@/lib/api";

export default function CryptoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [cryptoData, setCryptoData] = useState([]);
  const [positions, setPositions] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchCryptos = async () => {
      setDataLoading(true);
      try {
        // Fetch positions and cash balance concurrently
        const [posRes, cashRes] = await Promise.all([
          api.get("/trading/positions?asset_class=crypto"),
          api.get("/wallet/balance"),
        ]);
        const posData = posRes.data.data || [];

        // Map positions by symbol
        const posMap = {};
        posData.forEach((p) => {
          posMap[p.symbol] = p;
        });
        setPositions(posMap);

        // Fetch latest bars (fallback for crypto summary quotes)
        const fetchPromises = CRYPTOS.map(async (crypto) => {
          try {
            const res = await api.get(
              `/trading/crypto/bars/${crypto.symbol}?timeframe=1Day&limit=2`,
            );
            const bars = res.data.data.bars || [];
            const pos = posMap[crypto.symbol];

            let currentPrice = 0;
            let prevPrice = 0;
            let openPrice = 0;

            if (bars.length > 0) {
              currentPrice = parseFloat(bars[bars.length - 1].c);
              openPrice = parseFloat(bars[0].o);
            }

            const diff = currentPrice - openPrice;
            const pctChange = openPrice ? (diff / openPrice) * 100 : 0;

            return {
              ...crypto,
              price: currentPrice,
              change: pctChange,
              isUp: pctChange >= 0,
              qty: pos ? pos.qty : 0,
              market_value: pos ? pos.market_value : 0,
              chartData: [openPrice, currentPrice],
            };
          } catch (err) {
            return {
              ...crypto,
              price: 0,
              change: 0,
              isUp: true,
              qty: 0,
              market_value: 0,
              chartData: [0, 0],
            };
          }
        });

        const merged = await Promise.all(fetchPromises);
        setCryptoData(merged);
      } catch (err) {
        console.error("Failed to fetch crypto data:", err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchCryptos();
  }, [user]);

  if (loading || !user) return null;

  // Calculate total crypto portfolio value from tracked cryptos
  const totalValue = cryptoData.reduce((sum, p) => sum + p.market_value, 0);

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
        <button
          onClick={() => router.push("/stocks")}
          className="flex-1 py-2.5 rounded-full font-bold text-sm transition-all text-gray-500 hover:text-gray-700"
        >
          Stocks
        </button>
        <button className="flex-1 py-2.5 rounded-full font-bold text-sm transition-all bg-white dark:bg-zinc-800 shadow-sm text-[#F7931A]">
          Crypto
        </button>
      </div>

      {/* Portfolio Value */}
      {(totalValue > 0 || dataLoading) && (
        <div className="px-6 py-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Crypto Value
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
      <div className="mx-6 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-5 border border-orange-100/50 dark:border-orange-800/20">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-xl">🚀</span>
          <p className="font-bold text-sm">Diversify with Crypto</p>
        </div>
        <p className="text-xs text-gray-500">
          Trade Bitcoin, Ethereum, and other cryptocurrencies seamlessly
          directly from your balance.
        </p>
      </div>

      {/* Coins */}
      <div className="px-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Available Assets
        </h3>

        {dataLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-gray-300" />
          </div>
        ) : (
          <div className="space-y-3">
            {cryptoData.map((crypto) => (
              <button
                key={crypto.symbol}
                onClick={() => router.push(`/crypto/detail?symbol=${crypto.alpacaSymbol}`)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700">
                    <img
                      src={crypto.logo}
                      alt={crypto.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <span
                      style={{ display: "none", backgroundColor: crypto.color }}
                      className="w-12 h-12 items-center justify-center text-xl text-white"
                    >
                      {crypto.icon}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">{crypto.name}</p>
                    <p className="text-xs text-gray-500 font-medium">
                      {crypto.alpacaSymbol}
                      {crypto.qty > 0 ? ` • ${crypto.qty.toFixed(6)}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-8">
                    <PriceChart
                      data={crypto.chartData}
                      color={crypto.isUp ? "#00D632" : "#EF4444"}
                      height={32}
                    />
                  </div>
                  <div className="text-right min-w-[70px]">
                    <p className="font-bold text-sm">
                      $
                      {crypto.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p
                      className={`text-xs font-bold ${crypto.isUp ? "text-cashapp" : "text-red-500"}`}
                    >
                      {crypto.isUp ? "+" : ""}
                      {crypto.change.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <Navbar />
    </div>
  );
}
