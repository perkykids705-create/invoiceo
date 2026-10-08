import React from 'react';
import { InvoiceData } from '../../types/invoice';
import { MessageSquareText } from 'lucide-react';

interface NotesAndPaymentFormProps {
  invoice: InvoiceData;
  onChange: (updated: Partial<InvoiceData>) => void;
}

export const NotesAndPaymentForm: React.FC<NotesAndPaymentFormProps> = ({
  invoice,
  onChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 text-black font-extrabold text-base sm:text-lg">
          <MessageSquareText className="w-5 h-5 text-black" />
          <span>Notes & Payment Instructions</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-black">
          Terms & Remittance
        </span>
      </div>

      <div className="space-y-4">
        {/* Notes */}
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Notes / Thank You Message
          </label>
          <textarea
            rows={2}
            value={invoice.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="e.g. Thank you for your business! Please reach out if you have any questions."
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 resize-y font-medium"
          />
        </div>

        {/* Payment Instructions */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-extrabold text-black">
              Payment Instructions / Bank Wire Info
            </label>
            <button
              type="button"
              onClick={() =>
                onChange({
                  paymentInstructions: `Bank: First Republic Bank\nAccount Name: ${invoice.business.name || 'Your Company LLC'}\nAccount No: 1234-5678-9012\nRouting: 021000021\nSWIFT: FRBKUS33`,
                })
              }
              className="text-xs text-black hover:underline font-extrabold cursor-pointer"
            >
              Insert Bank Template
            </button>
          </div>
          <textarea
            rows={3}
            value={invoice.paymentInstructions}
            onChange={(e) => onChange({ paymentInstructions: e.target.value })}
            placeholder="Bank Name, Account Number, SWIFT/BIC, IBAN, PayPal address, or payment link..."
            className="w-full px-3.5 py-2.5 text-base font-mono bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 resize-y font-medium"
          />
        </div>

        {/* Footer Text */}
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Invoice Footer Text
          </label>
          <input
            type="text"
            value={invoice.footerText}
            onChange={(e) => onChange({ footerText: e.target.value })}
            placeholder="e.g. Apex Studio • Registered in California • All rights reserved"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
};
