import React from 'react';

interface PageHeaderProps {
  badge: string;
  title: React.ReactNode;
  description: React.ReactNode;
}

export default function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="bg-[#0F1C1E] min-h-[40vh] lg:min-h-[45vh] flex flex-col justify-center pt-32 pb-16 lg:pt-40 lg:pb-20 relative overflow-hidden">
      {/* Decorative background glow to match the screenshot vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[#20A6A8]/5 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up">
          <div className="w-12 h-px bg-[#20A6A8]/40"></div>
          <span className="text-[#20A6A8] text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase">
            {badge}
          </span>
          <div className="w-12 h-px bg-[#20A6A8]/40"></div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.15] tracking-[-0.02em] text-white mb-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
          {title}
        </h1>

        {/* Description */}
        <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-normal leading-[1.65] text-slate-400 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
