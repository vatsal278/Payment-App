import { useState } from "react";

export default function StockLogo({ assetInfo, symbol, size = "w-12 h-12", textClass = "" }) {
    const [error, setError] = useState(false);
    const symbolStr = symbol.split("/")[0];

    return (
        <div
            className={`${size} rounded-full flex items-center justify-center text-xl overflow-hidden shadow-sm bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800`}
        >
            {assetInfo?.logo && !error ? (
                <img
                    src={assetInfo.logo}
                    alt={symbolStr}
                    className="w-full h-full object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                <span className={textClass}>
                    {assetInfo?.icon || symbolStr.charAt(0)}
                </span>
            )}
        </div>
    );
}
