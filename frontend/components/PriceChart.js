"use client";

// Generates fake price history data for charts
export function generatePriceHistory(basePrice, volatility, points) {
    const data = [];
    let price = basePrice;
    for (let i = 0; i < points; i++) {
        const change = (Math.random() - 0.48) * volatility * basePrice;
        price = Math.max(price + change, basePrice * 0.5);
        data.push(price);
    }
    return data;
}

// Simple SVG line chart component
export default function PriceChart({ data, color = "#00D632", height = 200 }) {
    if (!data || data.length < 2) return null;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    const padding = 4;
    const w = 100;
    const h = 100;

    const points = data.map((val, i) => {
        const x = padding + (i / (data.length - 1)) * (w - padding * 2);
        const y = padding + (1 - (val - min) / range) * (h - padding * 2);
        return `${x},${y}`;
    }).join(" ");

    const isDown = data[data.length - 1] < data[0];
    const lineColor = isDown ? "#EF4444" : color;

    // Gradient fill
    const firstPoint = points.split(" ")[0];
    const lastPoint = points.split(" ").pop();
    const fillPoints = `${padding},${h} ${points} ${w - padding},${h}`;

    return (
        <svg viewBox={`0 0 ${w} ${h}`} style={{ height, width: "100%" }} preserveAspectRatio="none">
            <defs>
                <linearGradient id={`grad-${lineColor.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={lineColor} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon
                points={fillPoints}
                fill={`url(#grad-${lineColor.replace('#', '')})`}
            />
            <polyline
                points={points}
                fill="none"
                stroke={lineColor}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
