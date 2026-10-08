import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showBadge = false,
}) => {
  const isDark = variant === 'dark';

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const domainSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
  };

  return (
    <div className="inline-flex items-baseline select-none group font-sans tracking-tight">
      {/* Bold "Invoiceo" in primary brand color #30364F */}
      <span
        className={`font-black tracking-tight transition-colors ${textSizes[size]} ${
          isDark ? 'text-[#8594c7]' : 'text-[#30364F]'
        }`}
      >
        Invoiceo
      </span>

      {/* Light ".online" in primary brand color #30364F */}
      <span
        className={`font-light tracking-normal transition-colors ml-0.5 ${domainSizes[size]} ${
          isDark ? 'text-[#a2aed4]' : 'text-[#30364F]'
        }`}
      >
        .online
      </span>

      {showBadge && (
        <span
          className={`ml-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] self-center ${
            isDark
              ? 'bg-white/10 text-white'
              : 'bg-[#30364F]/10 text-[#30364F]'
          }`}
        >
          FREE
        </span>
      )}
    </div>
  );
};
