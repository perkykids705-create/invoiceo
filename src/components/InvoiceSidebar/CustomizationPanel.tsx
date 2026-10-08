import React, { useState } from 'react';
import { InvoiceCustomization } from '../../types/invoice';
import { COLOR_PRESETS, FONT_OPTIONS, TEMPLATES_LIST } from '../../data/templates';
import { TemplateDesignThumbnail } from './TemplateDesignThumbnail';
import {
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  SlidersHorizontal,
  LayoutTemplate,
  Check,
  Sparkles,
} from 'lucide-react';

interface CustomizationPanelProps {
  customization: InvoiceCustomization;
  currentTemplate?: string;
  onTemplateChange?: (templateId: string) => void;
  onChange: (updated: InvoiceCustomization) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  customization,
  currentTemplate = 'template-01',
  onTemplateChange,
  onChange,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleColorChange = (color: string) => {
    onChange({
      ...customization,
      primaryColor: color,
    });
  };

  const categories = ['all', 'Corporate', 'Modern', 'Minimal', 'Creative', 'Executive'];

  const filteredTemplates = TEMPLATES_LIST.filter((tpl) => {
    if (categoryFilter === 'all') return true;
    return tpl.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  const activeTemplateObj = TEMPLATES_LIST.find((t) => t.id === currentTemplate) || TEMPLATES_LIST[0];

  return (
    <div className="space-y-5">
      {/* Panel Title */}
      <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-black" />
          <span className="text-sm font-extrabold text-black">Invoice Customization</span>
        </div>
        <span className="text-xs font-bold text-black px-2 py-0.5 rounded-[3px] bg-slate-100">
          12 Designs
        </span>
      </div>

      {/* 1. TEMPLATE DESIGNS THUMBNAILS (Here in customization only) */}
      <div className="space-y-3 pb-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
            <LayoutTemplate className="w-4 h-4 text-black" />
            <span>Template Designs</span>
          </label>
          <span className="text-xs font-bold text-black flex items-center gap-1">
            <span className="text-slate-500">Active:</span>
            <span className="font-extrabold text-black underline decoration-slate-400">
              {activeTemplateObj.name}
            </span>
          </span>
        </div>

        {/* Quick Dropdown Selector */}
        <select
          value={currentTemplate}
          onChange={(e) => onTemplateChange?.(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-extrabold cursor-pointer"
        >
          {TEMPLATES_LIST.map((tpl, idx) => (
            <option key={tpl.id} value={tpl.id} className="text-black font-medium">
              #{idx + 1} • {tpl.name} ({tpl.category})
            </option>
          ))}
        </select>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1 pt-1">
          {categories.map((cat) => {
            const isCatActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-1 rounded-[3px] text-xs font-bold capitalize transition-colors cursor-pointer ${
                  isCatActive
                    ? 'bg-black text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-black'
                }`}
              >
                {cat === 'all' ? 'All (12)' : cat}
              </button>
            );
          })}
        </div>

        {/* Visual Template Thumbnails Grid (2 Columns) */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {filteredTemplates.map((tpl) => {
            const isSelected = currentTemplate === tpl.id;
            const originalIndex = TEMPLATES_LIST.findIndex((t) => t.id === tpl.id) + 1;

            return (
              <div
                key={tpl.id}
                onClick={() => onTemplateChange?.(tpl.id)}
                className={`group rounded-[4px] border p-2 bg-white transition-all cursor-pointer flex flex-col justify-between text-left hover:shadow-md ${
                  isSelected
                    ? 'border-black ring-2 ring-black bg-slate-50/50 shadow-xs'
                    : 'border-slate-300 hover:border-black'
                }`}
              >
                {/* Visual Layout Design Thumbnail */}
                <div className="relative mb-2">
                  <TemplateDesignThumbnail
                    templateId={tpl.id}
                    primaryColor={customization.primaryColor}
                    isSelected={isSelected}
                  />

                  {/* Selected Active Check Badge */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-[2px] bg-[#30364F] text-white flex items-center gap-1 shadow-sm text-[10px] font-black">
                      <Check className="w-3 h-3 text-white" />
                      <span>Active</span>
                    </div>
                  )}

                  {/* Badge index */}
                  <div className="absolute bottom-1 left-1 px-1.5 py-0.2 bg-black text-white text-[9px] font-mono font-bold rounded-[2px]">
                    #{originalIndex}
                  </div>
                </div>

                {/* Template Name & Category */}
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-black">
                      {tpl.category}
                    </span>
                    {isSelected && (
                      <Sparkles className="w-3 h-3 text-black" />
                    )}
                  </div>
                  <div className="font-extrabold text-xs text-black truncate leading-tight">
                    {tpl.name}
                  </div>
                  <div className="text-[10px] text-slate-600 line-clamp-1 font-medium">
                    {tpl.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ACCENT COLOR */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <label className="flex items-center justify-between text-sm font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-black" />
            <span>Accent & Brand Color</span>
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

      {/* 3. TYPOGRAPHY FONT */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
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
          className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black font-extrabold"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.id} value={f.id} className="text-black font-medium">
              {f.name}
            </option>
          ))}
        </select>
      </div>

      {/* 4. LOGO POSITION */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-slate-600">Logo Position</label>
          <span className="text-xs font-bold text-black uppercase">{customization.logoPosition || 'left'}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-[4px]">
          <button
            type="button"
            onClick={() => onChange({ ...customization, logoPosition: 'left' })}
            className={`py-1.5 text-sm font-bold flex items-center justify-center gap-1.5 rounded-[3px] transition-colors cursor-pointer ${
              (customization.logoPosition || 'left') === 'left'
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

      {/* 5. DATE FORMAT & NUMBER FORMAT */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">
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
          <label className="block text-xs font-semibold text-slate-600 mb-1">
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
