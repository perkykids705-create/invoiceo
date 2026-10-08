import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template02Minimal: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#0f172a';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="p-8 sm:p-12 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between font-sans">
      <div>
        {/* Top Centered Logo (if logoPosition === 'center') */}
        {logoPos === 'center' && invoice.business.logo && (
          <div className="mb-8 pb-3 border-b border-slate-100 flex justify-center">
            <TemplateLogo invoice={invoice} positionOverride="center" imgClassName="max-h-12 max-w-[180px] object-contain" />
          </div>
        )}

        {/* Top Header - Ultra Minimalist */}
        <div className="flex justify-between items-start mb-12">
          <div>
            {logoPos === 'left' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="left" className="mb-3" imgClassName="max-h-12 max-w-[180px] object-contain" />
            )}
            <h1 className="text-lg font-medium tracking-tight text-slate-900">
              {invoice.business.name || 'Business Name'}
            </h1>
            <p className="text-xs text-slate-500 whitespace-pre-line mt-1">
              {invoice.business.address}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {invoice.business.email} {invoice.business.phone && `• ${invoice.business.phone}`}
            </p>
          </div>

          <div className="text-right">
            {logoPos === 'right' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="right" className="mb-3" imgClassName="max-h-12 max-w-[180px] object-contain" />
            )}
            <span className="text-xs tracking-widest text-slate-400 uppercase font-mono block">
              INVOICE
            </span>
            <div className="text-2xl font-light text-slate-900 tracking-tight mt-1">
              {invoice.invoiceNumber || 'INV-0001'}
            </div>
            <div className="mt-3 text-xs text-slate-500 space-y-0.5">
              <div>Issued: {formatDateString(invoice.issueDate, dateFormat)}</div>
              <div>Due: {formatDateString(invoice.dueDate, dateFormat)}</div>
            </div>
          </div>
        </div>

        {/* Minimal Client Info */}
        <div className="mb-10 pb-6 border-b border-slate-100 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1">
              Invoiced To
            </span>
            <div className="text-base font-medium text-slate-900">
              {invoice.customer.name || 'Client Name'}
            </div>
            {invoice.customer.company && (
              <div className="text-xs text-slate-600">{invoice.customer.company}</div>
            )}
            <div className="text-xs text-slate-500 whitespace-pre-line mt-1">
              {invoice.customer.address}
            </div>
          </div>

          <div className="text-right text-xs text-slate-500">
            {invoice.customer.email && <div>{invoice.customer.email}</div>}
            {invoice.customer.taxNumber && <div>Tax ID: {invoice.customer.taxNumber}</div>}
            {invoice.referenceNumber && <div>Ref: {invoice.referenceNumber}</div>}
          </div>
        </div>

        {/* Items Table - Clean Lines without heavy headers */}
        <table className="w-full text-left mb-10 border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400">
              <th className="py-2.5 font-normal">Description</th>
              <th className="py-2.5 font-normal text-center w-16">Qty</th>
              <th className="py-2.5 font-normal text-right w-28">Rate</th>
              <th className="py-2.5 font-normal text-right w-32">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs text-slate-700">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-3 font-normal text-slate-800 whitespace-pre-line pr-4">
                  {item.description || 'Description'}
                </td>
                <td className="py-3 text-center text-slate-500">{item.quantity}</td>
                <td className="py-3 text-right text-slate-500">
                  {formatCurrency(item.rate, curr, numFormat)}
                </td>
                <td className="py-3 text-right font-medium text-slate-900">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Minimal Totals & Info */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 border-t border-slate-200 pt-6">
          <div className="w-full sm:w-1/2 text-xs space-y-4">
            {invoice.paymentInstructions && (
              <div>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 block mb-1">
                  Payment Details
                </span>
                <div className="text-slate-600 whitespace-pre-line text-xs font-mono">
                  {invoice.paymentInstructions}
                </div>
              </div>
            )}
            {invoice.notes && (
              <p className="text-slate-500 italic text-xs leading-relaxed">{invoice.notes}</p>
            )}
          </div>

          <div className="w-full sm:w-5/12 text-xs space-y-2">
            <div className="flex justify-between text-slate-500 py-0.5">
              <span>Subtotal</span>
              <span className="text-slate-800">
                {formatCurrency(totals.subtotal, curr, numFormat)}
              </span>
            </div>

            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 py-0.5">
                <span>{invoice.discountLabel || 'Discount'}</span>
                <span>-{formatCurrency(totals.totalDiscount, curr, numFormat)}</span>
              </div>
            )}

            {totals.totalTax > 0 && (
              <div className="flex justify-between text-slate-500 py-0.5">
                <span>{invoice.taxLabel || 'Tax'} ({invoice.taxRate}%)</span>
                <span className="text-slate-800">{formatCurrency(totals.totalTax, curr, numFormat)}</span>
              </div>
            )}

            {totals.shipping > 0 && (
              <div className="flex justify-between text-slate-500 py-0.5">
                <span>Shipping</span>
                <span>{formatCurrency(totals.shipping, curr, numFormat)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-semibold text-slate-900 pt-3 border-t border-slate-200">
              <span>Total Due</span>
              <span style={{ color: primaryColor }}>
                {formatCurrency(totals.grandTotal, curr, numFormat)}
              </span>
            </div>

            {totals.amountPaid > 0 && (
              <div className="flex justify-between text-slate-500 pt-1 text-xs">
                <span>Amount Paid</span>
                <span>{formatCurrency(totals.amountPaid, curr, numFormat)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-8 pt-4 text-center text-[10px] text-slate-400 border-t border-slate-50">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
