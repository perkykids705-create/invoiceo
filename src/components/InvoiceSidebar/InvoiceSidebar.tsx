import React, { useState } from 'react';
import { InvoiceData } from '../../types/invoice';
import { TemplateSelector } from './TemplateSelector';
import { CustomizationPanel } from './CustomizationPanel';
import {
  Download,
  Printer,
  PlusCircle,
  Copy,
  RotateCcw,
  FileJson,
  Upload,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface InvoiceSidebarProps {
  invoice: InvoiceData;
  isDownloadingPdf: boolean;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onTemplateChange: (templateId: string) => void;
  onCustomizationChange: (customization: InvoiceData['customization']) => void;
  onNewInvoice: () => void;
  onDuplicateInvoice: () => void;
  onResetSample: () => void;
  onExportJson: () => void;
  onImportClick: () => void;
}

export const InvoiceSidebar: React.FC<InvoiceSidebarProps> = ({
  invoice,
  isDownloadingPdf,
  onDownloadPdf,
  onPrint,
  onTemplateChange,
  onCustomizationChange,
  onNewInvoice,
  onDuplicateInvoice,
  onResetSample,
  onExportJson,
  onImportClick,
}) => {
  const [templateSectionOpen, setTemplateSectionOpen] = useState(true);
  const [designSectionOpen, setDesignSectionOpen] = useState(true);
  const [actionsSectionOpen, setActionsSectionOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* 1. PRIMARY DOWNLOAD BUTTON */}
      <div className="bg-white p-4.5 rounded-[4px] border border-slate-200 shadow-sm space-y-3">
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={isDownloadingPdf}
          className="w-full py-3.5 px-4 bg-[#30364F] hover:bg-[#252a3d] text-white font-extrabold text-base rounded-[4px] flex items-center justify-center gap-2.5 shadow-2xs transition-all hover:shadow active:scale-[0.99] disabled:opacity-60 cursor-pointer"
        >
          {isDownloadingPdf ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-white" />
              <span>Generating Searchable PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-white" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onPrint}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-black text-sm font-extrabold rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>Print Invoice</span>
          </button>
          <button
            type="button"
            onClick={onExportJson}
            className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-black text-sm font-extrabold rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FileJson className="w-4 h-4 text-black" />
            <span>Export JSON</span>
          </button>
        </div>

        <p className="text-xs text-black text-center pt-1 font-bold">
          100% Vector & Searchable Text • Standard A4
        </p>
      </div>

      {/* 2. TEMPLATES ACCORDION */}
      <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setTemplateSectionOpen(!templateSectionOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span className="font-extrabold text-sm text-black">
            Invoice Layout (12 Styles)
          </span>
          {templateSectionOpen ? (
            <ChevronUp className="w-4 h-4 text-black" />
          ) : (
            <ChevronDown className="w-4 h-4 text-black" />
          )}
        </button>
        {templateSectionOpen && (
          <div className="p-4 pt-0 border-t border-slate-100">
            <TemplateSelector
              currentTemplate={invoice.template}
              primaryColor={invoice.customization?.primaryColor || '#30364F'}
              onSelect={onTemplateChange}
            />
          </div>
        )}
      </div>

      {/* 3. DESIGN & STYLING ACCORDION */}
      <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setDesignSectionOpen(!designSectionOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span className="font-extrabold text-sm text-black">
            Colors & Typography
          </span>
          {designSectionOpen ? (
            <ChevronUp className="w-4 h-4 text-black" />
          ) : (
            <ChevronDown className="w-4 h-4 text-black" />
          )}
        </button>
        {designSectionOpen && (
          <div className="p-4 pt-0 border-t border-slate-100">
            <CustomizationPanel
              customization={invoice.customization}
              currentTemplate={invoice.template}
              onTemplateChange={onTemplateChange}
              onChange={onCustomizationChange}
            />
          </div>
        )}
      </div>

      {/* 4. ACTIONS & DATA CONTROLS ACCORDION */}
      <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setActionsSectionOpen(!actionsSectionOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <span className="font-extrabold text-sm text-black">
            Invoice Tools & Backup
          </span>
          {actionsSectionOpen ? (
            <ChevronUp className="w-4 h-4 text-black" />
          ) : (
            <ChevronDown className="w-4 h-4 text-black" />
          )}
        </button>
        {actionsSectionOpen && (
          <div className="p-4 pt-0 border-t border-slate-100 space-y-2.5 text-sm">
            <button
              type="button"
              onClick={onNewInvoice}
              className="w-full py-2.5 px-3.5 border border-slate-200 hover:bg-slate-50 rounded-[4px] text-left flex items-center gap-2.5 text-black font-bold transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-black" />
              <span>Create Blank Invoice</span>
            </button>
            <button
              type="button"
              onClick={onDuplicateInvoice}
              className="w-full py-2.5 px-3.5 border border-slate-200 hover:bg-slate-50 rounded-[4px] text-left flex items-center gap-2.5 text-black font-bold transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-black" />
              <span>Duplicate Current Invoice</span>
            </button>
            <button
              type="button"
              onClick={onImportClick}
              className="w-full py-2.5 px-3.5 border border-slate-200 hover:bg-slate-50 rounded-[4px] text-left flex items-center gap-2.5 text-black font-bold transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-black" />
              <span>Import Invoice from JSON</span>
            </button>
            <button
              type="button"
              onClick={onResetSample}
              className="w-full py-2.5 px-3.5 border border-slate-200 hover:bg-slate-50 rounded-[4px] text-left flex items-center gap-2.5 text-black font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-black" />
              <span>Load Professional Sample Data</span>
            </button>
          </div>
        )}
      </div>

      {/* PRIVACY & AUTO-SAVE BADGE */}
      <div className="p-3.5 bg-slate-50 rounded-[4px] border border-slate-200 text-xs sm:text-sm text-black flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-black font-black">Auto-save is active:</strong> Any changes to invoice details, line items, and customization are automatically saved in your browser.
        </p>
      </div>
    </div>
  );
};
