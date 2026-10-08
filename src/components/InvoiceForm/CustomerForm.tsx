import React from 'react';
import { CustomerDetails } from '../../types/invoice';
import { UserCheck } from 'lucide-react';

interface CustomerFormProps {
  customer: CustomerDetails;
  onChange: (updated: CustomerDetails) => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onChange }) => {
  const handleFieldChange = (field: keyof CustomerDetails, value: string) => {
    onChange({
      ...customer,
      [field]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 text-black font-extrabold text-base sm:text-lg">
          <UserCheck className="w-5 h-5 text-black" />
          <span>Client Details (Bill To)</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-black">
          Recipient
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Client / Contact Name <span className="text-rose-600">*</span>
          </label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="e.g. Sarah Jenkins"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-bold"
          />
        </div>
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Company Name
          </label>
          <input
            type="text"
            value={customer.company}
            onChange={(e) => handleFieldChange('company', e.target.value)}
            placeholder="e.g. Horizon Technologies Inc."
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-extrabold text-black mb-1.5">
          Billing Address
        </label>
        <textarea
          rows={2}
          value={customer.address}
          onChange={(e) => handleFieldChange('address', e.target.value)}
          placeholder="Client street address, Suite, City, Country"
          className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 resize-y font-medium"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={customer.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="client@horizon.com"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={customer.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+1 (555) 0144"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-extrabold text-black mb-1.5">
            Client Tax / VAT ID
          </label>
          <input
            type="text"
            value={customer.taxNumber}
            onChange={(e) => handleFieldChange('taxNumber', e.target.value)}
            placeholder="e.g. EU12345678"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
};
