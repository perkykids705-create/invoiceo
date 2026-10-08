import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, ShieldAlert } from 'lucide-react';

export const SeoContent: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this invoice generator completely free to use?',
      a: 'Yes, this invoice generator is 100% free with no hidden fees, subscriptions, or watermarks. All 12 templates and features are available without restriction.',
    },
    {
      q: 'Do I need to create an account or sign up?',
      a: 'No account, login, or registration is required. All invoice information is handled directly within your web browser.',
    },
    {
      q: 'Is my financial and client data stored on a server?',
      a: 'No. Everything is saved locally in your browser’s localStorage. Your invoices, client names, and billing records are never sent to external servers.',
    },
    {
      q: 'Can I export and back up my invoices?',
      a: 'Yes. You can export any invoice as a standard JSON file and import it anytime on any computer to continue editing.',
    },
    {
      q: 'Is the text in the generated PDF searchable and selectable?',
      a: 'Yes. The generator produces true vector PDF documents with selectable text and crisp fonts, ensuring compatibility with accounting systems and PDF readers.',
    },
  ];

  return (
    <section id="seo-guide" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 text-black">
      <div className="bg-white rounded-[4px] border border-slate-300 p-8 sm:p-12 shadow-2xs space-y-10">
        {/* SEO Header & Intro */}
        <div className="border-b border-slate-200 pb-8">
          <span className="text-xs font-black uppercase tracking-wider text-black block mb-2">
            Documentation & Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Invoiceo.online — Free Online Invoice Generator for Freelancers, Agencies & Small Businesses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-black leading-relaxed font-medium">
            Invoiceo.online empowers you to create, customize, and download client-ready invoices in seconds. Equipped with 12 professional layout styles, instant tax & discount calculations, and browser-local privacy.
          </p>
        </div>

        {/* Article Content Structure */}
        <div className="space-y-8 text-base text-black leading-relaxed font-normal">
          <div>
            <h2 className="text-xl font-black text-black mb-3">
              How to Create a Professional Invoice
            </h2>
            <p className="text-black">
              Creating a polished invoice is simple: enter your business contact details and upload your logo in the form above. Next, fill in your client&apos;s billing credentials, itemize the products or services delivered with quantities and rates, apply appropriate taxes or discounts, and specify your preferred payment instructions. Your live preview updates automatically in real time as you type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
            <div className="p-5 bg-slate-50 border border-slate-300 rounded-[4px] space-y-2">
              <h3 className="font-extrabold text-black text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-black" />
                <span>Essential Invoice Elements</span>
              </h3>
              <p className="text-sm text-black leading-relaxed font-medium">
                Include unique invoice identifiers, issue and due dates, business tax numbers (VAT/EIN/GST), itemized service lines, currency denomination, and bank wire details.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-300 rounded-[4px] space-y-2">
              <h3 className="font-extrabold text-black text-base flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-black" />
                <span>Zero Cloud Storage Privacy</span>
              </h3>
              <p className="text-sm text-black leading-relaxed font-medium">
                Your financial records and client confidentiality remain 100% in your hands. All invoice drafts, logos, and customizations stay strictly within your browser&apos;s localStorage sandbox.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-black mb-3">
              Choosing the Right Invoice Template for Your Industry
            </h2>
            <p className="text-black">
              Different industries benefit from tailored presentation styles. Agencies and design studios often favor the Minimal or Bold Header styles, while corporate consultants and enterprise contractors prefer the Corporate Executive or Structured Accounting layouts. Select from the 12 layouts displayed directly on this page to find the ideal match for your brand.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-xl font-black text-black mb-5">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-300 rounded-[4px] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between text-base font-extrabold text-black transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-black" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-black" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 text-base text-black bg-white border-t border-slate-200 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
