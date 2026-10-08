import { InvoiceData, CalculatedTotals } from '../types/invoice';

/**
 * Safely rounds a number to 2 decimal places to avoid floating point issues
 */
export const round2 = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Calculates complete financial totals for the invoice
 */
export const calculateInvoiceTotals = (invoice: InvoiceData): CalculatedTotals => {
  let subtotal = 0;
  let itemsDiscountTotal = 0;
  let itemsTaxTotal = 0;

  invoice.items.forEach((item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const itemRaw = qty * rate;
    subtotal += itemRaw;

    // Item-level discount
    const itemDiscountRate = Number(item.discount) || 0;
    const itemDiscVal = itemDiscountRate > 0 ? (itemRaw * itemDiscountRate) / 100 : 0;
    itemsDiscountTotal += itemDiscVal;

    // Item-level tax
    const itemTaxRate = Number(item.tax) || 0;
    const afterItemDisc = itemRaw - itemDiscVal;
    const itemTaxVal = itemTaxRate > 0 ? (afterItemDisc * itemTaxRate) / 100 : 0;
    itemsTaxTotal += itemTaxVal;
  });

  subtotal = round2(subtotal);
  itemsDiscountTotal = round2(itemsDiscountTotal);
  itemsTaxTotal = round2(itemsTaxTotal);

  // Invoice-level discount
  let invoiceDiscountTotal = 0;
  const baseForInvoiceDisc = Math.max(0, subtotal - itemsDiscountTotal);
  if (invoice.discountType === 'percentage') {
    const rate = Number(invoice.discountRate) || 0;
    invoiceDiscountTotal = round2((baseForInvoiceDisc * rate) / 100);
  } else {
    invoiceDiscountTotal = round2(Number(invoice.discountRate) || 0);
  }

  const totalDiscount = round2(itemsDiscountTotal + invoiceDiscountTotal);
  const taxableAmount = Math.max(0, round2(subtotal - totalDiscount));

  // Invoice-level tax
  const invTaxRate = Number(invoice.taxRate) || 0;
  const invoiceTaxTotal = round2((taxableAmount * invTaxRate) / 100);
  const totalTax = round2(itemsTaxTotal + invoiceTaxTotal);

  const shipping = round2(Number(invoice.shipping) || 0);
  const grandTotal = round2(taxableAmount + totalTax + shipping);
  const amountPaid = round2(Number(invoice.amountPaid) || 0);
  const balanceDue = round2(Math.max(0, grandTotal - amountPaid));

  return {
    subtotal,
    itemsDiscountTotal,
    invoiceDiscountTotal,
    totalDiscount,
    taxableAmount,
    itemsTaxTotal,
    invoiceTaxTotal,
    totalTax,
    shipping,
    grandTotal,
    amountPaid,
    balanceDue,
  };
};
