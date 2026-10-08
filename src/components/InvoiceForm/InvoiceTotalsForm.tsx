import React from 'react';
import { InvoiceData, CalculatedTotals } from '../../types/invoice';
import { formatCurrency } from '../../utils/formatters';
import { Calculator } from 'lucide-react';

interface InvoiceTotalsFormProps {
  invoice: InvoiceData;
  totals: CalculatedTotals;
  onChange: (updated: Partial<InvoiceData>) => void;
}

export const InvoiceTotalsForm: React.FC<InvoiceTotalsFormProps> = ({
  invoice,
  totals,
  onChange,
}) => {
  const curr = invoice.currencySymbol;

  return (
    <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 text-black font-extrabold text-base sm:text-lg">
          <Calculator className="w-5 h-5 text-black" />
          <span>Discounts, Taxes & Totals</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-black">
          Financial Summary
        </span>
      </div>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-2 text-black border-b border-slate-100">
          <span className="text-base font-extrabold text-black">Subtotal</span>
          <span className="font-black text-black text-lg">
            {formatCurrency(totals.subtotal, curr)}
          </span>
        </div>

        {/* Invoice-Level Discount */}
        <div className="p-4 bg-slate-50 rounded-[4px] border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-black">Invoice Discount</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange({ discountType: 'percentage' })}
                className={`px-3 py-1 text-xs font-extrabold rounded-[3px] transition-colors cursor-pointer ${
                  invoice.discountType === 'percentage'
                    ? 'bg-black text-white shadow-2xs'
                    : 'bg-white text-black border border-slate-300 hover:bg-slate-100'
                }`}
              >
                Percentage (%)
              </button>
              <button
                type="button"
                onClick={() => onChange({ discountType: 'fixed' })}
                className={`px-3 py-1 text-xs font-extrabold rounded-[3px] transition-colors cursor-pointer ${
                  invoice.discountType === 'fixed'
                    ? 'bg-black text-white shadow-2xs'
                    : 'bg-white text-black border border-slate-300 hover:bg-slate-100'
                }`}
              >
                Fixed ({curr})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Discount Label</label>
              <input
                type="text"
                value={invoice.discountLabel}
                onChange={(e) => onChange({ discountLabel: e.target.value })}
                placeholder="Discount"
                className="w-full px-3 py-2 text-base font-medium bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Discount Value {invoice.discountType === 'percentage' ? '(%)' : `(${curr})`}
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={invoice.discountRate}
                onChange={(e) =>
                  onChange({ discountRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
              />
            </div>
          </div>
          {totals.totalDiscount > 0 && (
            <div className="text-right text-sm text-black font-extrabold">
              Discount Applied: -{formatCurrency(totals.totalDiscount, curr)}
            </div>
          )}
        </div>

        {/* Invoice-Level Tax */}
        <div className="p-4 bg-slate-50 rounded-[4px] border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-black">Sales Tax / VAT / GST</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Label</label>
              <input
                type="text"
                value={invoice.taxLabel}
                onChange={(e) => onChange({ taxLabel: e.target.value })}
                placeholder="Tax / VAT / GST"
                className="w-full px-3 py-2 text-base font-medium bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={invoice.taxRate}
                onChange={(e) =>
                  onChange({ taxRate: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
              />
            </div>
          </div>
          {totals.totalTax > 0 && (
            <div className="text-right text-sm text-black font-extrabold">
              Tax Amount: {formatCurrency(totals.totalTax, curr)}
            </div>
          )}
        </div>

        {/* Shipping / Additional fees */}
        <div className="grid grid-cols-2 gap-3 items-center pt-1">
          <label className="text-sm font-semibold text-slate-600">
            Shipping / Handling / Extra Fee
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={invoice.shipping}
            onChange={(e) => onChange({ shipping: parseFloat(e.target.value) || 0 })}
            placeholder="0.00"
            className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black text-right"
          />
        </div>

        {/* Grand Total Bar */}
        <div className="pt-4 border-t-2 border-black flex justify-between items-center">
          <span className="text-base sm:text-lg font-black text-black">Total Invoice Amount:</span>
          <span className="text-2xl sm:text-3xl font-black text-black">
            {formatCurrency(totals.grandTotal, curr)}
          </span>
        </div>

        {/* Amount Paid & Balance Due */}
        <div className="p-4 bg-slate-100 rounded-[4px] space-y-3">
          <div className="grid grid-cols-2 gap-3 items-center">
            <label className="text-sm font-extrabold text-black">Amount Paid:</label>
            <input
              type="number"
              min="0"
              step="any"
              value={invoice.amountPaid}
              onChange={(e) =>
                onChange({ amountPaid: parseFloat(e.target.value) || 0 })
              }
              placeholder="0.00"
              className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black text-right"
            />
          </div>
          <div className="flex justify-between items-center text-sm font-bold text-black pt-2 border-t border-slate-200">
            <span className="text-base font-black text-black">Balance Due:</span>
            <span className="text-xl font-black text-black">
              {formatCurrency(totals.balanceDue, curr)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
