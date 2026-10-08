import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';

export const Template07Compact: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#475569';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;

  return (
    <div className="p-6 sm:p-8 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between text-xs">
      <div>
        {/* Compact Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-300 mb-4">
          <div className="flex items-center gap-3">
            {invoice.business.logo && (
              <img
                src={invoice.business.logo}
                alt="Logo"
                className="max-h-10 max-w-[120px] object-contain"
              />
            )}
            <div>
              <div className="font-bold text-sm text-slate-900 leading-tight">
                {invoice.business.name || 'Company Name'}
              </div>
              <div className="text-[11px] text-slate-500">{invoice.business.email} {invoice.business.phone && `| ${invoice.business.phone}`}</div>
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono font-bold text-xs uppercase px-2 py-0.5 bg-slate-100 rounded text-slate-800">
              INVOICE #{invoice.invoiceNumber || 'INV-0001'}
            </span>
            <div className="text-[11px] text-slate-500 mt-1">
              Date: {formatDateString(invoice.issueDate, dateFormat)} | Due: {formatDateString(invoice.dueDate, dateFormat)}
            </div>
          </div>
        </div>

        {/* Compact 3-Column Info Bar */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-[3px] mb-4 text-[11px]">
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">From</span>
            <div className="font-semibold text-slate-800">{invoice.business.name}</div>
            <div className="text-slate-500 truncate">{invoice.business.address?.replace('\n', ', ')}</div>
            {invoice.business.taxNumber && <div className="text-slate-500">Tax: {invoice.business.taxNumber}</div>}
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Bill To</span>
            <div className="font-semibold text-slate-800">{invoice.customer.name}</div>
            <div className="text-slate-600">{invoice.customer.company}</div>
            <div className="text-slate-500 truncate">{invoice.customer.email}</div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Payment Details</span>
            <div>Terms: <strong className="text-slate-800">{invoice.paymentTerms || 'Net 15'}</strong></div>
            {invoice.referenceNumber && <div>Ref: {invoice.referenceNumber}</div>}
            <div className="truncate text-slate-500">{invoice.paymentInstructions?.split('\n')[0]}</div>
          </div>
        </div>

        {/* Dense Table */}
        <table className="w-full text-left mb-4 border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-[10px] uppercase font-bold border-b border-slate-200">
              <th className="py-1.5 px-2">#</th>
              <th className="py-1.5 px-2">Description</th>
              <th className="py-1.5 px-2 text-center w-16">Qty</th>
              <th className="py-1.5 px-2 text-right w-24">Rate</th>
              <th className="py-1.5 px-2 text-right w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[11px]">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="py-1.5 px-2 text-slate-400 w-8">{idx + 1}</td>
                <td className="py-1.5 px-2 text-slate-800 whitespace-pre-line font-medium">{item.description}</td>
                <td className="py-1.5 px-2 text-center text-slate-600">{item.quantity}</td>
                <td className="py-1.5 px-2 text-right text-slate-600">{formatCurrency(item.rate, curr, numFormat)}</td>
                <td className="py-1.5 px-2 text-right font-semibold text-slate-900">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Compact Totals & Notes */}
        <div className="flex justify-between items-start gap-4">
          <div className="w-1/2 space-y-2 text-[11px]">
            {invoice.notes && (
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-[2px]">
                <strong className="block text-[10px] uppercase text-slate-500">Notes:</strong>
                <span className="text-slate-600">{invoice.notes}</span>
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="p-2 bg-slate-50 border border-slate-200 rounded-[2px] font-mono text-[10px] text-slate-600 whitespace-pre-line">
                {invoice.paymentInstructions}
              </div>
            )}
          </div>

          <div className="w-5/12 bg-slate-50 p-3 border border-slate-200 rounded-[2px] space-y-1.5 text-[11px]">
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
            <div className="flex justify-between font-bold text-xs pt-1.5 border-t border-slate-300 text-slate-900">
              <span>Total:</span>
              <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
            {totals.amountPaid > 0 && (
              <div className="flex justify-between font-semibold pt-1 border-t border-slate-200 text-slate-800">
                <span>Balance Due:</span>
                <span>{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-4 pt-2 border-t border-slate-200 text-center text-[10px] text-slate-400">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
