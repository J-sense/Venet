import type { ReactNode } from "react";


type BadgeProps = {
    children: ReactNode;
    icon?: ReactNode;
    showDot?: boolean;
    className?: string;
};

export default function HeadingBadge({
    children,
    icon,
    showDot = true,
    className = "",
}: BadgeProps) {
    return (
        <div
            className={`px-4 py-1.5 rounded-full inline-flex justify-center items-center gap-2 select-none
        bg-gradient-to-b from-blue-500/30 to-blue-700/20 backdrop-blur-sm
        border border-blue-400/40
        shadow-[inset_0_1px_0_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.35)]
        ${className}`}
        >
            {icon ? (
                <span className="flex items-center justify-center text-blue-300">
                    {icon}
                </span>
            ) : (
                showDot && (
                    <span className="relative flex w-2 h-2">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400 opacity-60 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-blue-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]" />
                    </span>
                )
            )}

            <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
                {children}
            </span>
        </div>
    );
}