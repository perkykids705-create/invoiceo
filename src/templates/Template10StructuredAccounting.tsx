import React from 'react';
import { TemplateProps } from './types';
import { formatCurrency, formatDateString } from '../utils/formatters';

export const Template10StructuredAccounting: React.FC<TemplateProps> = ({ invoice, totals }) => {
  const primaryColor = invoice.customization?.primaryColor || '#334155';
  const dateFormat = invoice.customization?.dateFormat;
  const numFormat = invoice.customization?.numberFormat;
  const curr = invoice.currencySymbol;

  return (
    <div className="p-8 sm:p-10 text-slate-800 bg-white min-h-[1050px] flex flex-col justify-between font-mono text-xs">
      <div>
        {/* Ledger Header Box */}
        <div className="border-2 border-slate-700 p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xl font-bold tracking-wider text-slate-900 font-sans uppercase">
                {invoice.business.name || 'ACCOUNTING ENTITY'}
              </div>
              <div className="text-slate-600 whitespace-pre-line mt-1">{invoice.business.address}</div>
              <div className="text-slate-500 mt-1">Tax No: {invoice.business.taxNumber || 'N/A'}</div>
            </div>

            <div className="text-right border-l-2 border-slate-700 pl-4">
              <div className="text-xl font-bold uppercase text-slate-900 font-sans">STATEMENT / INVOICE</div>
              <div className="mt-1 font-bold">NO: {invoice.invoiceNumber || 'INV-0001'}</div>
              <div>DATE: {formatDateString(invoice.issueDate, dateFormat)}</div>
              <div>DUE: {formatDateString(invoice.dueDate, dateFormat)}</div>
            </div>
          </div>
        </div>

        {/* Customer & Accounting Details */}
        <div className="grid grid-cols-2 border border-slate-700 mb-4 divide-x divide-slate-700">
          <div className="p-3">
            <span className="font-bold uppercase text-slate-500 block mb-1">CLIENT ACCOUNT:</span>
            <div className="font-bold text-slate-900 font-sans">{invoice.customer.name}</div>
            {invoice.customer.company && <div className="text-slate-700 font-sans">{invoice.customer.company}</div>}
            <div className="text-slate-600 whitespace-pre-line mt-1">{invoice.customer.address}</div>
          </div>

          <div className="p-3 space-y-1">
            <div><span className="text-slate-500">TERMS: </span><strong>{invoice.paymentTerms || '30 DAYS NET'}</strong></div>
            <div><span className="text-slate-500">PO NO: </span><strong>{invoice.poNumber || invoice.referenceNumber || 'N/A'}</strong></div>
            <div><span className="text-slate-500">CLIENT REF: </span><strong>{invoice.customer.taxNumber || 'N/A'}</strong></div>
          </div>
        </div>

        {/* Structured Grid Table */}
        <table className="w-full text-left mb-4 border border-slate-700 border-collapse">
          <thead>
            <tr className="bg-slate-200 text-slate-800 uppercase font-bold border-b border-slate-700">
              <th className="py-2 px-2 border-r border-slate-700 w-12 text-center">LINE</th>
              <th className="py-2 px-2 border-r border-slate-700">ITEM SPECIFICATION</th>
              <th className="py-2 px-2 border-r border-slate-700 text-center w-16">QTY</th>
              <th className="py-2 px-2 border-r border-slate-700 text-right w-24">UNIT PRICE</th>
              <th className="py-2 px-2 text-right w-28">EXTENDED AMT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-2 px-2 border-r border-slate-700 text-center text-slate-500">{idx + 1}</td>
                <td className="py-2 px-2 border-r border-slate-700 text-slate-900 font-sans whitespace-pre-line">{item.description}</td>
                <td className="py-2 px-2 border-r border-slate-700 text-center">{item.quantity}</td>
                <td className="py-2 px-2 border-r border-slate-700 text-right">{formatCurrency(item.rate, curr, numFormat)}</td>
                <td className="py-2 px-2 text-right font-bold text-slate-900">
                  {formatCurrency((item.quantity || 0) * (item.rate || 0), curr, numFormat)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Structured Ledger Summary */}
        <div className="border border-slate-700 p-4 flex justify-between items-start">
          <div className="w-1/2 space-y-2">
            <span className="font-bold uppercase text-slate-500 block">REMITTANCE INSTRUCTIONS:</span>
            <div className="text-slate-700 whitespace-pre-line">{invoice.paymentInstructions || 'Please remit by due date.'}</div>
            {invoice.notes && <div className="text-slate-500 pt-2 border-t border-slate-300">{invoice.notes}</div>}
          </div>

          <div className="w-5/12 border-l border-slate-700 pl-4 space-y-1.5">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span className="font-bold">{formatCurrency(totals.subtotal, curr, numFormat)}</span>
            </div>
            {totals.totalDiscount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>DISCOUNT:</span>
                <span>-{formatCurrency(totals.totalDiscount, curr, numFormat)}</span>
              </div>
            )}
            {totals.totalTax > 0 && (
              <div className="flex justify-between">
                <span>TAX ({invoice.taxRate}%):</span>
                <span>{formatCurrency(totals.totalTax, curr, numFormat)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black pt-2 border-t-2 border-slate-700 text-slate-900 font-sans">
              <span>TOTAL DUE:</span>
              <span style={{ color: primaryColor }}>{formatCurrency(totals.grandTotal, curr, numFormat)}</span>
            </div>
          </div>
        </div>
      </div>

      {invoice.footerText && (
        <div className="mt-6 pt-2 border-t border-slate-300 text-center text-[10px] text-slate-500">
          {invoice.footerText}
        </div>
      )}
    </div>
  );
};
