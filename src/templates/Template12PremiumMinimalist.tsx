import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template12PremiumMinimalist: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#18181b';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="p-8 sm:p-12 text-zinc-900 bg-white min-h-[1050px] flex flex-col justify-between tracking-tight">
      <div>
        {/* Top Centered Logo (if logoPosition === 'center') */}
        {logoPos === 'center' && invoice.business.logo && (
          <div className="mb-8 pb-3 border-b border-zinc-100 flex justify-center">
            <TemplateLogo invoice={invoice} positionOverride="center" imgClassName="max-h-12 max-w-[160px] object-contain" />
          </div>
        )}

        {/* Top Stark Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            {logoPos === 'left' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="left" className="mb-3" imgClassName="max-h-12 max-w-[160px] object-contain" />
            )}
            <span className="text-[10px] tracking-widest uppercase font-mono text-zinc-400 block mb-2">
              TAX INVOICE
            </span>
            <div className="text-3xl font-black text-zinc-950">
              {invoice.invoiceNumber || 'INV-0001'}
            </div>
            <div className="mt-4 text-xs text-zinc-500 font-mono space-y-0.5">
              <div>ISSUED / {formatDateString(invoice.issueDate, dateFormat)}</div>
              <div>DUE / {formatDateString(invoice.dueDate, dateFormat)}</div>
            </div>
          </div>

          <div className="text-right">
            {logoPos === 'right' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="right" className="mb-2" imgClassName="max-h-12 max-w-[160px] object-contain" />
            )}
            <div className="text-base font-bold text-zinc-900">{invoice.business.name || 'Company Name'}</div>
            <div className="text-xs text-zinc-500 whitespace-pre-line mt-1">{invoice.business.address}</div>
            <div className="text-xs text-zinc-400 mt-1">{invoice.business.email}</div>
          </div>
        </div>

        {/* Client block */}
        <div className="mb-12 pb-6 border-b border-zinc-900 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-1">
              CLIENT
            </span>
            <div className="text-base font-bold text-zinc-900">{invoice.customer.name}</div>
            {invoice.customer.company && <div className="text-xs text-zinc-600">{invoice.customer.company}</div>}
            <div className="text-xs text-zinc-500 whitespace-pre-line mt-1">{invoice.customer.address}</div>
          </div>

          <div className="text-right text-xs font-mono text-zinc-500 space-y-0.5">
            {invoice.customer.email && <div>{invoice.customer.email}</div>}
            {invoice.customer.taxNumber && <div>TAX ID: {invoice.customer.taxNumber}</div>}
            {invoice.referenceNumber && <div>REF: {invoice.referenceNumber}</div>}
          </div>
        </div>

        {/* Minimalist High-contrast Table */}
        <table className="w-full text-left mb-12 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              <th className="py-2.5 font-normal">ITEM & DESCRIPTION</th>
              <th className="py-2.5 font-normal text-center w-16">QTY</th>
              <th className="py-2.5 font-normal text-right w-24">RATE</th>
              <th className="py-2.5 font-normal text-right w-32">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-4 pr-4 font-normal text-zinc-900 whitespace-pre-line">
                  {item.description}
                </td>
                <td className="py-4 text-center text-zinc-500 font-mono">{item.quantity}</td>
                <td className="py-4 text-right text-zinc-500 font-mono">{formatCurrency(item.rate, curr, numFormat)}</td>
                <td className="py-4 text-right font-bold text-zinc-950 font-mono">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Premium Totals & Notes */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-12">
          <div className="w-full sm:w-1/2 space-y-4 text-xs">
            {invoice.notes && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-1">
                  NOTES
                </span>
                <p className="text-zinc-600 whitespace-pre-line leading-relaxed">{invoice.notes}</p>
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-[2px] font-mono text-[11px] text-zinc-700 whitespace-pre-line">
                <span className="text-[10px] uppercase text-zinc-400 block mb-1">PAYMENT ADVICE</span>
                {invoice.paymentInstructions}
              </div>
            )}
          </div>

          <div className="w-full sm:w-5/12 text-xs font-mono space-y-2">
            <div className="flex justify-between text-zinc-500">
              <span>SUBTOTAL</span>
              <span className="text-zinc-900">{formatCurrency(totals.subtotal, curr, numFormat)}</span>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>DISCOUNT</span>
                <span>-{formatCurrency(totals.totalDiscount, curr, numFormat)}</span>
              </div>
            )}
            {totals.totalTax > 0 && (
              <div className="flex justify-between text-zinc-500">
                <span>TAX ({invoice.taxRate}%)</span>
                <span className="text-zinc-900">{formatCurrency(totals.totalTax, curr, numFormat)}</span>
              </div>
            )}
            <div
              className="p-4 mt-4 text-white rounded-[2px] flex justify-between items-center text-sm font-bold"
              style={{ backgroundColor: primaryColor }}
            >
              <span>TOTAL DUE</span>
              <span>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
            {totals.amountPaid > 0 && (
              <div className="flex justify-between text-zinc-600 pt-2">
                <span>BALANCE DUE</span>
                <span className="font-bold text-zinc-900">{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-12 pt-4 border-t border-zinc-100 text-center font-mono text-[10px] text-zinc-400">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
