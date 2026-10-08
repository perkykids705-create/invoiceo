import React, { useRef, useState, useEffect, useMemo } from 'react';
import { TEMPLATES_LIST } from '../../data/templates';
import { InvoiceData } from '../../types/invoice';
import { renderTemplateComponent } from '../../templates/TemplateRegistry';
import { calculateInvoiceTotals } from '../../utils/calculations';
import { getInitialInvoiceData } from '../../data/defaultInvoice';
import { LayoutTemplate, Check, Sparkles, Eye } from 'lucide-react';

interface TemplateGalleryProps {
  currentTemplate: string;
  primaryColor: string;
  onSelectTemplate: (templateId: string) => void;
  activeInvoice?: InvoiceData;
}

/**
 * Authentic scaled-down A4 invoice layout renderer
 * Renders the actual React invoice template at 794px width (standard A4 at 96 DPI)
 * and scales it precisely to fit the card container, showing the real layout design.
 */
const TemplateRealInvoiceMiniature: React.FC<{
  templateId: string;
  previewInvoice: InvoiceData;
  isSelected: boolean;
}> = ({ templateId, previewInvoice, isSelected }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.32);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          // Standard A4 width is 794px (210mm)
          setScale(width / 794);
        }
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }
    return () => ro.disconnect();
  }, []);

  const totals = useMemo(() => calculateInvoiceTotals(previewInvoice), [previewInvoice]);

  return (
    <div
      ref={containerRef}
      className={`w-full aspect-[210/297] bg-white rounded-[3px] border relative overflow-hidden transition-all shadow-xs select-none ${
        isSelected
          ? 'border-[#30364F] ring-2 ring-[#30364F]/40 shadow-sm'
          : 'border-slate-300 group-hover:border-slate-400 group-hover:shadow-md'
      }`}
    >
      <div
        className="absolute top-0 left-0 origin-top-left pointer-events-none select-none bg-white"
        style={{
          width: '794px',
          minHeight: '1123px',
          transform: `scale(${scale})`,
        }}
      >
        {renderTemplateComponent(templateId, {
          invoice: {
            ...previewInvoice,
            template: templateId,
          },
          totals,
        })}
      </div>

      {/* Subtle overlay on hover for interactive feel */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/[0.02] transition-colors pointer-events-none" />
    </div>
  );
};

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  currentTemplate,
  primaryColor,
  onSelectTemplate,
  activeInvoice,
}) => {
  const previewInvoiceData = useMemo<InvoiceData>(() => {
    const base = activeInvoice || getInitialInvoiceData();
    return {
      ...base,
      business: {
        ...base.business,
        name: base.business?.name || 'Studio Zenith Design Co.',
        address: base.business?.address || '742 Market Street, Suite 500\nSan Francisco, CA 94103',
        email: base.business?.email || 'billing@studiozenith.io',
        phone: base.business?.phone || '+1 (415) 555-0192',
        taxNumber: base.business?.taxNumber || 'US-9428019',
      },
      customer: {
        ...base.customer,
        name: base.customer?.name || 'Sarah Kensington',
        company: base.customer?.company || 'Acrobat Logistics Inc.',
        address: base.customer?.address || '100 North Riverside Plaza\nChicago, IL 60606',
        email: base.customer?.email || 'accounts@acrobat.com',
      },
      items: [
        {
          id: 'prev-1',
          description: 'Brand Identity & UI/UX Design System',
          quantity: 1,
          rate: 2200,
          tax: 10,
          discount: 0,
          amount: 2200,
        },
        {
          id: 'prev-2',
          description: 'Responsive Frontend Development & Integration',
          quantity: 2,
          rate: 950,
          tax: 10,
          discount: 0,
          amount: 1900,
        },
        {
          id: 'prev-3',
          description: 'Cloud Infrastructure Setup & Optimization',
          quantity: 1,
          rate: 650,
          tax: 10,
          discount: 0,
          amount: 650,
        },
      ],
      customization: {
        ...base.customization,
        primaryColor: primaryColor || base.customization?.primaryColor || '#30364F',
      },
    };
  }, [activeInvoice, primaryColor]);

  return (
    <section id="templates-section" className="w-full py-10 border-t border-slate-300 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Dark Black Typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-300 gap-3">
          <div>
            <div className="flex items-center gap-2 text-black font-extrabold text-sm uppercase tracking-wider mb-1.5">
              <LayoutTemplate className="w-4 h-4 text-black" />
              <span>12 Professional Templates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              Choose From 12 Authentic Invoice Layout Designs
            </h2>
            <p className="text-base text-black mt-1.5 max-w-3xl leading-relaxed font-medium">
              Explore 12 distinct layout designs placed directly on this page without scrolling boxes. Click any card to apply the layout to your invoice instantly with real-time auto-save and A4 print readiness.
            </p>
          </div>

          <div className="text-sm font-bold px-3 py-1.5 rounded-[4px] bg-white border border-slate-300 text-black self-start sm:self-auto shadow-2xs">
            Active Layout:{' '}
            <span className="text-black font-extrabold">
              {TEMPLATES_LIST.find((t) => t.id === currentTemplate)?.name || 'Default'}
            </span>
          </div>
        </div>

        {/* 12 Templates Grid — directly in the page with NO scrolling box! */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEMPLATES_LIST.map((tpl, index) => {
            const isSelected = currentTemplate === tpl.id;

            return (
              <div
                key={tpl.id}
                onClick={() => onSelectTemplate(tpl.id)}
                className={`group rounded-[4px] border p-3.5 bg-white transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg ${
                  isSelected
                    ? 'border-black ring-2 ring-black shadow-md bg-slate-50/40'
                    : 'border-slate-300 hover:border-black'
                }`}
              >
                {/* Authentic Scaled Invoice Preview */}
                <div className="mb-3.5 relative">
                  <TemplateRealInvoiceMiniature
                    templateId={tpl.id}
                    previewInvoice={previewInvoiceData}
                    isSelected={isSelected}
                  />

                  {/* Active Selected Check Badge */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded-[3px] bg-[#30364F] text-white flex items-center gap-1 shadow-md text-xs font-bold">
                      <Check className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </div>
                  )}

                  {/* Badge */}
                  {tpl.badge && !isSelected && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="text-xs font-bold px-2 py-0.5 bg-slate-200 text-black rounded-[3px] uppercase tracking-wider">
                        {tpl.badge}
                      </span>
                    </div>
                  )}

                  {/* Template Number */}
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-black text-white text-xs font-mono font-bold rounded-[2px]">
                    #{index + 1}
                  </div>
                </div>

                {/* Card Information with Dark Black Text */}
                <div className="space-y-1.5 mb-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-black">
                      {tpl.category}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-black text-black flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-black" />
                        Selected
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-lg text-black leading-snug">
                    {tpl.name}
                  </h3>
                  <p className="text-sm text-black line-clamp-2 leading-relaxed font-medium">
                    {tpl.description}
                  </p>
                </div>

                {/* Apply Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTemplate(tpl.id);
                  }}
                  className={`w-full py-2.5 px-4 rounded-[4px] text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#30364F] text-white shadow-2xs'
                      : 'bg-slate-100 group-hover:bg-slate-200 text-black'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Current Active Layout</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-black" />
                      <span>Apply This Layout</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
