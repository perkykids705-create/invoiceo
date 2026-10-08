import React from 'react';
import { TEMPLATES_LIST } from '../../data/templates';
import { LayoutTemplate, Check, ArrowDown, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: string;
  primaryColor?: string;
  onSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onSelect,
}) => {
  const current = TEMPLATES_LIST.find((t) => t.id === currentTemplate) || TEMPLATES_LIST[0];

  const handleScrollToGallery = () => {
    const el = document.getElementById('templates-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-base font-extrabold text-black flex items-center gap-2">
          <LayoutTemplate className="w-4 h-4 text-black" />
          <span>Invoice Template</span>
        </label>
        <span className="text-xs font-black px-2 py-0.5 rounded-[3px] bg-slate-100 text-black">
          {current.category}
        </span>
      </div>

      {/* Quick Select Dropdown for all 12 templates with dark black text */}
      <div>
        <select
          value={currentTemplate}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full px-3.5 py-2.5 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
        >
          {TEMPLATES_LIST.map((tpl, idx) => (
            <option key={tpl.id} value={tpl.id} className="text-black">
              #{idx + 1} • {tpl.name} ({tpl.category})
            </option>
          ))}
        </select>
      </div>

      {/* Quick 2-Column Grid Selector */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        {TEMPLATES_LIST.map((tpl, idx) => {
          const isSelected = currentTemplate === tpl.id;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelect(tpl.id)}
              className={`p-2.5 rounded-[4px] border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-black bg-slate-100 ring-1 ring-black'
                  : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-xs font-mono font-black text-black">
                  #{idx + 1}
                </span>
                {isSelected && (
                  <Check className="w-4 h-4 text-black" />
                )}
              </div>
              <div className="text-xs font-bold text-black truncate w-full">
                {tpl.name}
              </div>
              <div className="text-[10px] text-black uppercase tracking-wider font-extrabold">
                {tpl.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Template Card Callout */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-[4px] space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-base font-black text-black flex items-center gap-1.5">
            <Check className="w-4 h-4 text-black" />
            <span>{current.name}</span>
          </span>
          <span className="text-xs font-extrabold text-black flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            Active
          </span>
        </div>
        <p className="text-xs sm:text-sm text-black leading-relaxed font-medium">
          {current.description}
        </p>
      </div>

      {/* Jump to Page Gallery Button */}
      <button
        type="button"
        onClick={handleScrollToGallery}
        className="w-full py-2.5 px-3 border border-black bg-white hover:bg-slate-100 rounded-[4px] text-sm font-extrabold text-black flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <span>View All 12 Full Layout Designs On Page</span>
        <ArrowDown className="w-4 h-4 text-black" />
      </button>
    </div>
  );
};
