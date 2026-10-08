import React from 'react';
import { InvoiceData } from '../../types/invoice';
import { CURRENCY_OPTIONS } from '../../data/templates';
import { ReceiptText } from 'lucide-react';

interface InvoiceDetailsFormProps {
  invoice: InvoiceData;
  onChange: (updated: Partial<InvoiceData>) => void;
}

export const InvoiceDetailsForm: React.FC<InvoiceDetailsFormProps> = ({
  invoice,
  onChange,
}) => {
  const handlePaymentTermsChange = (terms: string) => {
    // If selected net days, calculate due date automatically from issue date
    if (terms.startsWith('Net ') && invoice.issueDate) {
      const days = parseInt(terms.replace('Net ', ''), 10);
      if (!isNaN(days)) {
        const issue = new Date(invoice.issueDate);
        issue.setDate(issue.getDate() + days);
        const newDue = issue.toISOString().split('T')[0];
        onChange({ paymentTerms: terms, dueDate: newDue });
        return;
      }
    }
    onChange({ paymentTerms: terms });
  };

  const handleCurrencyChange = (currCode: string) => {
    const found = CURRENCY_OPTIONS.find((c) => c.code === currCode);
    if (found) {
      onChange({
        currency: found.code,
        currencySymbol: found.symbol,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 text-black font-extrabold text-base sm:text-lg">
          <ReceiptText className="w-5 h-5 text-black" />
          <span>Invoice Information</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-black">
          Metadata & Dates
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Invoice Number */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Invoice Number <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            value={invoice.invoiceNumber}
            onChange={(e) => onChange({ invoiceNumber: e.target.value })}
            placeholder="INV-0001"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black font-mono text-black font-bold placeholder:text-stone-500"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Currency
          </label>
          <select
            value={invoice.currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-semibold"
          >
            {CURRENCY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code} className="text-black">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Issue Date
          </label>
          <input
            type="date"
            value={invoice.issueDate}
            onChange={(e) => onChange({ issueDate: e.target.value })}
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-semibold"
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={invoice.dueDate}
            onChange={(e) => onChange({ dueDate: e.target.value })}
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-semibold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Payment Terms */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Payment Terms
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={invoice.paymentTerms}
              onChange={(e) => onChange({ paymentTerms: e.target.value })}
              placeholder="e.g. Net 14 Days"
              className="flex-1 px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-medium placeholder:text-stone-500"
            />
            <select
              onChange={(e) => handlePaymentTermsChange(e.target.value)}
              value=""
              className="px-3 py-2.5 text-sm font-bold bg-slate-50 border border-slate-300 rounded-[4px] text-black focus:outline-none"
            >
              <option value="" disabled className="text-black">
                Presets...
              </option>
              <option value="Due on Receipt" className="text-black">Due on Receipt</option>
              <option value="Net 7 Days" className="text-black">Net 7 Days</option>
              <option value="Net 14 Days" className="text-black">Net 14 Days</option>
              <option value="Net 30 Days" className="text-black">Net 30 Days</option>
              <option value="Net 60 Days" className="text-black">Net 60 Days</option>
              <option value="50% Upfront, 50% on Completion" className="text-black">50/50 Split</option>
            </select>
          </div>
        </div>

        {/* Reference / PO */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            PO Number / Reference Code
          </label>
          <input
            type="text"
            value={invoice.referenceNumber || invoice.poNumber || ''}
            onChange={(e) => onChange({ referenceNumber: e.target.value, poNumber: e.target.value })}
            placeholder="e.g. PO-98421"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-medium placeholder:text-stone-500"
          />
        </div>
      </div>
    </div>
  );
};
