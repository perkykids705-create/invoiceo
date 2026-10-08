import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template08ModernBusiness: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#0891b2';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="p-8 sm:p-10 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Centered Logo (if logoPosition === 'center') */}
        {logoPos === 'center' && invoice.business.logo && (
          <div className="mb-6 pb-2 border-b border-slate-100 flex justify-center">
            <TemplateLogo invoice={invoice} positionOverride="center" imgClassName="max-h-14 max-w-[160px] object-contain rounded-[4px]" />
          </div>
        )}

        {/* Header with modern badge */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-start gap-4">
            {logoPos === 'left' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="left" imgClassName="max-h-14 max-w-[160px] object-contain rounded-[4px]" />
            )}
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                {invoice.business.name || 'Modern Business Co.'}
              </h1>
              <div className="text-xs text-slate-500 whitespace-pre-line mt-1">{invoice.business.address}</div>
              <div className="text-xs text-slate-500 mt-1">{invoice.business.email}</div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            {logoPos === 'right' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="right" className="mb-2" imgClassName="max-h-14 max-w-[160px] object-contain rounded-[4px]" />
            )}
            <div
              className="inline-flex items-center px-3 py-1 rounded-[4px] text-xs font-bold text-white mb-2"
              style={{ backgroundColor: primaryColor }}
            >
              INVOICE
            </div>
            <div className="text-lg font-bold text-slate-900">{invoice.invoiceNumber || 'INV-0001'}</div>
            <div className="text-xs text-slate-500 mt-1">
              Issued: {formatDateString(invoice.issueDate, dateFormat)}
            </div>
          </div>
        </div>

        {/* 2 Modern Rounded Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-[4px] bg-slate-50/80 border border-slate-200">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
              Client Details
            </span>
            <div className="font-bold text-sm text-slate-900">{invoice.customer.name}</div>
            {invoice.customer.company && (
              <div className="text-xs font-medium text-slate-700">{invoice.customer.company}</div>
            )}
            <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
            {invoice.customer.taxNumber && (
              <div className="text-xs text-slate-500 mt-2">VAT: {invoice.customer.taxNumber}</div>
            )}
          </div>

          <div className="p-4 rounded-[4px] bg-slate-50/80 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Invoice Details
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Due Date:</span>
                  <span className="font-semibold text-slate-800">{formatDateString(invoice.dueDate, dateFormat)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Payment Terms:</span>
                  <span className="font-semibold text-slate-800">{invoice.paymentTerms || 'Net 30'}</span>
                </div>
                {invoice.referenceNumber && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Reference / PO:</span>
                    <span className="font-semibold text-slate-800">{invoice.referenceNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modern Clean Table */}
        <table className="w-full text-left mb-8 border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider font-bold">
              <th className="py-2.5 px-3 rounded-l-[4px]">Services & Items</th>
              <th className="py-2.5 px-3 text-center w-20">Quantity</th>
              <th className="py-2.5 px-3 text-right w-28">Rate</th>
              <th className="py-2.5 px-3 text-right w-32 rounded-r-[4px]">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
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

        {/* Modern Totals & Notes */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
          <div className="w-full sm:w-1/2 space-y-4 text-xs">
            {invoice.notes && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px]">
                <span className="font-bold text-[10px] uppercase text-slate-400 block mb-1">Notes:</span>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">{invoice.notes}</p>
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px]">
                <span className="font-bold text-[10px] uppercase text-slate-400 block mb-1">
                  Payment Details:
                </span>
                <div className="text-slate-600 font-mono text-[11px] whitespace-pre-line">
                  {invoice.paymentInstructions}
                </div>
              </div>
            )}
          </div>

          <div className="w-full sm:w-5/12 bg-slate-50 p-4 border border-slate-200 rounded-[4px] text-xs space-y-2">
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
            <div
              className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t-2"
              style={{ borderColor: primaryColor }}
            >
              <span>Amount Due:</span>
              <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
            {totals.amountPaid > 0 && (
              <div className="flex justify-between font-bold text-slate-700 pt-1 border-t border-slate-200">
                <span>Balance Remaining:</span>
                <span>{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
              </div>
            )}
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
