import { MoreVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function GraphEarnignList() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(500);

    useEffect(() => {
        if (!containerRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                setWidth(entries[0].contentRect.width || 500);
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Visual percentages representing the exact graph curve structure
    const yPercentages = [0.7, 0.65, 0.63, 0.8, 0.45, 0.75, 0.72, 0.4, 0.42, 0.35, 0.33, 0.35, 0.2, 0.12];

    const paddingLeft = 24;
    const paddingRight = 24;
    const chartWidth = width - paddingLeft - paddingRight;

    const points = yPercentages.map((pct, idx) => {
        const x = paddingLeft + (idx / (yPercentages.length - 1)) * chartWidth;
        const y = 35 + pct * 90; // Height of chart canvas is 90, top offset 35
        return { x, y };
    });

    // Custom Cubic Bezier Curve Path Builder
    const getCurvePath = (pointsArray: { x: number; y: number }[]) => {
        if (pointsArray.length === 0) return "";
        let path = `M ${pointsArray[0].x} ${pointsArray[0].y}`;
        for (let i = 0; i < pointsArray.length - 1; i++) {
            const p0 = pointsArray[i];
            const p1 = pointsArray[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 3;
            const cp1y = p0.y;
            const cp2x = p1.x - (p1.x - p0.x) / 3;
            const cp2y = p1.y;
            path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
        }
        return path;
    };

    const curvePath = getCurvePath(points);

    const earnings = [
        { name: "Sarah J.", date: "Jun 8", duration: "45 min", amount: 90 },
        { name: "Michael R.", date: "Jun 7", duration: "60 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
        { name: "Emily K.", date: "Jun 6", duration: "30 min", amount: 90 },
    ];

    return (
        <div className="space-y-6 w-full md:px-8 px-3">
            {/* ── TOTAL INCOME GRAPH CARD ── */}
            <div className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/25 w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white text-base md:text-lg font-bold font-sora tracking-tight">
                        Total Income
                    </h3>
                    <div className="flex items-center gap-3">
                        <span className="text-[#62748E] text-xs font-semibold uppercase tracking-wider font-inter">
                            March 2025
                        </span>
                        <button className="text-[#62748E] hover:text-white transition-colors p-1">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                </div>

                {/* Chart Canvas Area */}
                <div ref={containerRef} className="w-full relative select-none h-[160px] overflow-hidden">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${width} 160`}
                        className="absolute inset-0 w-full h-full overflow-visible"
                    >
                        {/* Ambient Shadow Filter for Line Glow */}
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="940%" height="300%">
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2B7FFF" floodOpacity="0.45" />
                            </filter>
                        </defs>

                        {/* Left Vertical Axis Line */}
                        <line
                            x1={paddingLeft}
                            y1="25"
                            x2={paddingLeft}
                            y2="135"
                            stroke="#ffffff12"
                            strokeWidth="1"
                        />

                        {/* Bottom Horizontal Axis Line */}
                        <line
                            x1={paddingLeft}
                            y1="135"
                            x2={width - paddingRight}
                            y2="135"
                            stroke="#ffffff12"
                            strokeWidth="1"
                        />

                        {/* Smooth Glowing Bezier Curve */}
                        <path
                            d={curvePath}
                            fill="none"
                            stroke="#2B7FFF"
                            strokeWidth="2.5"
                            filter="url(#glow)"
                            strokeLinecap="round"
                        />

                        {/* Node Dots */}
                        {points.map((p, idx) => {
                            const isActive = idx === 4; // 5th point is the highlighted peak
                            return (
                                <g key={idx}>
                                    {isActive && (
                                        <circle
                                            cx={p.x}
                                            cy={p.y}
                                            r="7"
                                            fill="#2B7FFF"
                                            fillOpacity="0.25"
                                            className="animate-ping"
                                        />
                                    )}
                                    <circle
                                        cx={p.x}
                                        cy={p.y}
                                        r={isActive ? "4" : "3"}
                                        fill="#fff"
                                        stroke="#2B7FFF"
                                        strokeWidth={isActive ? "2.5" : "1.5"}
                                        className="transition-all duration-300 hover:scale-125 cursor-pointer"
                                    />
                                </g>
                            );
                        })}

                        {/* Floating Tooltip Card */}
                        {points.length > 4 && (
                            <g className="transition-all duration-300">
                                <rect
                                    x={points[4].x - 45}
                                    y={points[4].y - 38}
                                    width="90"
                                    height="26"
                                    rx="6"
                                    fill="#090F1C"
                                    stroke="#2B7FFF"
                                    strokeWidth="1"
                                />
                                <text
                                    x={points[4].x}
                                    y={points[4].y - 21}
                                    fill="#fff"
                                    fontSize="11"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                    className="font-inter"
                                >
                                    $5640.22
                                </text>
                            </g>
                        )}
                    </svg>
                </div>
            </div>

            {/* ── ALL EARNINGS TRANSACTION CARD ── */}
            <div className="bg-[#0D1526] border border-[#FFFFFF0F] rounded-2xl p-5 md:p-6 shadow-lg shadow-black/25">
                <div className="mb-4">
                    <h3 className="text-white text-base md:text-lg font-bold font-sora tracking-tight">
                        All Earnings
                    </h3>
                </div>

                {/* List of items */}
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {earnings.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center bg-[#070D19]/60 border border-[#ffffff05] hover:border-[#2B7FFF]/20 p-4 rounded-xl transition-all duration-200"
                        >
                            <div>
                                <p className="font-bold text-white text-sm tracking-tight font-sora">
                                    {item.name}
                                </p>
                                <p className="text-xs text-[#90A1B9]/70 mt-0.5 font-inter">
                                    {item.date} &bull; {item.duration}
                                </p>
                            </div>
                            <div className="font-bold text-sm text-[#10B981] font-inter">
                                ${item.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
