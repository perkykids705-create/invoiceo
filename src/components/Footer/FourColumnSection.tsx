import React from 'react';
import { FileText, Check, Shield, HelpCircle } from 'lucide-react';

export const FourColumnSection: React.FC = () => {
  return (
    <section className="bg-white border-t border-slate-300 py-14 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Invoice Generator */}
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <FileText className="w-5 h-5 text-black" />
              <h3 className="font-black text-sm uppercase tracking-wider text-black">
                Invoice Generator
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3.5 font-medium">
              Fast, privacy-first invoice creator designed for independent contractors, freelancers, and small enterprise teams.
            </p>
            <ul className="text-sm space-y-2 text-slate-600 font-medium">
              <li>• <span className="text-black font-bold">12 Responsive Templates</span></li>
              <li>• Instant Live Preview</li>
              <li>• Browser LocalStorage</li>
              <li>• Free PDF Download</li>
            </ul>
          </div>

          {/* Column 2: Features */}
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <Check className="w-5 h-5 text-black" />
              <h3 className="font-black text-sm uppercase tracking-wider text-black">
                Key Features
              </h3>
            </div>
            <ul className="text-sm space-y-2.5 leading-relaxed">
              <li>
                <span className="font-black text-black">Auto Calculations:</span>{' '}
                <span className="text-slate-600 font-medium">Taxes, discounts, shipping, and balance due.</span>
              </li>
              <li>
                <span className="font-black text-black">Color Customization:</span>{' '}
                <span className="text-slate-600 font-medium">Pick any brand accent color with live preview.</span>
              </li>
              <li>
                <span className="font-black text-black">Logo Upload:</span>{' '}
                <span className="text-slate-600 font-medium">Embed company logos with automatic sizing.</span>
              </li>
              <li>
                <span className="font-black text-black">Multi-Currency:</span>{' '}
                <span className="text-slate-600 font-medium">Full support for USD, EUR, GBP, CAD, AUD, JPY, and more.</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <Shield className="w-5 h-5 text-black" />
              <h3 className="font-black text-sm uppercase tracking-wider text-black">
                Data & Storage
              </h3>
            </div>
            <ul className="text-sm space-y-2.5 leading-relaxed">
              <li>
                <span className="font-black text-black">JSON Import/Export:</span>{' '}
                <span className="text-slate-600 font-medium">Port invoices seamlessly across devices.</span>
              </li>
              <li>
                <span className="font-black text-black">Local Multi-Invoice Store:</span>{' '}
                <span className="text-slate-600 font-medium">Keep recent invoices right in your browser.</span>
              </li>
              <li>
                <span className="font-black text-black">Zero Tracking:</span>{' '}
                <span className="text-slate-600 font-medium">No tracking cookies, telemetry, or server database.</span>
              </li>
              <li>
                <span className="font-black text-black">A4 Vector Standard:</span>{' '}
                <span className="text-slate-600 font-medium">Crisp, searchable PDFs for accounting.</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Help / Information */}
          <div>
            <div className="flex items-center gap-2 mb-3.5">
              <HelpCircle className="w-5 h-5 text-black" />
              <h3 className="font-black text-sm uppercase tracking-wider text-black">
                Help & Guides
              </h3>
            </div>
            <ul className="text-sm space-y-2.5 text-black font-semibold">
              <li>
                <a href="#seo-guide" className="hover:underline font-bold text-black">
                  Invoice Creation Checklist
                </a>
              </li>
              <li>
                <a href="#seo-guide" className="hover:underline font-bold text-black">
                  Payment Terms Guidelines
                </a>
              </li>
              <li>
                <a href="#seo-guide" className="hover:underline font-bold text-black">
                  Tax Identification Formatting
                </a>
              </li>
              <li>
                <span className="text-stone-500 font-normal">Future tools coming soon</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
