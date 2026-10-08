import React, { useState, useEffect, useRef } from 'react';
import { InvoiceData } from '../types/invoice';
import { TEMPLATES_LIST } from '../data/templates';
import {
  loadActiveInvoice,
  saveActiveInvoice,
  getSavedInvoicesList,
  saveInvoiceToStore,
  deleteInvoiceFromStore,
  exportInvoiceAsJson,
  validateImportedInvoice,
} from '../utils/storage';
import { calculateInvoiceTotals } from '../utils/calculations';
import { generateSearchablePdf } from '../utils/pdf/generatePdf';
import { renderTemplateComponent } from '../templates/TemplateRegistry';
import { getInitialInvoiceData, getBlankInvoiceData } from '../data/defaultInvoice';
import { Header } from '../components/Header/Header';
import { InvoiceForm } from '../components/InvoiceForm/InvoiceForm';
import { InvoicePreview } from '../components/InvoicePreview/InvoicePreview';
import { InvoiceSidebar } from '../components/InvoiceSidebar/InvoiceSidebar';
import { InvoicesListModal } from '../components/InvoiceSidebar/InvoicesListModal';
import { SeoContent } from '../components/Footer/SeoContent';
import { FourColumnSection } from '../components/Footer/FourColumnSection';
import { Footer } from '../components/Footer/Footer';
import { FileEdit, Eye, AlertCircle, CheckCircle2 } from 'lucide-react';

