import React, { useRef } from 'react';
import { BusinessDetails } from '../../types/invoice';
import { Building2, Trash2, Upload } from 'lucide-react';

interface BusinessFormProps {
  business: BusinessDetails;
  onChange: (updated: BusinessDetails) => void;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ business, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = (field: keyof BusinessDetails, value: string) => {
    onChange({
      ...business,
      [field]: value,
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, SVG, WebP).');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image file is too large. Please upload a logo smaller than 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        handleFieldChange('logo', base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    handleFieldChange('logo', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 text-black font-extrabold text-base sm:text-lg">
          <Building2 className="w-5 h-5 text-black" />
          <span>Your Business Details</span>
        </div>
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-black">
          Sender / Issuer
        </span>
      </div>

      {/* Logo Uploader & Preview */}
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1.5">
          Company Logo
        </label>
        {business.logo ? (
          <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 border border-slate-200 rounded-[4px]">
            <div className="h-16 w-32 bg-white border border-slate-200 rounded-[3px] p-1.5 flex items-center justify-center overflow-hidden">
              <img
                src={business.logo}
                alt="Uploaded company logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 text-sm font-bold bg-white hover:bg-slate-100 border border-slate-300 text-black rounded-[4px] transition-colors shadow-2xs cursor-pointer"
              >
                Change Logo
              </button>
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="px-3.5 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-black bg-slate-50/70 hover:bg-slate-50 rounded-[4px] p-4 text-center cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-black font-bold">
              <Upload className="w-4 h-4 text-black" />
              <span>Click to upload company logo (PNG, JPG, SVG)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Recommended max height: 100px • Up to 2MB</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1.5">
          Business Name <span className="text-rose-600">*</span>
        </label>
        <input
          type="text"
          value={business.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          placeholder="e.g. Apex Digital Studio LLC"
          className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-bold"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1.5">
          Address & City
        </label>
        <textarea
          rows={2}
          value={business.address}
          onChange={(e) => handleFieldChange('address', e.target.value)}
          placeholder="Street address, Suite, City, State, ZIP, Country"
          className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 resize-y font-medium"
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={business.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="billing@company.com"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            value={business.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
      </div>

      {/* Website & Tax/VAT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Website
          </label>
          <input
            type="text"
            value={business.website}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            placeholder="www.company.com"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1.5">
            Tax ID / VAT No.
          </label>
          <input
            type="text"
            value={business.taxNumber}
            onChange={(e) => handleFieldChange('taxNumber', e.target.value)}
            placeholder="e.g. US-EIN-94-3829104"
            className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
};
