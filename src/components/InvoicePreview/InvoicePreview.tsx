import React, { useState } from 'react';
import { InvoiceData, CalculatedTotals } from '../../types/invoice';
import { renderTemplateComponent } from '../../templates/TemplateRegistry';
import { ZoomIn, ZoomOut, Maximize2, Printer } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  totals: CalculatedTotals;
  onPrint: () => void;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({
  invoice,
  totals,
  onPrint,
}) => {
  const [scale, setScale] = useState<number>(1);

  const fontClass = `font-${invoice.customization?.font || 'inter'}`;

  return (
    <div className="flex flex-col h-full">
      {/* Top Preview Bar with Zoom and Print Controls */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-slate-200 rounded-t-[4px] text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Live Preview</span>
          <span className="text-[11px] text-slate-500 font-mono">
            A4 • {invoice.template.replace('template-', 'T')}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setScale((prev) => Math.max(0.6, prev - 0.1))}
            className="p-1 hover:bg-slate-200 rounded-[3px] text-slate-600 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-500 w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setScale((prev) => Math.min(1.4, prev + 0.1))}
            className="p-1 hover:bg-slate-200 rounded-[3px] text-slate-600 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            className="p-1 hover:bg-slate-200 rounded-[3px] text-slate-600 transition-colors"
            title="Reset zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-300 mx-1">|</span>
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-[3px] text-[11px] font-medium text-slate-700 transition-colors shadow-2xs"
            title="Print or Save via browser"
          >
            <Printer className="w-3 h-3 text-slate-500" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Realistic Paper Container */}
      <div className="bg-slate-200/70 p-3 sm:p-6 overflow-auto flex justify-center items-start min-h-[600px] max-h-[1100px] rounded-b-[4px] border border-t-0 border-slate-200">
        <div
          id="invoice-print-sheet"
          className={`bg-white shadow-md transition-transform duration-150 origin-top ${fontClass}`}
          style={{
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            marginBottom: scale > 1 ? `${(scale - 1) * 350}px` : '0px',
          }}
        >
          {renderTemplateComponent(invoice.template, { invoice, totals })}
        </div>
      </div>
    </div>
  );
};