export const InvoiceGeneratorPage: React.FC = () => {
  const [invoice, setInvoice] = useState<InvoiceData>(() => loadActiveInvoice());
  const [savedInvoices, setSavedInvoices] = useState<InvoiceData[]>(() => getSavedInvoicesList());
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isAutosaved, setIsAutosaved] = useState(true);

  const importFileInputRef = useRef<HTMLInputElement>(null);

  // Instantaneous synchronous save + debounced multi-store auto-save for any invoice or customization change
  useEffect(() => {
    setIsAutosaved(false);
    // 1. Immediately save active invoice into localStorage synchronously
    saveActiveInvoice(invoice);

    // 2. Debounce multi-invoice store synchronization
    const timer = setTimeout(() => {
      saveInvoiceToStore(invoice);
      setSavedInvoices(getSavedInvoicesList());
      setIsAutosaved(true);
    }, 250);

    return () => clearTimeout(timer);
  }, [invoice]);

  // Window unload guard: ensures instant flush if user closes or reloads page
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveActiveInvoice(invoice);
      saveInvoiceToStore(invoice);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [invoice]);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 3500);
  };

  const handleInvoiceChange = (updated: InvoiceData) => {
    setInvoice(updated);
  };

  const handleNewInvoice = () => {
    if (confirm('Create a new blank invoice? Your current invoice is already saved in My Invoices.')) {
      const blank = getBlankInvoiceData();
      setInvoice(blank);
      showStatus('New blank invoice created');
    }
  };

  const handleDuplicateInvoice = (targetInvoice?: InvoiceData) => {
    const toDuplicate = targetInvoice || invoice;
    const duplicated: InvoiceData = {
      ...toDuplicate,
      id: 'inv_' + Date.now().toString(36),
      invoiceNumber: `${toDuplicate.invoiceNumber}-COPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveInvoiceToStore(duplicated);
    setInvoice(duplicated);
    setSavedInvoices(getSavedInvoicesList());
    showStatus(`Duplicated as ${duplicated.invoiceNumber}`);
  };

  const handleDeleteInvoice = (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoiceFromStore(id);
      const updatedList = getSavedInvoicesList();
      setSavedInvoices(updatedList);
      if (invoice.id === id) {
        if (updatedList.length > 0) {
          setInvoice(updatedList[0]);
        } else {
          setInvoice(getInitialInvoiceData());
        }
      }
      showStatus('Invoice deleted from browser store');
    }
  };

  const handleResetSample = () => {
    if (confirm('Load sample invoice data? This will overwrite your active draft.')) {
      const sample = getInitialInvoiceData();
      setInvoice(sample);
      showStatus('Loaded sample invoice data');
    }
  };

  const handleExportJson = () => {
    exportInvoiceAsJson(invoice);
    showStatus(`Exported ${invoice.invoiceNumber}.json`);
  };

  const handleImportClick = () => {
    importFileInputRef.current?.click();
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawJson = JSON.parse(event.target?.result as string);
        const { valid, error, invoice: loadedInvoice } = validateImportedInvoice(rawJson);
        if (!valid || !loadedInvoice) {
          showStatus(error || 'Invalid invoice file structure', 'error');
          return;
        }

        setInvoice(loadedInvoice);
        saveInvoiceToStore(loadedInvoice);
        setSavedInvoices(getSavedInvoicesList());
        showStatus(`Imported ${loadedInvoice.invoiceNumber} successfully`);
      } catch {
        showStatus('Failed to parse file: Invalid JSON format', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      await generateSearchablePdf(invoice);
      showStatus(`Downloaded ${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      console.error('PDF generation error:', err);
      showStatus('Failed to generate PDF. Please try the Print option.', 'error');
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const totals = calculateInvoiceTotals(invoice);

  return (
    <div className="min-h-screen bg-[#eaedf2] py-0 lg:py-6 px-0 lg:px-6 flex flex-col items-center">
      {/* Boxed Application Container */}
      <div className="w-full max-w-[1400px] bg-[#f8f9fa] lg:rounded-[4px] lg:border lg:border-slate-300/80 shadow-[0_4px_24px_rgba(48,54,79,0.07)] flex flex-col overflow-hidden">
        {/* Top Primary Color Accent Bar */}
        <div className="h-1 bg-[#30364F] w-full" />

        {/* Hidden file input for JSON import */}
        <input
          ref={importFileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImportFileChange}
          className="hidden"
        />

        {/* Main Website Header */}
        <Header
          onNewInvoice={handleNewInvoice}
          onOpenSavedModal={() => setIsSavedModalOpen(true)}
          onExportJson={handleExportJson}
          onImportClick={handleImportClick}
          savedCount={savedInvoices.length}
          isAutosaved={isAutosaved}
        />

        {/* Floating Status Notification */}
        {statusMessage && (
          <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-[4px] shadow-lg text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 bg-[#30364F] text-white">
            {statusMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* INVOICE WORKSPACE AREA */}
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile / Tablet Tab Switcher */}
          <div className="lg:hidden mb-6">
            <div className="grid grid-cols-2 p-1.5 bg-slate-200/80 rounded-[4px]">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`py-2.5 text-sm font-bold rounded-[3px] flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'form'
                    ? 'bg-[#30364F] text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <FileEdit className="w-4 h-4" />
                <span>Edit Invoice</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`py-2.5 text-sm font-bold rounded-[3px] flex items-center justify-center gap-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-[#30364F] text-white shadow-2xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview & Customize</span>
              </button>
            </div>
          </div>

        {/* Desktop 2-Column Workspace / Responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT / MAIN INVOICE FORM (7 Cols on desktop) */}
          <div
            className={`lg:col-span-7 xl:col-span-7 space-y-6 ${
              activeTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                  Invoice Generator
                </h2>
                <p className="text-base text-black mt-1 font-medium">
                  Fill in your details below. Preview and download update automatically in real time.
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm text-black font-bold">Currency: </span>
                <span className="text-base font-extrabold text-black">
                  {invoice.currency} ({invoice.currencySymbol})
                </span>
              </div>
            </div>

            <InvoiceForm
              invoice={invoice}
              totals={totals}
              onChange={handleInvoiceChange}
            />
          </div>

          {/* RIGHT PREVIEW & SIDEBAR CONTROLS (5 Cols on desktop) */}
          <div
            className={`lg:col-span-5 xl:col-span-5 space-y-5 ${
              activeTab === 'form' ? 'hidden lg:block' : 'block'
            }`}
          >
            {/* Live Invoice Preview */}
            <div className="bg-white rounded-[4px] border border-slate-200 shadow-sm overflow-hidden sticky top-20">
              <InvoicePreview
                invoice={invoice}
                totals={totals}
                onPrint={handlePrint}
              />

              {/* Sidebar Settings & Download Panel below preview */}
              <div className="p-4 border-t border-slate-200">
                <InvoiceSidebar
                  invoice={invoice}
                  isDownloadingPdf={isDownloadingPdf}
                  onDownloadPdf={handleDownloadPdf}
                  onPrint={handlePrint}
                  onTemplateChange={(templateId) => {
                    const tpl = TEMPLATES_LIST.find((t) => t.id === templateId);
                    handleInvoiceChange({ ...invoice, template: templateId, updatedAt: new Date().toISOString() });
                    showStatus(`Applied template: ${tpl?.name || templateId} • Auto-saved`);
                  }}
                  onCustomizationChange={(customization) =>
                    handleInvoiceChange({ ...invoice, customization, updatedAt: new Date().toISOString() })
                  }
                  onNewInvoice={handleNewInvoice}
                  onDuplicateInvoice={() => handleDuplicateInvoice(invoice)}
                  onResetSample={handleResetSample}
                  onExportJson={handleExportJson}
                  onImportClick={handleImportClick}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SEO Content Area below the generator */}
      <SeoContent />

      {/* Professional 4-Column Section */}
      <FourColumnSection />

      {/* Footer */}
      <Footer />
      </div>

      {/* Saved Invoices Modal */}
      <InvoicesListModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        invoices={savedInvoices}
        currentInvoiceId={invoice.id}
        onSelectInvoice={(selected) => setInvoice(selected)}
        onDuplicateInvoice={handleDuplicateInvoice}
        onDeleteInvoice={handleDeleteInvoice}
        onNewInvoice={handleNewInvoice}
      />

      {/* Hidden A4 Export Container for Pixel-Perfect PDF Generation matching Selected Template */}
      <div
        id="invoice-pdf-export-container"
        aria-hidden="true"
        className={`bg-white font-${invoice.customization?.font || 'inter'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '794px',
          minHeight: '1123px',
          zIndex: -9999,
          pointerEvents: 'none',
          opacity: 1,
          visibility: 'visible',
          backgroundColor: '#ffffff',
        }}
      >
        {renderTemplateComponent(invoice.template, { invoice, totals })}
      </div>
    </div>
  );
};
