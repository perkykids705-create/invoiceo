import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';
import { TemplateLogo } from './TemplateLogo';

export const Template05Sidebar: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#0d9488';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;
  const logoPos = invoice.customization?.logoPosition || 'left';

  return (
    <div className="bg-white text-slate-800 min-h-[1050px] flex flex-col justify-between">
      <div className="grid grid-cols-12 min-h-[1000px]">
        {/* Left Vertical Sidebar Panel (30%) */}
        <div className="col-span-4 bg-slate-50 border-r border-slate-200 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {invoice.business.logo && (
              <TemplateLogo
                invoice={invoice}
                positionOverride={logoPos}
                className="mb-2"
                imgClassName="max-h-14 max-w-full object-contain"
              />
            )}
            <div>
              <div className="text-base font-bold text-slate-900">{invoice.business.name || 'Company Name'}</div>
              <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.business.address}</div>
            </div>

            <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200">
              {invoice.business.email && <div>{invoice.business.email}</div>}
              {invoice.business.phone && <div>{invoice.business.phone}</div>}
              {invoice.business.website && <div>{invoice.business.website}</div>}
              {invoice.business.taxNumber && <div className="text-slate-500">Tax ID: {invoice.business.taxNumber}</div>}
            </div>

            {/* Invoice meta on sidebar */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Invoice Details
              </span>
              <div className="text-xs">
                <span className="text-slate-500 block">Invoice Number:</span>
                <span className="font-bold text-slate-900">{invoice.invoiceNumber || 'INV-0001'}</span>
              </div>
              <div className="text-xs">
                <span className="text-slate-500 block">Issue Date:</span>
                <span className="font-semibold text-slate-800">{formatDateString(invoice.issueDate, dateFormat)}</span>
              </div>
              <div className="text-xs">
                <span className="text-slate-500 block">Due Date:</span>
                <span className="font-semibold text-slate-800">{formatDateString(invoice.dueDate, dateFormat)}</span>
              </div>
              {invoice.paymentTerms && (
                <div className="text-xs">
                  <span className="text-slate-500 block">Terms:</span>
                  <span className="font-semibold text-slate-800">{invoice.paymentTerms}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment instructions at sidebar bottom */}
          {invoice.paymentInstructions && (
            <div className="pt-6 border-t border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Remittance
              </span>
              <div className="text-[11px] text-slate-600 font-mono whitespace-pre-line leading-relaxed">
                {invoice.paymentInstructions}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Panel (70%) */}
        <div className="col-span-8 p-8 flex flex-col justify-between">
          <div>
            {/* Top Right Header & Client Info */}
            <div className="flex justify-between items-start pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                  Invoiced To
                </span>
                <div className="text-base font-bold text-slate-900">{invoice.customer.name}</div>
                {invoice.customer.company && (
                  <div className="text-xs font-semibold text-slate-700">{invoice.customer.company}</div>
                )}
                <div className="text-xs text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
                {invoice.customer.email && (
                  <div className="text-xs text-slate-500 mt-1">{invoice.customer.email}</div>
                )}
              </div>

              <div className="text-right">
                <div className="text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
                  INVOICE
                </div>
                <div className="text-xs text-slate-500 mt-1">Status: Pending</div>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left mb-6 border-collapse">
              <thead>
                <tr className="border-b-2 text-[11px] font-bold uppercase tracking-wider text-slate-700" style={{ borderColor: primaryColor }}>
                  <th className="py-2 px-2">Description</th>
                  <th className="py-2 px-2 text-center w-16">Qty</th>
                  <th className="py-2 px-2 text-right w-24">Rate</th>
                  <th className="py-2 px-2 text-right w-28">Amount</th>
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

            {/* Totals Block */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-800">{formatCurrency(totals.subtotal, curr, numFormat)}</span>
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
                {totals.shipping > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping:</span>
                    <span>{formatCurrency(totals.shipping, curr, numFormat)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t-2" style={{ borderColor: primaryColor }}>
                  <span>Total:</span>
                  <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
                </div>
                {totals.amountPaid > 0 && (
                  <div className="flex justify-between font-bold text-slate-900 pt-1">
                    <span>Balance Due:</span>
                    <span>{formatCurrency(totals.balanceDue, curr, numFormat)}</span>
                  </div>
                )}
              </div>
            </div>

            {invoice.notes && (
              <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <span className="font-bold text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Notes:</span>
                <p className="whitespace-pre-line leading-relaxed">{invoice.notes}</p>
              </div>
            )}
          </div>

          {invoice.footerText && (
            <div className="pt-4 text-center text-[10px] text-slate-400 border-t border-slate-100">
              {invoice.footerText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
