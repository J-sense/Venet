interface LegalHeaderProps {
  title: string;
  date?: string;
  bgColor?: string;
}

export default function LegalHeader({ title, date, bgColor = "#760000" }: LegalHeaderProps) {
  return (
    <div 
      className="min-h-[250px] md:min-h-[363px] relative overflow-hidden text-white rounded-b-[40px] md:rounded-b-[70px] flex items-center justify-center"
      style={{ backgroundColor: bgColor }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff25_1px,transparent_1px)] [background-size:50px_50px]" />
      </div>

      {/* Left SVG */}
      <div className="absolute left-0 top-[55%] -translate-y-1/2 opacity-60 z-0 pointer-events-none">
        <img src="/disSvg.svg" alt="" className="w-auto h-[150px] md:w-[990px] md:h-[300px] object-cover" />
      </div>

      {/* Right SVG */}
      <div className="absolute right-0 top-1/2 md:top-60 -translate-y-1/2 opacity-60 z-0 pointer-events-none">
        <img src="/disRighSvg.svg" alt="" className="w-auto h-[150px] md:w-[990px] md:h-[300px] object-cover" />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center w-full">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 md:mb-4 tracking-tighter drop-shadow-md">
          {title}
        </h1>

        {date && (
          <p className="text-white/80 text-sm md:text-lg font-medium">
            Last updated: {date}
          </p>
        )}
      </div>
    </div>
  );
}
