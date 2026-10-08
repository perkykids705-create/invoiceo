import { InvoiceData } from '../types/invoice';

export const getInitialInvoiceData = (): InvoiceData => {
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 14);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return {
    id: 'inv_' + Date.now().toString(36),
    invoiceNumber: 'INV-2026-001',
    issueDate: formatDate(today),
    dueDate: formatDate(dueDate),
    paymentTerms: 'Net 14 Days',
    referenceNumber: 'PO-98421',
    poNumber: 'PO-98421',

    business: {
      name: 'Apex Design & Development Studio',
      address: '742 Evergreen Terrace, Suite 400\nSan Francisco, CA 94107\nUnited States',
      email: 'billing@apexstudio.io',
      phone: '+1 (415) 555-0199',
      website: 'www.apexstudio.io',
      taxNumber: 'US-EIN-94-3829104',
      registrationNumber: 'LLC-CA-2024-88',
      logo: '', // User can upload
    },

    customer: {
      name: 'Sarah Jenkins',
      company: 'Horizon Technologies Inc.',
      address: '100 Montgomery Street, 18th Floor\nSan Francisco, CA 94104\nUnited States',
      email: 'sarah.jenkins@horizontech.com',
      phone: '+1 (415) 555-0144',
      taxNumber: 'US-EIN-12-8765432',
    },

    items: [
      {
        id: 'item-1',
        description: 'Brand Identity Design & Design System System Architecture (Figma tokens, component library, brand guidelines)',
        quantity: 1,
        rate: 3400.0,
        tax: 0,
        discount: 0,
      },
      {
        id: 'item-2',
        description: 'Frontend Web Application Development (React, TypeScript, Tailwind CSS with full responsiveness & performance optimization)',
        quantity: 35,
        rate: 110.0,
        tax: 0,
        discount: 0,
      },
      {
        id: 'item-3',
        description: 'Quality Assurance Testing & Cross-Browser Validation',
        quantity: 8,
        rate: 95.0,
        tax: 0,
        discount: 0,
      },
      {
        id: 'item-4',
        description: 'Cloud Infrastructure Setup & CI/CD Pipeline Automation',
        quantity: 1,
        rate: 650.0,
        tax: 0,
        discount: 0,
      },
    ],

    currency: 'USD',
    currencySymbol: '$',

    taxLabel: 'Sales Tax',
    taxRate: 8.5,
    discountLabel: 'Client Discount',
    discountRate: 5.0,
    discountType: 'percentage',
    shipping: 0,
    amountPaid: 0,

    notes: 'Thank you for your business! Please remit payment within the specified terms. Contact billing@apexstudio.io for any invoice inquiries.',
    paymentInstructions: 'Bank Transfer:\nBank: Silicon Valley Bank / First Republic\nAccount Name: Apex Design Studio LLC\nAccount No: 8839-2049-1092\nRouting (ABA): 121000358\nSWIFT / BIC: SVBUS6S',
    footerText: 'Apex Design & Development Studio • Registered in California • All rights reserved',

    template: 'template-01',

    customization: {
      primaryColor: '#30364F',
      font: 'inter',
      logoPosition: 'right',
      dateFormat: 'YYYY-MM-DD',
      numberFormat: 'comma-dot',
      showItemTax: false,
      showItemDiscount: false,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const getBlankInvoiceData = (): InvoiceData => {
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 30);
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return {
    id: 'inv_' + Date.now().toString(36),
    invoiceNumber: 'INV-0001',
    issueDate: formatDate(today),
    dueDate: formatDate(dueDate),
    paymentTerms: 'Due on Receipt',
    referenceNumber: '',
    poNumber: '',

    business: {
      name: '',
      address: '',
      email: '',
      phone: '',
      website: '',
      taxNumber: '',
      registrationNumber: '',
      logo: '',
    },

    customer: {
      name: '',
      company: '',
      address: '',
      email: '',
      phone: '',
      taxNumber: '',
    },

    items: [
      {
        id: 'item-1',
        description: '',
        quantity: 1,
        rate: 0,
        tax: 0,
        discount: 0,
      },
    ],

    currency: 'USD',
    currencySymbol: '$',

    taxLabel: 'Tax',
    taxRate: 0,
    discountLabel: 'Discount',
    discountRate: 0,
    discountType: 'percentage',
    shipping: 0,
    amountPaid: 0,

    notes: 'Thank you for your business.',
    paymentInstructions: '',
    footerText: '',

    template: 'template-01',

    customization: {
      primaryColor: '#30364F',
      font: 'inter',
      logoPosition: 'right',
      dateFormat: 'YYYY-MM-DD',
      numberFormat: 'comma-dot',
      showItemTax: false,
      showItemDiscount: false,
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
