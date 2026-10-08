import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';

export const Template11TwoColumn: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#6366f1';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;

  return (
    <div className="p-8 sm:p-10 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Two-Column Balanced Header */}
        <div className="grid grid-cols-2 gap-8 pb-8 border-b border-slate-200 mb-6">
          <div>
            {invoice.business.logo && (
              <img
                src={invoice.business.logo}
                alt="Logo"
                className="max-h-12 max-w-[160px] object-contain mb-3"
              />
            )}
            <h1 className="text-lg font-bold text-slate-900">{invoice.business.name || 'Company Name'}</h1>
            <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.business.address}</div>
            <div className="text-xs text-slate-500 mt-1">{invoice.business.email} {invoice.business.phone && `• ${invoice.business.phone}`}</div>
          </div>

          <div className="text-right">
            <span
              className="text-2xl font-black uppercase tracking-tight block"
              style={{ color: primaryColor }}
            >
              INVOICE
            </span>
            <div className="text-xs font-mono font-bold text-slate-700 mt-1">#{invoice.invoiceNumber || 'INV-0001'}</div>
            <div className="mt-3 text-xs text-slate-600 space-y-0.5">
              <div>Invoice Date: <span className="font-semibold">{formatDateString(invoice.issueDate, dateFormat)}</span></div>
              <div>Due Date: <span className="font-semibold">{formatDateString(invoice.dueDate, dateFormat)}</span></div>
              {invoice.paymentTerms && <div>Terms: <span className="font-semibold">{invoice.paymentTerms}</span></div>}
            </div>
          </div>
        </div>

        {/* Client Box */}
        <div className="mb-6 p-4 rounded-[4px] bg-slate-50 border border-slate-200 flex justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Bill To</span>
            <div className="font-bold text-sm text-slate-900">{invoice.customer.name}</div>
            {invoice.customer.company && <div className="text-xs text-slate-700">{invoice.customer.company}</div>}
            <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-1">
            {invoice.customer.email && <div>{invoice.customer.email}</div>}
            {invoice.customer.taxNumber && <div>Tax ID: {invoice.customer.taxNumber}</div>}
            {invoice.referenceNumber && <div>Ref: {invoice.referenceNumber}</div>}
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left mb-6 border-collapse">
          <thead>
            <tr className="border-b-2 text-[11px] font-bold uppercase tracking-wider text-slate-700" style={{ borderColor: primaryColor }}>
              <th className="py-2.5 px-3">Description</th>
              <th className="py-2.5 px-3 text-center w-20">Qty</th>
              <th className="py-2.5 px-3 text-right w-28">Price</th>
              <th className="py-2.5 px-3 text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-3 px-3 font-medium text-slate-800 whitespace-pre-line">{item.description}</td>
                <td className="py-3 px-3 text-center text-slate-600">{item.quantity}</td>
                <td className="py-3 px-3 text-right text-slate-600">{formatCurrency(item.rate, curr, numFormat)}</td>
                <td className="py-3 px-3 text-right font-bold text-slate-900">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals & Notes */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
          <div className="w-full sm:w-1/2 space-y-3 text-xs">
            {invoice.notes && (
              <div>
                <span className="font-bold text-[10px] uppercase text-slate-400 block mb-1">Notes:</span>
                <p className="text-slate-600 whitespace-pre-line">{invoice.notes}</p>
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px] font-mono text-[11px] text-slate-600 whitespace-pre-line">
                {invoice.paymentInstructions}
              </div>
            )}
          </div>

          <div className="w-full sm:w-5/12 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-800">{formatCurrency(totals.subtotal, curr, numFormat)}</span>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount:</span>
                <span>-{formatCurrency(totals.totalDiscount, curr, numFormat)}</span>
              </div>
            )}
            {totals.totalTax > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Tax ({invoice.taxRate}%):</span>
                <span>{formatCurrency(totals.totalTax, curr, numFormat)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t-2" style={{ borderColor: primaryColor }}>
              <span>Total Amount:</span>
              <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-8 pt-4 text-center text-[10px] text-slate-400 border-t border-slate-100">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
