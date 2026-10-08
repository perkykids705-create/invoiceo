import { InvoiceData } from '../types/invoice';
import { getInitialInvoiceData } from '../data/defaultInvoice';

const ACTIVE_INVOICE_KEY = 'invoiceflow_active_invoice';
const SAVED_INVOICES_KEY = 'invoiceflow_saved_invoices_list';

export interface SavedInvoiceMeta {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerCompany: string;
  total: number;
  currencySymbol: string;
  issueDate: string;
  updatedAt: string;
  template: string;
}

/**
 * Loads current working invoice from localStorage, or returns default
 */
export const loadActiveInvoice = (): InvoiceData => {
  try {
    const raw = localStorage.getItem(ACTIVE_INVOICE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.invoiceNumber && parsed.items) {
        if (!parsed.business?.logo && parsed.invoiceNumber === 'INV-2026-001') {
          const sample = getInitialInvoiceData();
          parsed.business = {
            ...parsed.business,
            logo: sample.business.logo,
          };
        }
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse active invoice from localStorage:', err);
  }
  return getInitialInvoiceData();
};

/**
 * Saves current working invoice to localStorage
 */
export const saveActiveInvoice = (invoice: InvoiceData): boolean => {
  try {
    localStorage.setItem(ACTIVE_INVOICE_KEY, JSON.stringify(invoice));
    return true;
  } catch (err) {
    console.error('Failed to save active invoice to localStorage:', err);
    return false;
  }
};

/**
 * Retrieves all saved invoices metadata list
 */
export const getSavedInvoicesList = (): InvoiceData[] => {
  try {
    const raw = localStorage.getItem(SAVED_INVOICES_KEY);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        return list;
      }
    }
  } catch (err) {
    console.warn('Failed to load saved invoices list:', err);
  }
  return [];
};

/**
 * Saves or updates an invoice into the persistent multi-invoice store
 */
export const saveInvoiceToStore = (invoice: InvoiceData): boolean => {
  try {
    const list = getSavedInvoicesList();
    const existingIndex = list.findIndex((i) => i.id === invoice.id);
    const updated = {
      ...invoice,
      updatedAt: new Date().toISOString(),
    };

    let newList: InvoiceData[];
    if (existingIndex >= 0) {
      newList = [...list];
      newList[existingIndex] = updated;
    } else {
      newList = [updated, ...list];
    }

    localStorage.setItem(SAVED_INVOICES_KEY, JSON.stringify(newList));
    saveActiveInvoice(updated);
    return true;
  } catch (err) {
    console.error('Failed to save invoice to store:', err);
    return false;
  }
};

/**
 * Deletes an invoice from the persistent multi-invoice store
 */
export const deleteInvoiceFromStore = (invoiceId: string): boolean => {
  try {
    const list = getSavedInvoicesList();
    const newList = list.filter((i) => i.id !== invoiceId);
    localStorage.setItem(SAVED_INVOICES_KEY, JSON.stringify(newList));
    return true;
  } catch (err) {
    console.error('Failed to delete invoice:', err);
    return false;
  }
};

/**
 * Exports invoice data as a downloaded JSON file
 */
export const exportInvoiceAsJson = (invoice: InvoiceData): void => {
  const jsonStr = JSON.stringify(invoice, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeFilename = (invoice.invoiceNumber || 'invoice')
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  a.href = url;
  a.download = `${safeFilename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Validates whether an imported object matches the InvoiceData structure
 */
export const validateImportedInvoice = (data: unknown): { valid: boolean; error?: string; invoice?: InvoiceData } => {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'File content is not a valid JSON object.' };
  }

  const inv = data as Partial<InvoiceData>;

  if (!inv.invoiceNumber && typeof inv.invoiceNumber !== 'string') {
    return { valid: false, error: 'Invalid invoice: missing "invoiceNumber" field.' };
  }

  if (!Array.isArray(inv.items)) {
    return { valid: false, error: 'Invalid invoice: missing or invalid "items" array.' };
  }

  // Sanitize and ensure mandatory defaults
  const sanitized: InvoiceData = {
    id: inv.id || 'inv_' + Date.now().toString(36),
    invoiceNumber: inv.invoiceNumber || 'INV-0001',
    issueDate: inv.issueDate || new Date().toISOString().split('T')[0],
    dueDate: inv.dueDate || new Date().toISOString().split('T')[0],
    paymentTerms: inv.paymentTerms || 'Due on Receipt',
    referenceNumber: inv.referenceNumber || '',
    poNumber: inv.poNumber || '',

    business: {
      name: inv.business?.name || '',
      address: inv.business?.address || '',
      email: inv.business?.email || '',
      phone: inv.business?.phone || '',
      website: inv.business?.website || '',
      taxNumber: inv.business?.taxNumber || '',
      registrationNumber: inv.business?.registrationNumber || '',
      logo: inv.business?.logo || '',
    },

    customer: {
      name: inv.customer?.name || '',
      company: inv.customer?.company || '',
      address: inv.customer?.address || '',
      email: inv.customer?.email || '',
      phone: inv.customer?.phone || '',
      taxNumber: inv.customer?.taxNumber || '',
    },

    items: inv.items.map((it, idx) => ({
      id: it.id || `item-${idx + 1}`,
      description: it.description || '',
      quantity: Number(it.quantity) || 1,
      rate: Number(it.rate) || 0,
      tax: Number(it.tax) || 0,
      discount: Number(it.discount) || 0,
    })),

    currency: inv.currency || 'USD',
    currencySymbol: inv.currencySymbol || '$',

    taxLabel: inv.taxLabel || 'Tax',
    taxRate: Number(inv.taxRate) || 0,
    discountLabel: inv.discountLabel || 'Discount',
    discountRate: Number(inv.discountRate) || 0,
    discountType: inv.discountType === 'fixed' ? 'fixed' : 'percentage',
    shipping: Number(inv.shipping) || 0,
    amountPaid: Number(inv.amountPaid) || 0,

    notes: inv.notes || '',
    paymentInstructions: inv.paymentInstructions || '',
    footerText: inv.footerText || '',

    template: inv.template || 'template-01',

    customization: {
      primaryColor: inv.customization?.primaryColor || '#30364F',
      font: inv.customization?.font || 'inter',
      logoPosition: inv.customization?.logoPosition || 'right',
      dateFormat: inv.customization?.dateFormat || 'YYYY-MM-DD',
      numberFormat: inv.customization?.numberFormat || 'comma-dot',
      showItemTax: Boolean(inv.customization?.showItemTax),
      showItemDiscount: Boolean(inv.customization?.showItemDiscount),
    },

    createdAt: inv.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return { valid: true, invoice: sanitized };
};
