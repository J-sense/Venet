import { Link } from "react-router";


interface LearnMoreButtonProps {
  className?: string;
}

export function LearnMoreButton({ className = "" }: LearnMoreButtonProps) {
  return (
    <Link
      to="/programs/all-programs"
      className={`px-8 py-3.5 bg-white/5 text-white border border-white/20 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35)] [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] rounded-full transition-all duration-200 text-sm font-semibold flex items-center justify-center min-w-[160px] cursor-pointer select-none active:scale-[0.97] ${className}`}
    >
      Learn More
    </Link>
  );
}
