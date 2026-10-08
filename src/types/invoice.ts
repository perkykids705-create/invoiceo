export interface BusinessDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  taxNumber: string;
  registrationNumber?: string;
  logo: string; // base64 or URL
}

export interface CustomerDetails {
  name: string;
  company: string;
  address: string;
  email: string;
  phone: string;
  taxNumber: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  tax: number; // percentage (e.g., 0, 10, 20)
  discount: number; // percentage (e.g., 0, 5)
  amount?: number; // calculated: quantity * rate * (1 - discount/100) * (1 + tax/100)
}

export interface InvoiceCustomization {
  primaryColor: string; // e.g. '#2563eb' or '#0f172a'
  font: 'inter' | 'roboto' | 'montserrat' | 'playfair' | 'jakarta' | 'courier';
  logoPosition: 'left' | 'center' | 'right';
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'DD MMM YYYY';
  numberFormat: 'comma-dot' | 'dot-comma' | 'space-comma';
  showItemTax: boolean;
  showItemDiscount: boolean;
  accentTextColor?: string;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  referenceNumber?: string;
  poNumber?: string;

  business: BusinessDetails;
  customer: CustomerDetails;
  items: InvoiceItem[];

  currency: string;
  currencySymbol: string;

  // Invoice-level adjustments
  taxLabel: string;
  taxRate: number; // overall tax rate if applied
  discountLabel: string;
  discountRate: number;
  discountType: 'percentage' | 'fixed';
  shipping: number;
  amountPaid: number;

  notes: string;
  paymentInstructions: string;
  footerText: string;

  template: string; // 'template-01' through 'template-12'
  customization: InvoiceCustomization;

  createdAt: string;
  updatedAt: string;
}

export interface CalculatedTotals {
  subtotal: number;
  itemsDiscountTotal: number;
  invoiceDiscountTotal: number;
  totalDiscount: number;
  taxableAmount: number;
  itemsTaxTotal: number;
  invoiceTaxTotal: number;
  totalTax: number;
  shipping: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: string;
  previewBg: string;
  badge?: string;
}
