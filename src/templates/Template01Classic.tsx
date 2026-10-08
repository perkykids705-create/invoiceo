import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template01Classic: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#30364F';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="p-8 sm:p-10 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Centered Logo (if logoPosition === 'center') */}
        {logoPos === 'center' && invoice.business.logo && (
          <div className="mb-5 pb-2 border-b border-slate-100 flex justify-center">
            <TemplateLogo invoice={invoice} positionOverride="center" />
          </div>
        )}

        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
          <div className="space-y-2 max-w-[55%]">
            {logoPos === 'left' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="left" className="mb-3" />
            )}
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {invoice.business.name || 'Your Business Name'}
            </h1>
            <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
              {invoice.business.address}
            </div>
            <div className="text-xs text-slate-600 space-y-0.5 pt-1">
              {invoice.business.email && <div>Email: {invoice.business.email}</div>}
              {invoice.business.phone && <div>Phone: {invoice.business.phone}</div>}
              {invoice.business.taxNumber && <div>Tax ID: {invoice.business.taxNumber}</div>}
              {invoice.business.registrationNumber && <div>Reg No: {invoice.business.registrationNumber}</div>}
            </div>
          </div>

          <div className="text-right">
            {logoPos === 'right' && invoice.business.logo && (
              <TemplateLogo invoice={invoice} positionOverride="right" className="mb-3" />
            )}
            <h2
              className="text-3xl font-extrabold tracking-tight uppercase"
              style={{ color: primaryColor }}
            >
              INVOICE
            </h2>
            <div className="mt-2 text-sm font-semibold text-slate-700">
              # {invoice.invoiceNumber || 'INV-0001'}
            </div>
            <div className="mt-4 text-xs text-slate-600 space-y-1">
              <div>
                <span className="text-slate-400">Date: </span>
                <span className="font-medium text-slate-800">
                  {formatDateString(invoice.issueDate, dateFormat)}
                </span>
              </div>
              <div>
                <span className="text-slate-400">Due Date: </span>
                <span className="font-medium text-slate-800">
                  {formatDateString(invoice.dueDate, dateFormat)}
                </span>
              </div>
              {invoice.paymentTerms && (
                <div>
                  <span className="text-slate-400">Terms: </span>
                  <span className="font-medium text-slate-800">{invoice.paymentTerms}</span>
                </div>
              )}
              {invoice.referenceNumber && (
                <div>
                  <span className="text-slate-400">PO / Ref: </span>
                  <span className="font-medium text-slate-800">{invoice.referenceNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bill To Info */}
        <div className="mb-6 p-4 rounded-[4px] bg-slate-50 border border-slate-100 flex justify-between items-start">
          <div>
            <span
              className="text-[11px] font-bold uppercase tracking-wider block mb-1"
              style={{ color: primaryColor }}
            >
              Billed To
            </span>
            <div className="text-sm font-bold text-slate-900">
              {invoice.customer.name || 'Client Name'}
            </div>
            {invoice.customer.company && (
              <div className="text-xs font-medium text-slate-700 mt-0.5">
                {invoice.customer.company}
              </div>
            )}
            <div className="text-xs text-slate-600 whitespace-pre-line mt-1">
              {invoice.customer.address}
            </div>
          </div>
          <div className="text-right text-xs text-slate-600 space-y-0.5">
            {invoice.customer.email && <div>{invoice.customer.email}</div>}
            {invoice.customer.phone && <div>{invoice.customer.phone}</div>}
            {invoice.customer.taxNumber && (
              <div className="text-slate-500">Tax ID: {invoice.customer.taxNumber}</div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b-2"
                style={{ borderColor: primaryColor }}
              >
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3 text-center w-20">Qty</th>
                <th className="py-2.5 px-3 text-right w-28">Rate</th>
                {invoice.customization?.showItemDiscount && (
                  <th className="py-2.5 px-3 text-right w-20">Disc %</th>
                )}
                {invoice.customization?.showItemTax && (
                  <th className="py-2.5 px-3 text-right w-20">Tax %</th>
                )}
                <th className="py-2.5 px-3 text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {invoice.items.map((item, idx) => {
                const qty = Number(item.quantity) || 0;
                const rate = Number(item.rate) || 0;
                const lineTotal = qty * rate;
                return (
                  <tr key={item.id || idx} className={idx % 2 === 1 ? 'bg-slate-50/50' : ''}>
                    <td className="py-3 px-3 font-medium text-slate-800 whitespace-pre-line">
                      {item.description || 'Item description'}
                    </td>
                    <td className="py-3 px-3 text-center">{qty}</td>
                    <td className="py-3 px-3 text-right">
                      {formatCurrency(rate, curr, numFormat)}
                    </td>
                    {invoice.customization?.showItemDiscount && (
                      <td className="py-3 px-3 text-right">{item.discount || 0}%</td>
                    )}
                    {invoice.customization?.showItemTax && (
                      <td className="py-3 px-3 text-right">{item.tax || 0}%</td>
                    )}
                    <td className="py-3 px-3 text-right font-semibold text-slate-900">
                      {formatCurrency(lineTotal, curr, numFormat)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals & Notes Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 pt-2">
          {/* Notes & Bank Details */}
          <div className="w-full sm:w-1/2 space-y-4 text-xs">
            {invoice.notes && (
              <div>
                <span
                  className="font-bold uppercase tracking-wider text-[10px] block mb-1"
                  style={{ color: primaryColor }}
                >
                  Notes
                </span>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                  {invoice.notes}
                </p>
              </div>
            )}
            {invoice.paymentInstructions && (
              <div className="p-3 rounded-[4px] bg-slate-50 border border-slate-200">
                <span
                  className="font-bold uppercase tracking-wider text-[10px] block mb-1 text-slate-700"
                >
                  Payment Instructions
                </span>
                <div className="text-slate-600 whitespace-pre-line font-mono text-[11px] leading-relaxed">
                  {invoice.paymentInstructions}
                </div>
              </div>
            )}
          </div>

          {/* Totals Card */}
          <div className="w-full sm:w-5/12 space-y-2 text-xs">
            <div className="flex justify-between py-1 text-slate-600">
              <span>Subtotal:</span>
              <span className="font-medium text-slate-800">
                {formatCurrency(totals.subtotal, curr, numFormat)}
              </span>
            </div>

            {totals.totalDiscount > 0 && (
              <div className="flex justify-between py-1 text-emerald-600">
                <span>{invoice.discountLabel || 'Discount'}:</span>
                <span>-{formatCurrency(totals.totalDiscount, curr, numFormat)}</span>
              </div>
            )}

            {totals.totalTax > 0 && (
              <div className="flex justify-between py-1 text-slate-600">
                <span>
                  {invoice.taxLabel || 'Tax'} ({invoice.taxRate}%):
                </span>
                <span>{formatCurrency(totals.totalTax, curr, numFormat)}</span>
              </div>
            )}

            {totals.shipping > 0 && (
              <div className="flex justify-between py-1 text-slate-600">
                <span>Shipping / Fees:</span>
                <span>{formatCurrency(totals.shipping, curr, numFormat)}</span>
              </div>
            )}

            <div
              className="flex justify-between py-2 border-t-2 text-sm font-bold text-slate-900 mt-2"
              style={{ borderColor: primaryColor }}
            >
              <span>Total:</span>
              <span style={{ color: primaryColor }}>
                {formatCurrency(totals.grandTotal, curr, numFormat)}
              </span>
            </div>

            {totals.amountPaid > 0 && (
              <>
                <div className="flex justify-between py-1 text-slate-600">
                  <span>Amount Paid:</span>
                  <span>{formatCurrency(totals.amountPaid, curr, numFormat)}</span>
                </div>
                <div className="flex justify-between py-1.5 font-bold text-slate-900 border-t border-slate-200">
                  <span>Balance Due:</span>
                  <span>{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer text */}
      {invoice.footerText && (
        <div className="mt-10 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
