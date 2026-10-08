import React from 'react';
import { InvoiceData } from '../../types/invoice';
import { formatCurrency, formatDateString } from '../../utils/formatters';
import { calculateInvoiceTotals } from '../../utils/calculations';
import { X, FolderOpen, Copy, Trash2, ArrowRight, PlusCircle } from 'lucide-react';

interface InvoicesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoices: InvoiceData[];
  currentInvoiceId: string;
  onSelectInvoice: (invoice: InvoiceData) => void;
  onDuplicateInvoice: (invoice: InvoiceData) => void;
  onDeleteInvoice: (id: string) => void;
  onNewInvoice: () => void;
}

export const InvoicesListModal: React.FC<InvoicesListModalProps> = ({
  isOpen,
  onClose,
  invoices,
  currentInvoiceId,
  onSelectInvoice,
  onDuplicateInvoice,
  onDeleteInvoice,
  onNewInvoice,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-[4px] border border-slate-300 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden text-black">
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-5 h-5 text-black" />
            <div>
              <h2 className="font-black text-lg text-black">Saved Invoices</h2>
              <p className="text-xs text-black font-semibold">
                Stored privately in your browser&apos;s localStorage ({invoices.length} invoices)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-black hover:bg-slate-100 rounded-[4px] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal List Body */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {invoices.length === 0 ? (
            <div className="text-center py-14 text-black space-y-3">
              <FolderOpen className="w-12 h-12 mx-auto text-black" />
              <p className="text-base font-extrabold text-black">No saved invoices found in this browser.</p>
              <button
                type="button"
                onClick={() => {
                  onNewInvoice();
                  onClose();
                }}
                className="px-4 py-2 bg-[#30364F] hover:bg-[#252a3d] text-white rounded-[4px] text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                Create First Invoice
              </button>
            </div>
          ) : (
            invoices.map((inv) => {
              const totals = calculateInvoiceTotals(inv);
              const isCurrent = inv.id === currentInvoiceId;

              return (
                <div
                  key={inv.id}
                  className={`p-4 rounded-[4px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 ${
                    isCurrent
                      ? 'border-black bg-slate-100 ring-1 ring-black'
                      : 'border-slate-300 hover:border-black bg-white'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-black text-sm text-black">
                        {inv.invoiceNumber || 'Untitled Invoice'}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-[3px] bg-[#30364F] text-white text-xs font-bold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-black font-medium">
                      <strong className="text-black font-black">Client:</strong> {inv.customer.name || inv.customer.company || 'Unnamed Client'}
                    </div>
                    <div className="text-xs text-black font-medium flex flex-wrap gap-3">
                      <span>Date: {formatDateString(inv.issueDate, inv.customization?.dateFormat)}</span>
                      <span>Items: {inv.items.length}</span>
                      <span>Total: <strong className="text-black font-black">{formatCurrency(totals.grandTotal, inv.currencySymbol)}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectInvoice(inv);
                        onClose();
                      }}
                      className="px-3.5 py-2 bg-[#30364F] hover:bg-[#252a3d] text-white rounded-[4px] text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>Load</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDuplicateInvoice(inv)}
                      className="p-2 text-black hover:bg-slate-100 border border-slate-300 rounded-[4px] transition-colors cursor-pointer"
                      title="Duplicate invoice"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteInvoice(inv.id)}
                      className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-[4px] transition-colors cursor-pointer"
                      title="Delete invoice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs sm:text-sm text-black font-semibold">
          <span>Invoices are auto-saved in your browser storage.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-400 hover:bg-slate-100 rounded-[4px] text-black font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
