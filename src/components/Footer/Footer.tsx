import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1e2335] text-slate-400 text-sm border-t border-[#30364F]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <BrandLogo variant="dark" size="sm" showBadge={false} />
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline text-xs font-medium">Browser-Based Professional Tools</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-[#30364F]/50 px-3 py-1.5 rounded-[4px] border border-[#30364F]">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Client-Side Private • No User Account Required</span>
          </div>

          <div className="text-slate-400 text-xs font-mono">
            © {new Date().getFullYear()} Invoiceo.online. All rights reserved.
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 font-medium">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Local Data Storage Policy</span>
          <span>•</span>
          <span>Open Standards Compliant</span>
        </div>
      </div>
    </footer>
  );
};
