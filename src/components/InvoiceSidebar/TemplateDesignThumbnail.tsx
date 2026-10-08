import React from 'react';

interface TemplateDesignThumbnailProps {
  templateId: string;
  primaryColor?: string;
  isSelected?: boolean;
}

/**
 * Authentic visual layout design thumbnail for each of the 12 invoice templates.
 * Renders an exact schematic representation of each template's unique layout,
 * header style, columns, sidebar, banners, and typography hierarchy.
 * Reacts dynamically to the user's selected primary accent color.
 */
export const TemplateDesignThumbnail: React.FC<TemplateDesignThumbnailProps> = ({
  templateId,
  primaryColor = '#30364F',
  isSelected = false,
}) => {
  const accent = primaryColor || '#30364F';

  return (
    <div
      className={`w-full aspect-[210/260] bg-white rounded-[3px] border relative overflow-hidden transition-all shadow-xs select-none p-2 flex flex-col justify-between ${
        isSelected
          ? 'border-[#30364F] ring-2 ring-[#30364F]/50 shadow-sm'
          : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      {/* RENDER SCHEMATIC PER TEMPLATE ID */}
      {renderLayoutSchematic(templateId, accent)}
    </div>
  );
};

function renderLayoutSchematic(templateId: string, accent: string) {
  switch (templateId) {
    case 'template-01': // Classic Standard
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          {/* Header */}
          <div>
            <div className="flex justify-between items-start mb-1.5 pb-1 border-b border-slate-300">
              <div>
                <div className="w-12 h-2 rounded-[1px] bg-slate-800 mb-0.5" />
                <div className="w-16 h-1 rounded-[1px] bg-slate-300" />
                <div className="w-10 h-1 rounded-[1px] bg-slate-200 mt-0.5" />
              </div>
              <div className="text-right">
                <span className="font-extrabold tracking-wider text-[7px]" style={{ color: accent }}>
                  INVOICE
                </span>
                <div className="w-8 h-1 rounded-[1px] bg-slate-400 ml-auto mt-0.5" />
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-1 mb-2">
              <div className="space-y-0.5">
                <div className="w-6 h-1 bg-slate-400 rounded-[1px]" />
                <div className="w-14 h-1 bg-slate-200 rounded-[1px]" />
              </div>
              <div className="space-y-0.5 text-right">
                <div className="w-8 h-1 bg-slate-300 rounded-[1px] ml-auto" />
                <div className="w-10 h-1 bg-slate-200 rounded-[1px] ml-auto" />
              </div>
            </div>

            {/* Table */}
            <div className="w-full border border-slate-200 rounded-[1px] overflow-hidden mb-1">
              <div className="bg-slate-100 flex px-1 py-0.5 font-bold text-slate-700">
                <div className="w-1/2">Item</div>
                <div className="w-1/4 text-center">Qty</div>
                <div className="w-1/4 text-right">Total</div>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="flex px-1 py-0.5 text-slate-400">
                  <div className="w-1/2 h-1 bg-slate-300 rounded-[1px]" />
                  <div className="w-1/4" />
                  <div className="w-1/4 h-1 bg-slate-300 rounded-[1px] ml-auto" />
                </div>
                <div className="flex px-1 py-0.5 text-slate-400">
                  <div className="w-1/2 h-1 bg-slate-200 rounded-[1px]" />
                  <div className="w-1/4" />
                  <div className="w-1/4 h-1 bg-slate-200 rounded-[1px] ml-auto" />
                </div>
                <div className="flex px-1 py-0.5 text-slate-400">
                  <div className="w-1/2 h-1 bg-slate-200 rounded-[1px]" />
                  <div className="w-1/4" />
                  <div className="w-1/4 h-1 bg-slate-200 rounded-[1px] ml-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Classic Bottom Summary */}
          <div className="flex justify-end pt-1">
            <div className="w-20 p-1 rounded-[1px] border border-slate-200 space-y-0.5">
              <div className="flex justify-between">
                <div className="w-6 h-1 bg-slate-300 rounded-[1px]" />
                <div className="w-4 h-1 bg-slate-300 rounded-[1px]" />
              </div>
              <div className="flex justify-between pt-0.5 border-t border-slate-200">
                <div className="w-8 h-1.5 font-bold rounded-[1px]" style={{ backgroundColor: accent }} />
                <div className="w-5 h-1.5 font-bold rounded-[1px]" style={{ backgroundColor: accent }} />
              </div>
            </div>
          </div>
        </div>
      );

    case 'template-02': // Minimalist Clean
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          <div>
            {/* Minimal Header */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="w-14 h-2 rounded-[1px] bg-slate-900 mb-0.5" />
                <div className="w-10 h-1 rounded-[1px] bg-slate-300" />
              </div>
              <div className="tracking-widest uppercase font-mono font-light text-[6px] text-slate-500">
                INVOICE
              </div>
            </div>

            <div className="w-full h-[0.5px] bg-slate-200 mb-2" />

            {/* Minimal Items - No Borders, generous whitespace */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between pb-0.5 border-b border-slate-100">
                <div className="w-16 h-1 bg-slate-700 rounded-[1px]" />
                <div className="w-6 h-1 bg-slate-700 rounded-[1px]" />
              </div>
              <div className="flex justify-between pb-0.5 border-b border-slate-100">
                <div className="w-12 h-1 bg-slate-400 rounded-[1px]" />
                <div className="w-5 h-1 bg-slate-400 rounded-[1px]" />
              </div>
              <div className="flex justify-between pb-0.5 border-b border-slate-100">
                <div className="w-14 h-1 bg-slate-400 rounded-[1px]" />
                <div className="w-5 h-1 bg-slate-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Minimal Total Row */}
          <div className="flex justify-between items-center pt-1 border-t border-slate-200">
            <span className="text-[6px] text-slate-400 uppercase font-mono">TOTAL DUE</span>
            <span className="font-extrabold text-[8px]" style={{ color: accent }}>
              $4,750
            </span>
          </div>
        </div>
      );

    case 'template-03': // Corporate Split
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          <div>
            {/* Split Top Header */}
            <div className="flex justify-between items-stretch mb-2 bg-slate-50 p-1 border-l-2" style={{ borderColor: accent }}>
              <div>
                <div className="w-14 h-2 rounded-[1px] bg-slate-900" />
                <div className="w-10 h-1 bg-slate-400 mt-0.5 rounded-[1px]" />
              </div>
              <div className="text-right">
                <span className="font-bold text-[7px]" style={{ color: accent }}>CORPORATE</span>
                <div className="w-8 h-1 bg-slate-400 ml-auto mt-0.5 rounded-[1px]" />
              </div>
            </div>

            {/* Client Card */}
            <div className="p-1 rounded-[2px] bg-slate-100/70 border border-slate-200 mb-2 space-y-0.5">
              <div className="w-8 h-1 bg-slate-500 rounded-[1px]" />
              <div className="w-16 h-1 bg-slate-300 rounded-[1px]" />
            </div>

            {/* Striped Table */}
            <div className="w-full border border-slate-200 rounded-[1px] overflow-hidden text-[5px]">
              <div className="bg-slate-200/80 flex px-1 py-0.5 font-bold text-slate-800">
                <div className="w-2/3">Service</div>
                <div className="w-1/3 text-right">Amount</div>
              </div>
              <div className="bg-white flex px-1 py-0.5">
                <div className="w-2/3 h-1 bg-slate-300 rounded-[1px]" />
                <div className="w-1/3 h-1 bg-slate-300 ml-auto rounded-[1px]" />
              </div>
              <div className="bg-slate-50 flex px-1 py-0.5">
                <div className="w-2/3 h-1 bg-slate-200 rounded-[1px]" />
                <div className="w-1/3 h-1 bg-slate-200 ml-auto rounded-[1px]" />
              </div>
            </div>
          </div>

          <div className="p-1 rounded-[1px] bg-slate-100 flex justify-between items-center">
            <span className="font-bold text-slate-600">Balance</span>
            <div className="w-8 h-1.5 rounded-[1px]" style={{ backgroundColor: accent }} />
          </div>
        </div>
      );

    case 'template-04': // Bold Modern (Full Top Colored Banner)
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px] -m-2 p-2">
          {/* Full-width Top Accent Banner */}
          <div>
            <div
              className="p-1.5 text-white flex justify-between items-center rounded-t-[2px] mb-1.5 shadow-2xs"
              style={{ backgroundColor: accent }}
            >
              <div>
                <span className="font-black text-[8px] tracking-wider block">INVOICE</span>
                <div className="w-10 h-1 bg-white/70 rounded-[1px]" />
              </div>
              <div className="w-8 h-3 bg-white/20 rounded-[1px]" />
            </div>

            {/* Recipient Row */}
            <div className="px-1 grid grid-cols-2 gap-1 mb-1.5">
              <div className="space-y-0.5">
                <div className="w-6 h-1 bg-slate-400 rounded-[1px]" />
                <div className="w-12 h-1 bg-slate-300 rounded-[1px]" />
              </div>
              <div className="space-y-0.5 text-right">
                <div className="w-8 h-1 bg-slate-300 ml-auto rounded-[1px]" />
                <div className="w-10 h-1 bg-slate-200 ml-auto rounded-[1px]" />
              </div>
            </div>

            {/* Table with Colored Header Accent */}
            <div className="px-1">
              <div className="h-1.5 rounded-[1px] mb-0.5" style={{ backgroundColor: accent, opacity: 0.85 }} />
              <div className="space-y-0.5">
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <div className="w-14 h-1 bg-slate-300 rounded-[1px]" />
                  <div className="w-6 h-1 bg-slate-300 rounded-[1px]" />
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <div className="w-10 h-1 bg-slate-200 rounded-[1px]" />
                  <div className="w-5 h-1 bg-slate-200 rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Bold Colored Total Block */}
          <div className="px-1 flex justify-end">
            <div
              className="w-16 p-1 rounded-[2px] text-white flex justify-between items-center shadow-xs"
              style={{ backgroundColor: accent }}
            >
              <span className="font-bold text-[6px]">TOTAL</span>
              <span className="font-black text-[7px]">$3,200</span>
            </div>
          </div>
        </div>
      );

    case 'template-05': // Executive Sidebar (Left Vertical Colored Column)
      return (
        <div className="w-full h-full flex -m-2 text-[6px]">
          {/* Left Vertical Colored Sidebar (35%) */}
          <div
            className="w-[36%] h-full p-1.5 text-white flex flex-col justify-between shrink-0"
            style={{ backgroundColor: accent }}
          >
            <div className="space-y-1">
              <div className="w-6 h-2 bg-white/40 rounded-[1px] mb-1" />
              <div className="w-10 h-1.5 bg-white font-bold rounded-[1px]" />
              <div className="w-8 h-1 bg-white/70 rounded-[1px]" />
              <div className="w-6 h-1 bg-white/50 rounded-[1px]" />

              <div className="pt-1.5 border-t border-white/20 space-y-0.5">
                <div className="w-7 h-1 bg-white/60 rounded-[1px]" />
                <div className="w-5 h-1 bg-white/80 rounded-[1px]" />
              </div>
            </div>

            <div className="text-[5px] text-white/70 font-mono">
              INV-001
            </div>
          </div>

          {/* Right Main Area (65%) */}
          <div className="w-[64%] h-full p-1.5 flex flex-col justify-between bg-white">
            <div>
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-black text-[7px] text-slate-800">INVOICE</span>
                <div className="w-8 h-1 bg-slate-300 rounded-[1px]" />
              </div>

              <div className="space-y-1 mb-2">
                <div className="flex justify-between py-0.5 border-b border-slate-200">
                  <div className="w-12 h-1 bg-slate-400 rounded-[1px]" />
                  <div className="w-5 h-1 bg-slate-400 rounded-[1px]" />
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <div className="w-10 h-1 bg-slate-300 rounded-[1px]" />
                  <div className="w-4 h-1 bg-slate-300 rounded-[1px]" />
                </div>
                <div className="flex justify-between py-0.5 border-b border-slate-100">
                  <div className="w-8 h-1 bg-slate-200 rounded-[1px]" />
                  <div className="w-4 h-1 bg-slate-200 rounded-[1px]" />
                </div>
              </div>
            </div>

            <div className="p-1 bg-slate-50 border border-slate-200 rounded-[1px] flex justify-between">
              <span className="font-bold text-slate-700">Total</span>
              <span className="font-black" style={{ color: accent }}>$2,850</span>
            </div>
          </div>
        </div>
      );

    case 'template-06': // Elegant Serif
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          <div>
            {/* Elegant Centered Title */}
            <div className="text-center mb-1.5">
              <span className="font-serif italic font-bold text-[8px] tracking-wide" style={{ color: accent }}>
                Invoice
              </span>
              <div className="w-12 h-[1px] mx-auto mt-0.5" style={{ backgroundColor: accent }} />
            </div>

            {/* Double Ornate Rule */}
            <div className="flex items-center gap-1 mb-2">
              <div className="h-[0.5px] bg-slate-300 flex-1" />
              <div className="w-1 h-1 rounded-full bg-slate-400" />
              <div className="h-[0.5px] bg-slate-300 flex-1" />
            </div>

            {/* Elegant Table */}
            <div className="space-y-1 mb-2">
              <div className="flex justify-between font-serif italic text-slate-600 border-b border-slate-200 pb-0.5">
                <div className="w-14 h-1 bg-slate-600 rounded-[1px]" />
                <div className="w-6 h-1 bg-slate-600 rounded-[1px]" />
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-100">
                <div className="w-12 h-1 bg-slate-300 rounded-[1px]" />
                <div className="w-5 h-1 bg-slate-300 rounded-[1px]" />
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-100">
                <div className="w-10 h-1 bg-slate-200 rounded-[1px]" />
                <div className="w-4 h-1 bg-slate-200 rounded-[1px]" />
              </div>
            </div>
          </div>

          <div className="text-right pt-1 border-t border-slate-200">
            <span className="font-serif italic text-[7px] font-bold" style={{ color: accent }}>
              Amount Due: $3,600
            </span>
          </div>
        </div>
      );

    case 'template-07': // Compact Grid
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          <div>
            {/* Compact Header */}
            <div className="flex justify-between items-center mb-1 pb-1 border-b border-slate-200">
              <div className="flex items-center gap-1">
                <div className="w-8 h-2 bg-slate-900 rounded-[1px]" />
                <span className="text-[5px] px-1 bg-slate-200 font-mono font-bold rounded-[1px]">#001</span>
              </div>
              <span className="font-bold text-[6px]" style={{ color: accent }}>COMPACT</span>
            </div>

            {/* Dense 5-Row Table */}
            <div className="border border-slate-300 rounded-[1px] overflow-hidden text-[5px]">
              <div className="bg-slate-100 font-bold flex px-0.5 py-0.5 border-b border-slate-200">
                <span className="w-1/2">Item</span>
                <span className="w-1/4 text-center">Qty</span>
                <span className="w-1/4 text-right">Amt</span>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex px-0.5 py-0.5 border-b border-slate-100">
                  <div className="w-1/2 h-1 bg-slate-300 rounded-[1px]" />
                  <div className="w-1/4 text-center text-slate-400">1</div>
                  <div className="w-1/4 h-1 bg-slate-300 ml-auto rounded-[1px]" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-100 p-0.5 rounded-[1px] text-[6px]">
            <span className="font-bold text-slate-700">Total:</span>
            <span className="font-black" style={{ color: accent }}>$1,940</span>
          </div>
        </div>
      );

    case 'template-08': // Modern Business (Dark Slate Top Block)
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px] -m-2 p-2">
          <div>
            {/* Top Dark Block */}
            <div className="bg-slate-900 text-white p-1.5 rounded-t-[2px] flex justify-between items-center mb-1.5 shadow-2xs">
              <div>
                <div className="w-10 h-1.5 bg-white rounded-[1px] font-bold" />
                <div className="w-6 h-1 bg-slate-400 mt-0.5 rounded-[1px]" />
              </div>
              <div className="px-1 py-0.5 rounded-[1px] text-[5px] font-bold" style={{ backgroundColor: accent }}>
                INV
              </div>
            </div>

            {/* 2 Modern Rounded Mini Cards */}
            <div className="grid grid-cols-2 gap-1 mb-1.5 px-0.5">
              <div className="p-1 rounded-[2px] bg-slate-50 border border-slate-200">
                <div className="w-6 h-1 bg-slate-400 rounded-[1px]" />
              </div>
              <div className="p-1 rounded-[2px] bg-slate-50 border border-slate-200">
                <div className="w-8 h-1 bg-slate-400 rounded-[1px]" />
              </div>
            </div>

            {/* Table */}
            <div className="px-0.5 space-y-0.5">
              <div className="flex justify-between py-0.5 border-b border-slate-200">
                <div className="w-12 h-1 bg-slate-600 rounded-[1px]" />
                <div className="w-6 h-1 bg-slate-600 rounded-[1px]" />
              </div>
              <div className="flex justify-between py-0.5 border-b border-slate-100">
                <div className="w-10 h-1 bg-slate-300 rounded-[1px]" />
                <div className="w-4 h-1 bg-slate-300 rounded-[1px]" />
              </div>
            </div>
          </div>

          <div className="px-0.5 flex justify-end">
            <div className="p-1 rounded-[2px] border-l-2 bg-slate-50 flex items-center gap-2" style={{ borderColor: accent }}>
              <span className="font-bold text-slate-700">Due:</span>
              <span className="font-black text-[7px]" style={{ color: accent }}>$3,500</span>
            </div>
          </div>
        </div>
      );

    case 'template-09': // Creative Studio
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          <div>
            {/* Asymmetric Header with Colored Corner Accent */}
            <div className="flex justify-between items-start mb-2">
              <div className="relative pl-1.5">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full" style={{ backgroundColor: accent }} />
                <span className="font-black text-[8px] text-slate-900 tracking-tight block">CREATIVE</span>
                <span className="text-[5px] text-slate-400 uppercase tracking-wider">STUDIO DESIGN</span>
              </div>
              <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[5px] font-bold" style={{ backgroundColor: accent }}>
                *
              </div>
            </div>

            {/* Items with colored quantity circles */}
            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-1 pb-0.5 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full flex items-center justify-center text-white text-[4px]" style={{ backgroundColor: accent }}>1</div>
                <div className="w-14 h-1 bg-slate-600 rounded-[1px]" />
                <div className="w-5 h-1 bg-slate-600 ml-auto rounded-[1px]" />
              </div>
              <div className="flex items-center gap-1 pb-0.5 border-b border-slate-100">
                <div className="w-2 h-2 rounded-full bg-slate-200" />
                <div className="w-10 h-1 bg-slate-300 rounded-[1px]" />
                <div className="w-4 h-1 bg-slate-300 ml-auto rounded-[1px]" />
              </div>
            </div>
          </div>

          <div className="p-1 rounded-[3px] text-white flex justify-between items-center" style={{ backgroundColor: accent }}>
            <span className="font-bold text-[6px]">BALANCE</span>
            <span className="font-black text-[7px]">$2,900</span>
          </div>
        </div>
      );

    case 'template-10': // Tech & Engineering
      return (
        <div className="w-full h-full flex flex-col justify-between font-mono text-[6px]">
          <div>
            {/* Tech Header */}
            <div className="flex justify-between items-start mb-1.5 pb-1 border-b border-dashed border-slate-300">
              <div>
                <span className="font-black text-[7px] text-slate-900">&gt;SYS_INV</span>
                <div className="w-8 h-1 bg-slate-400 mt-0.5" />
              </div>
              {/* Mini QR / Barcode indicator */}
              <div className="w-4 h-4 border border-slate-400 grid grid-cols-2 p-0.5 gap-0.5">
                <div className="bg-slate-800" />
                <div className="bg-slate-400" />
                <div className="bg-slate-400" />
                <div className="bg-slate-800" />
              </div>
            </div>

            {/* Tech Grid Table */}
            <div className="border border-slate-300 text-[5px]">
              <div className="bg-slate-100 flex p-0.5 font-bold border-b border-slate-300">
                <span className="w-2/3">MODULE</span>
                <span className="w-1/3 text-right">COST</span>
              </div>
              <div className="flex p-0.5 border-b border-slate-200">
                <span className="w-2/3 text-slate-600">INFRA_01</span>
                <span className="w-1/3 text-right text-slate-800">$1,200</span>
              </div>
              <div className="flex p-0.5">
                <span className="w-2/3 text-slate-500">API_CORE</span>
                <span className="w-1/3 text-right text-slate-800">$850</span>
              </div>
            </div>
          </div>

          <div className="p-1 bg-slate-900 text-white flex justify-between items-center rounded-[1px]">
            <span className="text-[5px] text-emerald-400 font-bold">[STATUS: OK]</span>
            <span className="font-black text-[7px]" style={{ color: accent }}>$2,050</span>
          </div>
        </div>
      );

    case 'template-11': // Soft Pastel / Modern Tint
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px]">
          <div>
            {/* Soft Pastel Header with rounded pill */}
            <div
              className="p-1.5 rounded-[4px] mb-1.5 flex justify-between items-center"
              style={{ backgroundColor: `${accent}18` }}
            >
              <div>
                <span className="font-bold text-[7px]" style={{ color: accent }}>Pastel Flow</span>
                <div className="w-10 h-1 rounded-full mt-0.5" style={{ backgroundColor: accent, opacity: 0.5 }} />
              </div>
              <span
                className="px-1.5 py-0.5 rounded-full text-[5px] font-bold text-white shadow-2xs"
                style={{ backgroundColor: accent }}
              >
                INV
              </span>
            </div>

            {/* Soft Table with rounded corners */}
            <div className="space-y-1 mb-2">
              <div className="p-1 rounded-[3px] bg-slate-50 flex justify-between">
                <div className="w-14 h-1 bg-slate-400 rounded-full" />
                <div className="w-5 h-1 bg-slate-500 rounded-full" />
              </div>
              <div className="p-1 rounded-[3px] bg-slate-50 flex justify-between">
                <div className="w-10 h-1 bg-slate-300 rounded-full" />
                <div className="w-4 h-1 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>

          <div
            className="p-1 rounded-[4px] flex justify-between items-center"
            style={{ backgroundColor: `${accent}20` }}
          >
            <span className="font-bold text-slate-800">Total</span>
            <span className="font-black text-[7px]" style={{ color: accent }}>$2,450</span>
          </div>
        </div>
      );

    case 'template-12': // High Contrast Mono (Bold Brutalist)
      return (
        <div className="w-full h-full flex flex-col justify-between text-[6px] border-2 border-black p-1">
          <div>
            {/* Stark Solid Black Header */}
            <div className="bg-black text-white p-1 mb-1.5 flex justify-between items-center">
              <span className="font-black text-[8px] tracking-tight">INVOICE</span>
              <span className="font-mono text-[6px] font-bold">#12</span>
            </div>

            {/* Brutalist Thick Border Table */}
            <div className="border border-black mb-1.5">
              <div className="bg-black text-white flex px-0.5 py-0.5 font-black text-[5px]">
                <span className="w-2/3">DESCRIPTION</span>
                <span className="w-1/3 text-right">PRICE</span>
              </div>
              <div className="flex px-0.5 py-0.5 border-b border-black">
                <div className="w-12 h-1 bg-black rounded-[0px]" />
                <div className="w-6 h-1 bg-black ml-auto rounded-[0px]" />
              </div>
              <div className="flex px-0.5 py-0.5">
                <div className="w-10 h-1 bg-slate-400 rounded-[0px]" />
                <div className="w-4 h-1 bg-slate-400 ml-auto rounded-[0px]" />
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-1 flex justify-between items-center font-black">
            <span className="text-[6px]">DUE NOW</span>
            <span className="text-[8px] text-white">$4,100</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
