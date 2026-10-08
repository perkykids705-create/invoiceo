import { InvoiceData, CalculatedTotals } from '../types/invoice';

export interface TemplateProps {
  invoice: InvoiceData;
  totals: CalculatedTotals;
}
