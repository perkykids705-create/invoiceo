import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';

export const Template09TopAccent: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#16a34a';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;

  return (
    <div className="bg-white text-slate-800 min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Accent Stripe */}
        <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />

        <div className="p-8 sm:p-10">
          {/* Header Row */}
          <div className="flex justify-between items-start pb-8 border-b border-slate-200 mb-8">
            <div className="space-y-2">
              {invoice.business.logo && (
                <img
                  src={invoice.business.logo}
                  alt="Logo"
                  className="max-h-14 max-w-[180px] object-contain mb-2"
                />
              )}
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                {invoice.business.name || 'Your Company Name'}
              </h1>
              <div className="text-xs text-slate-600 whitespace-pre-line">{invoice.business.address}</div>
              <div className="text-xs text-slate-500 pt-1">
                {invoice.business.email} {invoice.business.phone && `• ${invoice.business.phone}`}
              </div>
            </div>

            {/* Right Top Accent Callout */}
            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-1">
                Invoice Total
              </span>
              <div className="text-3xl font-black tracking-tight" style={{ color: primaryColor }}>
                {formatCurrency(totals.grandTotal, curr, numFormat)}
              </div>
              <div className="text-xs font-mono font-bold text-slate-800 mt-2">
                # {invoice.invoiceNumber || 'INV-0001'}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Due: {formatDateString(invoice.dueDate, dateFormat)}
              </div>
            </div>
          </div>

          {/* Client & Metadata row */}
          <div className="grid grid-cols-3 gap-6 mb-8 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Invoice To
              </span>
              <div className="font-bold text-slate-900 text-sm">{invoice.customer.name}</div>
              {invoice.customer.company && <div className="text-slate-700">{invoice.customer.company}</div>}
              <div className="text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Date & Terms
              </span>
              <div>Issued: <strong className="text-slate-800">{formatDateString(invoice.issueDate, dateFormat)}</strong></div>
              <div>Due: <strong className="text-slate-800">{formatDateString(invoice.dueDate, dateFormat)}</strong></div>
              <div>Terms: <strong className="text-slate-800">{invoice.paymentTerms || 'Net 14'}</strong></div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Reference
              </span>
              <div>PO / Ref: <strong className="text-slate-800">{invoice.referenceNumber || invoice.poNumber || 'N/A'}</strong></div>
              {invoice.customer.taxNumber && <div>Client Tax: <strong className="text-slate-800">{invoice.customer.taxNumber}</strong></div>}
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left mb-8 border-collapse">
            <thead>
              <tr className="border-b-2 text-[11px] font-bold uppercase tracking-wider text-slate-700" style={{ borderColor: primaryColor }}>
                <th className="py-2.5 px-2">Line Item</th>
                <th className="py-2.5 px-2 text-center w-20">Quantity</th>
                <th className="py-2.5 px-2 text-right w-28">Unit Rate</th>
                <th className="py-2.5 px-2 text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {invoice.items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-3 px-2 font-medium text-slate-800 whitespace-pre-line">{item.description}</td>
                  <td className="py-3 px-2 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{formatCurrency(item.rate, curr, numFormat)}</td>
                  <td className="py-3 px-2 text-right font-bold text-slate-900">
                    {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Totals */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
            <div className="w-full sm:w-1/2 space-y-3 text-xs">
              {invoice.notes && (
                <div>
                  <span className="font-bold text-[10px] uppercase text-slate-400 block mb-1">Notes:</span>
                  <p className="text-slate-600 whitespace-pre-line">{invoice.notes}</p>
                </div>
              )}
              {invoice.paymentInstructions && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[3px] font-mono text-[11px] text-slate-600 whitespace-pre-line">
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
                  <span>Tax:</span>
                  <span>{formatCurrency(totals.totalTax, curr, numFormat)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t-2" style={{ borderColor: primaryColor }}>
                <span>Total Due:</span>
                <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="p-6 text-center text-[10px] text-slate-400 border-t border-slate-100">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
