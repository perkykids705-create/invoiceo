import React from 'react';
import { InvoiceCustomization } from '../../types/invoice';
import { COLOR_PRESETS, FONT_OPTIONS, TEMPLATES_LIST } from '../../data/templates';
import { Palette, Type, AlignLeft, AlignCenter, AlignRight, SlidersHorizontal, LayoutTemplate } from 'lucide-react';

interface CustomizationPanelProps {
  customization: InvoiceCustomization;
  currentTemplate?: string;
  onTemplateChange?: (templateId: string) => void;
  onChange: (updated: InvoiceCustomization) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  currentTemplate,
  onTemplateChange,
  onChange,
}) => {
  const handleColorChange = (color: string) => {
    onChange({
      ...customization,
      primaryColor: color,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
        <SlidersHorizontal className="w-4 h-4 text-black" />
        <span className="text-sm font-extrabold text-black">Invoice Customization</span>
      </div>

      {/* Template Layout Selection */}
      <div className="space-y-2 pb-2 border-b border-slate-100">
        <label className="flex items-center justify-between text-sm font-extrabold text-black">
          <span className="flex items-center gap-1.5">
            <LayoutTemplate className="w-4 h-4 text-black" />
            <span>Layout Template</span>
          </span>
          <span className="text-xs font-bold text-slate-500">
            {TEMPLATES_LIST.find((t) => t.id === currentTemplate)?.category || 'Style'}
          </span>
        </label>
        <select
          value={currentTemplate || 'template-01'}
          onChange={(e) => onTemplateChange?.(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-extrabold cursor-pointer"
        >
          {TEMPLATES_LIST.map((tpl) => (
            <option key={tpl.id} value={tpl.id} className="text-black font-medium">
              {tpl.name} ({tpl.category})
            </option>
          ))}
        </select>
      </div>

      {/* Primary / Accent Color */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-sm font-extrabold text-black">
          <span className="flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-black" />
            <span>Accent Color</span>
          </span>
          <span className="font-mono text-xs font-black text-black">
            {customization.primaryColor}
          </span>
        </label>

        {/* Color presets swatches */}
        <div className="flex flex-wrap gap-2 items-center pt-1">
          {COLOR_PRESETS.map((color) => {
            const isSelected = customization.primaryColor.toLowerCase() === color.value.toLowerCase();
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => handleColorChange(color.value)}
                style={{ backgroundColor: color.value }}
                className={`w-7 h-7 rounded-[3px] transition-transform cursor-pointer ${
                  isSelected ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-105'
                }`}
                title={color.name}
              />
            );
          })}
          {/* Custom color picker input */}
          <div className="relative inline-block ml-1">
            <input
              type="color"
              value={customization.primaryColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-8 h-8 rounded-[3px] border border-black cursor-pointer p-0.5 bg-white"
              title="Pick custom hex color"
            />
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-sm font-extrabold text-black">
          <Type className="w-4 h-4 text-black" />
          <span>Typography Font</span>
        </label>
        <select
          value={customization.font}
          onChange={(e) =>
            onChange({
              ...customization,
              font: e.target.value as InvoiceCustomization['font'],
            })
          }
          className="w-full px-3 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-semibold"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.id} value={f.id} className="text-black">
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* Logo Position */}
      <div className="space-y-2">
        <label className="block text-sm font-extrabold text-black">Logo Position</label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-[4px]">
          <button
            type="button"
            onClick={() => onChange({ ...customization, logoPosition: 'left' })}
            className={`py-1.5 text-sm font-bold flex items-center justify-center gap-1.5 rounded-[3px] transition-colors cursor-pointer ${
              customization.logoPosition === 'left'
                ? 'bg-black text-white shadow-2xs font-extrabold'
                : 'text-black hover:bg-slate-200'
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            <span>Left</span>
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...customization, logoPosition: 'center' })}
            className={`py-1.5 text-sm font-bold flex items-center justify-center gap-1.5 rounded-[3px] transition-colors cursor-pointer ${
              customization.logoPosition === 'center'
                ? 'bg-black text-white shadow-2xs font-extrabold'
                : 'text-black hover:bg-slate-200'
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
            <span>Center</span>
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...customization, logoPosition: 'right' })}
            className={`py-1.5 text-sm font-bold flex items-center justify-center gap-1.5 rounded-[3px] transition-colors cursor-pointer ${
              customization.logoPosition === 'right'
                ? 'bg-black text-white shadow-2xs font-extrabold'
                : 'text-black hover:bg-slate-200'
            }`}
          >
            <AlignRight className="w-3.5 h-3.5" />
            <span>Right</span>
          </button>
        </div>
      </div>

      {/* Date Format & Number Format */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-xs font-extrabold text-black mb-1">
            Date Format
          </label>
          <select
            value={customization.dateFormat}
            onChange={(e) =>
              onChange({
                ...customization,
                dateFormat: e.target.value as InvoiceCustomization['dateFormat'],
              })
            }
            className="w-full px-2.5 py-2 text-sm bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-semibold"
          >
            <option value="YYYY-MM-DD" className="text-black">YYYY-MM-DD</option>
            <option value="MM/DD/YYYY" className="text-black">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY" className="text-black">DD/MM/YYYY</option>
            <option value="DD MMM YYYY" className="text-black">DD MMM YYYY</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-extrabold text-black mb-1">
            Number Format
          </label>
          <select
            value={customization.numberFormat}
            onChange={(e) =>
              onChange({
                ...customization,
                numberFormat: e.target.value as InvoiceCustomization['numberFormat'],
              })
            }
            className="w-full px-2.5 py-2 text-sm bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-semibold"
          >
            <option value="comma-dot" className="text-black">1,234.56 (US/UK)</option>
            <option value="dot-comma" className="text-black">1.234,56 (EU)</option>
            <option value="space-comma" className="text-black">1 234,56 (FR/Nordic)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
