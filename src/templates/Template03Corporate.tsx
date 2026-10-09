import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template03Corporate: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#1e3a8a';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="p-8 sm:p-10 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Centered Logo (if logoPosition === 'center') */}
        {logoPos === 'center' && invoice.business.logo && (
          <div className="mb-5 pb-3 border-b border-slate-100 flex justify-center">
            <TemplateLogo invoice={invoice} positionOverride="center" imgClassName="max-h-14 max-w-[160px] object-contain" />
          </div>
        )}

        {/* Corporate Top Bar */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b-4" style={{ borderColor: primaryColor }}>
          <div className="flex items-center gap-4">
            {logoPos === 'left' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="left" imgClassName="max-h-14 max-w-[160px] object-contain" />
            )}
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-900">
                {invoice.business.name || 'Corporate Entity'}
              </div>
              <div className="text-xs text-slate-500">{invoice.business.website || invoice.business.email}</div>
            </div>
          </div>

          <div className="text-right flex flex-col items-end">
            {logoPos === 'right' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="right" className="mb-2" imgClassName="max-h-14 max-w-[160px] object-contain" />
            )}
            <span
              className="px-3 py-1 text-xs font-bold text-white rounded-[2px] tracking-wider uppercase inline-block mb-1"
              style={{ backgroundColor: primaryColor }}
            >
              Tax Invoice
            </span>
            <div className="text-sm font-bold text-slate-800">
              Ref: {invoice.invoiceNumber || 'INV-0001'}
            </div>
          </div>
        </div>

        {/* Corporate 2-Box Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-[2px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              From / Service Provider
            </div>
            <div className="text-xs font-semibold text-slate-900">{invoice.business.name}</div>
            <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.business.address}</div>
            <div className="text-xs text-slate-500 mt-2 space-y-0.5">
              {invoice.business.taxNumber && <div>Tax ID: <span className="font-medium text-slate-700">{invoice.business.taxNumber}</span></div>}
              {invoice.business.registrationNumber && <div>Reg No: <span className="font-medium text-slate-700">{invoice.business.registrationNumber}</span></div>}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-[2px]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Client / Billed To
            </div>
            <div className="text-xs font-semibold text-slate-900">{invoice.customer.name}</div>
            {invoice.customer.company && <div className="text-xs text-slate-700 font-medium">{invoice.customer.company}</div>}
            <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
            <div className="text-xs text-slate-500 mt-2 space-y-0.5">
              {invoice.customer.email && <div>Email: <span className="font-medium text-slate-700">{invoice.customer.email}</span></div>}
              {invoice.customer.taxNumber && <div>Client Tax ID: <span className="font-medium text-slate-700">{invoice.customer.taxNumber}</span></div>}
            </div>
          </div>
        </div>

        {/* Schedule & Timing Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-slate-100 rounded-[2px] text-xs text-slate-700 mb-6">
          <div><span className="text-slate-500">Invoice Date:</span> <strong className="text-slate-900">{formatDateString(invoice.issueDate, dateFormat)}</strong></div>
          <div><span className="text-slate-500">Payment Due:</span> <strong className="text-slate-900">{formatDateString(invoice.dueDate, dateFormat)}</strong></div>
          <div><span className="text-slate-500">Terms:</span> <strong className="text-slate-900">{invoice.paymentTerms || 'Net 30'}</strong></div>
          {invoice.poNumber && <div><span className="text-slate-500">PO:</span> <strong className="text-slate-900">{invoice.poNumber}</strong></div>}
        </div>

        {/* Table */}
        <table className="w-full text-left mb-6 border border-slate-200">
          <thead>
            <tr className="text-white text-[11px] uppercase tracking-wider" style={{ backgroundColor: primaryColor }}>
              <th className="py-2.5 px-3">Item & Description</th>
              <th className="py-2.5 px-3 text-center w-20">Quantity</th>
              <th className="py-2.5 px-3 text-right w-28">Unit Price</th>
              <th className="py-2.5 px-3 text-right w-32">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="py-3 px-3 font-medium text-slate-900 whitespace-pre-line">{item.description}</td>
                <td className="py-3 px-3 text-center">{item.quantity}</td>
                <td className="py-3 px-3 text-right">{formatCurrency(item.rate, curr, numFormat)}</td>
                <td className="py-3 px-3 text-right font-bold text-slate-900">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals & Notes */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
          <div className="w-full sm:w-1/2 space-y-4 text-xs">
            {invoice.notes && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[2px]">
                <div className="font-bold text-slate-800 text-[11px] mb-1">Terms & Conditions</div>
                <div className="text-slate-600 whitespace-pre-line leading-relaxed">{invoice.notes}</div>
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-[2px]">
                <div className="font-bold text-slate-800 text-[11px] mb-1">Remittance Instructions</div>
                <div className="text-slate-600 font-mono text-[11px] whitespace-pre-line">{invoice.paymentInstructions}</div>
              </div>
            )}
          </div>

          <div className="w-full sm:w-5/12 bg-slate-50 p-4 border border-slate-200 rounded-[2px] text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-medium text-slate-900">{formatCurrency(totals.subtotal, curr, numFormat)}</span>
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
            {totals.shipping > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span>{formatCurrency(totals.shipping, curr, numFormat)}</span>
              </div>
            )}
            <div className="border-t-2 border-slate-900 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
              <span>Total Invoice Amount:</span>
              <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
            {totals.amountPaid > 0 && (
              <div className="border-t border-slate-200 pt-1 flex justify-between font-bold text-slate-900">
                <span>Balance Due:</span>
                <span>{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-8 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-500">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
