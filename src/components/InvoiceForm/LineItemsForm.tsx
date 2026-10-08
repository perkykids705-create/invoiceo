import React from 'react';
import { InvoiceItem } from '../../types/invoice';
import { formatCurrency } from '../../utils/formatters';
import { Plus, Trash2, ArrowUp, ArrowDown, ListOrdered } from 'lucide-react';

interface LineItemsFormProps {
  items: InvoiceItem[];
  currencySymbol: string;
  showDiscount: boolean;
  showTax: boolean;
  onItemsChange: (items: InvoiceItem[]) => void;
  onToggleDiscount: () => void;
  onToggleTax: () => void;
}

export const LineItemsForm: React.FC<LineItemsFormProps> = ({
  items,
  currencySymbol,
  showDiscount,
  showTax,
  onItemsChange,
  onToggleDiscount,
  onToggleTax,
}) => {
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onItemsChange(updated);
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: 'item_' + Date.now().toString(36),
      description: '',
      quantity: 1,
      rate: 0,
      tax: 0,
      discount: 0,
    };
    onItemsChange([...items, newItem]);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length <= 1) {
      // Keep at least one empty item
      onItemsChange([
        {
          id: 'item_' + Date.now().toString(36),
          description: '',
          quantity: 1,
          rate: 0,
          tax: 0,
          discount: 0,
        },
      ]);
      return;
    }
    const updated = items.filter((_, i) => i !== index);
    onItemsChange(updated);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...items];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    onItemsChange(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    onItemsChange(updated);
  };

  return (
    <div className="bg-white p-6 rounded-[4px] border border-slate-200 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5 text-black font-extrabold text-base sm:text-lg">
          <ListOrdered className="w-5 h-5 text-black" />
          <span>Invoice Line Items</span>
        </div>

        {/* Column Toggles */}
        <div className="flex items-center gap-4 text-sm font-bold text-black">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showDiscount}
              onChange={onToggleDiscount}
              className="rounded-[3px] accent-black text-black focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span className="text-black">Item Discount</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showTax}
              onChange={onToggleTax}
              className="rounded-[3px] accent-black text-black focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span className="text-black">Item Tax</span>
          </label>
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-3.5">
        {items.map((item, index) => {
          const qty = Number(item.quantity) || 0;
          const rate = Number(item.rate) || 0;
          const disc = Number(item.discount) || 0;
          const rawTotal = qty * rate;
          const lineTotal = disc > 0 ? rawTotal * (1 - disc / 100) : rawTotal;

          return (
            <div
              key={item.id || index}
              className="p-4 bg-slate-50/70 border border-slate-200 rounded-[4px] space-y-3 relative group hover:border-slate-400 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 pt-1 text-black">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-1 hover:text-black disabled:opacity-20 transition-opacity cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4 text-black" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === items.length - 1}
                    className="p-1 hover:text-black disabled:opacity-20 transition-opacity cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4 text-black" />
                  </button>
                </div>

                {/* Description input */}
                <div className="flex-1">
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder={`Description of product or service (e.g. Website design, UI mockups, Consulting hours...)`}
                    className="w-full px-3.5 py-2.5 text-base bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black placeholder:text-stone-500 resize-y font-medium"
                  />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeleteItem(index)}
                  className="p-2 text-rose-600 hover:text-rose-800 rounded-[4px] transition-colors cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Numerical Inputs Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 items-center pl-7">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">
                    Rate ({currencySymbol})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
                  />
                </div>

                {showDiscount && (
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discount}
                      onChange={(e) =>
                        handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
                    />
                  </div>
                )}

                {showTax && (
                  <div>
                    <label className="block text-xs font-bold text-black mb-1">
                      Tax (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.tax}
                      onChange={(e) =>
                        handleItemChange(index, 'tax', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 text-base font-bold bg-white border border-slate-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-black"
                    />
                  </div>
                )}

                <div className="col-span-2 text-right">
                  <span className="block text-xs font-bold text-black">Line Total</span>
                  <span className="font-black text-base sm:text-lg text-black">
                    {formatCurrency(lineTotal, currencySymbol)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Button */}
      <button
        type="button"
        onClick={handleAddItem}
        className="w-full py-3 px-4 border border-dashed border-slate-300 hover:border-black bg-slate-50 hover:bg-slate-100 text-black text-sm font-bold rounded-[4px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <Plus className="w-4 h-4 text-black" />
        <span>Add Another Line Item</span>
      </button>
    </div>
  );
};
