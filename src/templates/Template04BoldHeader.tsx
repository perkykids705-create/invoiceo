import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template04BoldHeader: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#4f46e5';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="bg-white text-slate-800 min-h-[1050px] flex flex-col justify-between overflow-hidden">
      <div>
        {/* Full-width Bold Header Block */}
        <div
          className="p-8 sm:p-10 text-white"
          style={{ backgroundColor: primaryColor }}
        >
          {/* Top Centered Logo (if logoPosition === 'center') */}
          {logoPos === 'center' && invoice.business.logo && (
            <div className="mb-6 flex justify-center">
              <div className="bg-white p-2 rounded-[3px] shadow-sm inline-block">
                <TemplateLogo invoice={invoice} positionOverride="center" imgClassName="max-h-12 max-w-[150px] object-contain" />
              </div>
            </div>
          )}

          <div className="flex justify-between items-start">
            <div>
              {logoPos === 'left' && invoice.business.logo && (
                <div className="bg-white p-2 rounded-[3px] inline-block mb-3 shadow-sm">
                  <TemplateLogo invoice={invoice} positionOverride="left" imgClassName="max-h-12 max-w-[150px] object-contain" />
                </div>
              )}
              <span className="text-xs uppercase tracking-widest opacity-80 font-semibold block mb-1">
                INVOICE
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {invoice.invoiceNumber || 'INV-0001'}
              </h1>
              <div className="flex gap-4 mt-3 text-xs opacity-90">
                <div>Issue Date: {formatDateString(invoice.issueDate, dateFormat)}</div>
                <div>Due Date: {formatDateString(invoice.dueDate, dateFormat)}</div>
              </div>
            </div>

            <div className="text-right max-w-[50%]">
              {logoPos === 'right' && invoice.business.logo ? (
                <div className="bg-white p-2 rounded-[3px] inline-block mb-2 shadow-sm">
                  <TemplateLogo invoice={invoice} positionOverride="right" imgClassName="max-h-12 max-w-[150px] object-contain" />
                </div>
              ) : null}
              <div className="text-lg font-bold">{invoice.business.name || 'Company Name'}</div>
              <div className="text-xs opacity-80 whitespace-pre-line mt-0.5">{invoice.business.address}</div>
              <div className="text-xs opacity-80 mt-1">{invoice.business.email}</div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-10 pt-6">
          {/* Client Details Row */}
          <div className="mb-8 flex justify-between items-start pb-4 border-b border-slate-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Invoice Recipient
              </span>
              <div className="text-base font-bold text-slate-900">{invoice.customer.name}</div>
              {invoice.customer.company && (
                <div className="text-xs font-semibold text-slate-700">{invoice.customer.company}</div>
              )}
              <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
            </div>

            <div className="text-right text-xs text-slate-600 space-y-1">
              {invoice.customer.email && <div>Email: {invoice.customer.email}</div>}
              {invoice.customer.taxNumber && <div>VAT / Tax: {invoice.customer.taxNumber}</div>}
              {invoice.paymentTerms && <div>Terms: {invoice.paymentTerms}</div>}
              {invoice.referenceNumber && <div>Ref: {invoice.referenceNumber}</div>}
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-left mb-8 border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-[11px] uppercase tracking-wider font-bold">
                <th className="py-2.5 px-3 rounded-l-[3px]">Item Description</th>
                <th className="py-2.5 px-3 text-center w-20">Qty</th>
                <th className="py-2.5 px-3 text-right w-28">Price</th>
                <th className="py-2.5 px-3 text-right w-32 rounded-r-[3px]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {invoice.items.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-3.5 px-3 font-medium text-slate-800 whitespace-pre-line">
                    {item.description}
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate-600">{item.quantity}</td>
                  <td className="py-3.5 px-3 text-right text-slate-600">
                    {formatCurrency(item.rate, curr, numFormat)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                    {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Totals & Notes */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
            <div className="w-full sm:w-1/2 space-y-4 text-xs">
              {invoice.notes && (
                <div>
                  <span className="font-bold uppercase tracking-wider text-[11px] text-slate-700 block mb-1">
                    Notes
                  </span>
                  <div className="text-slate-600 whitespace-pre-line">{invoice.notes}</div>
                </div>
              )}
              {invoice.paymentInstructions && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[3px]">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-slate-700 block mb-1">
                    Wire / Transfer Instructions
                  </span>
                  <div className="text-slate-600 font-mono text-[11px] whitespace-pre-line">
                    {invoice.paymentInstructions}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full sm:w-5/12 bg-slate-50 p-4 rounded-[4px] border border-slate-200 text-xs space-y-2">
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
              {totals.shipping > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Shipping:</span>
                  <span>{formatCurrency(totals.shipping, curr, numFormat)}</span>
                </div>
              )}
              <div
                className="pt-3 border-t-2 flex justify-between text-base font-extrabold"
                style={{ borderColor: primaryColor }}
              >
                <span>Grand Total:</span>
                <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
              </div>
              {totals.amountPaid > 0 && (
                <div className="flex justify-between font-bold text-slate-800 pt-1">
                  <span>Balance Due:</span>
                  <span>{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
                </div>
              )}
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
