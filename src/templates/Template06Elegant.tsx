import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';

export const Template06Elegant: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#78350f';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;

  return (
    <div className="p-8 sm:p-12 text-slate-800 bg-[#fffdfa] min-h-[1050px] flex flex-col justify-between font-serif">
      <div>
        {/* Centered Luxury Masthead */}
        <div className="text-center pb-8 border-b border-amber-900/10 mb-8">
          {invoice.business.logo && (
            <div className="flex justify-center mb-3">
              <img
                src={invoice.business.logo}
                alt="Logo"
                className="max-h-14 max-w-[180px] object-contain"
              />
            </div>
          )}
          <h1 className="text-2xl font-normal tracking-wide text-stone-900 uppercase">
            {invoice.business.name || 'Studio & Associates'}
          </h1>
          <p className="text-xs text-stone-500 font-sans tracking-widest uppercase mt-1">
            Invoice No. {invoice.invoiceNumber || 'INV-0001'}
          </p>
          <div className="flex justify-center gap-6 text-xs text-stone-500 font-sans mt-3">
            <span>Date: {formatDateString(invoice.issueDate, dateFormat)}</span>
            <span>•</span>
            <span>Due: {formatDateString(invoice.dueDate, dateFormat)}</span>
            {invoice.paymentTerms && (
              <>
                <span>•</span>
                <span>Terms: {invoice.paymentTerms}</span>
              </>
            )}
          </div>
        </div>

        {/* 2-Column Elegant Details */}
        <div className="grid grid-cols-2 gap-8 mb-10 pb-6 border-b border-amber-900/10 text-xs font-sans">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">
              Provider
            </span>
            <div className="font-serif text-sm font-semibold text-stone-800">{invoice.business.name}</div>
            <div className="text-stone-600 whitespace-pre-line mt-1">{invoice.business.address}</div>
            <div className="text-stone-500 mt-1">{invoice.business.email}</div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-1">
              Client
            </span>
            <div className="font-serif text-sm font-semibold text-stone-800">{invoice.customer.name}</div>
            {invoice.customer.company && <div className="text-stone-700">{invoice.customer.company}</div>}
            <div className="text-stone-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
            {invoice.customer.email && <div className="text-stone-500 mt-1">{invoice.customer.email}</div>}
          </div>
        </div>

        {/* Items Table with fine double borders */}
        <table className="w-full text-left mb-8 border-collapse">
          <thead>
            <tr className="border-b border-t border-stone-800 text-[10px] font-sans uppercase tracking-widest text-stone-600">
              <th className="py-2.5">Item Description</th>
              <th className="py-2.5 text-center w-16">Qty</th>
              <th className="py-2.5 text-right w-24">Rate</th>
              <th className="py-2.5 text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60 text-xs">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-3.5 pr-4 text-stone-800 whitespace-pre-line">
                  {item.description}
                </td>
                <td className="py-3.5 text-center font-sans text-stone-600">{item.quantity}</td>
                <td className="py-3.5 text-right font-sans text-stone-600">
                  {formatCurrency(item.rate, curr, numFormat)}
                </td>
                <td className="py-3.5 text-right font-serif text-stone-900 font-medium">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section with fine serif styling */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 font-sans">
          <div className="w-full sm:w-1/2 space-y-3 text-xs">
            {invoice.notes && (
              <div className="italic text-stone-600 text-xs leading-relaxed font-serif">
                "{invoice.notes}"
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="pt-2 border-t border-stone-200 text-stone-600 font-sans text-[11px] whitespace-pre-line">
                <span className="font-semibold uppercase tracking-wider text-[9px] block text-stone-400 mb-1">
                  Payment Details
                </span>
                {invoice.paymentInstructions}
              </div>
            )}
          </div>

          <div className="w-full sm:w-5/12 text-xs space-y-2">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal:</span>
              <span className="font-serif">{formatCurrency(totals.subtotal, curr, numFormat)}</span>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Discount:</span>
                <span>-{formatCurrency(totals.totalDiscount, curr, numFormat)}</span>
              </div>
            )}
            {totals.totalTax > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Tax ({invoice.taxRate}%):</span>
                <span>{formatCurrency(totals.totalTax, curr, numFormat)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-b border-stone-800 py-1">
              <span>Total Amount:</span>
              <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-8 pt-4 text-center text-[10px] text-stone-400 font-sans tracking-wide">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
