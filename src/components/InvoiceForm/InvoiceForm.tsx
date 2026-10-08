import React from 'react';
import { InvoiceData, CalculatedTotals } from '../../types/invoice';
import { BusinessForm } from './BusinessForm';
import { CustomerForm } from './CustomerForm';
import { InvoiceDetailsForm } from './InvoiceDetailsForm';
import { LineItemsForm } from './LineItemsForm';
import { InvoiceTotalsForm } from './InvoiceTotalsForm';
import { NotesAndPaymentForm } from './NotesAndPaymentForm';

interface InvoiceFormProps {
  invoice: InvoiceData;
  totals: CalculatedTotals;
  onChange: (updated: InvoiceData) => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  totals,
  onChange,
}) => {
  const updateBusiness = (business: InvoiceData['business']) => {
    onChange({ ...invoice, business });
  };

  const updateCustomer = (customer: InvoiceData['customer']) => {
    onChange({ ...invoice, customer });
  };

  const updatePartial = (partial: Partial<InvoiceData>) => {
    onChange({ ...invoice, ...partial });
  };

  const updateItems = (items: InvoiceData['items']) => {
    onChange({ ...invoice, items });
  };

  const toggleDiscount = () => {
    onChange({
      ...invoice,
      customization: {
        ...invoice.customization,
        showItemDiscount: !invoice.customization?.showItemDiscount,
      },
    });
  };

  const toggleTax = () => {
    onChange({
      ...invoice,
      customization: {
        ...invoice.customization,
        showItemTax: !invoice.customization?.showItemTax,
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* 1. Invoice Details / Dates & Number */}
      <InvoiceDetailsForm invoice={invoice} onChange={updatePartial} />

      {/* 2. Business Details & Logo */}
      <BusinessForm business={invoice.business} onChange={updateBusiness} />

      {/* 3. Customer / Bill To */}
      <CustomerForm customer={invoice.customer} onChange={updateCustomer} />

      {/* 4. Dynamic Line Items */}
      <LineItemsForm
        items={invoice.items}
        currencySymbol={invoice.currencySymbol}
        showDiscount={invoice.customization?.showItemDiscount || false}
        showTax={invoice.customization?.showItemTax || false}
        onItemsChange={updateItems}
        onToggleDiscount={toggleDiscount}
        onToggleTax={toggleTax}
      />

      {/* 5. Totals & Tax / Discount */}
      <InvoiceTotalsForm invoice={invoice} totals={totals} onChange={updatePartial} />

      {/* 6. Notes & Payment Information */}
      <NotesAndPaymentForm invoice={invoice} onChange={updatePartial} />
    </div>
  );
};
