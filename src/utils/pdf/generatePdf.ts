import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceData } from '../../types/invoice';
import { calculateInvoiceTotals } from '../calculations';
import { formatCurrency, formatDateString } from '../formatters';

interface HexRgb {
  r: number;
  g: number;
  b: number;
}

const hexToRgb = (hex: string): HexRgb => {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return {
      r: parseInt(clean[0] + clean[0], 16),
      g: parseInt(clean[1] + clean[1], 16),
      b: parseInt(clean[2] + clean[2], 16),
    };
  }
  if (clean.length === 6) {
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
  }
  return { r: 48, g: 54, b: 79 }; // fallback #30364F
};

/**
 * Generates an authentic A4 PDF that strictly reflects the chosen invoice template,
 * custom primary colors, fonts, logo placement, item tables, and totals.
 */
export const generateSearchablePdf = async (invoice: InvoiceData): Promise<void> => {
  // First attempt: High-fidelity DOM capture via html2canvas to ensure 100% template visual match
  const exportTarget =
    document.getElementById('invoice-pdf-export-container') ||
    document.getElementById('invoice-print-sheet');

  if (exportTarget) {
    try {
      // Allow any in-flight image or dynamic style changes to settle
      await new Promise((resolve) => setTimeout(resolve, 80));

      // Wait for any embedded images (e.g. uploaded business logo) to be fully loaded
      const images = exportTarget.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve(null);
          return new Promise((res) => {
            img.onload = () => res(null);
            img.onerror = () => res(null);
          });
        })
      );

      const canvas = await html2canvas(exportTarget, {
        scale: 2, // Crisp 300 DPI print quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc, clonedElement) => {
          // Normalize position and visibility in cloned DOM
          clonedElement.style.position = 'static';
          clonedElement.style.transform = 'none';
          clonedElement.style.zIndex = '1';
          clonedElement.style.visibility = 'visible';
          clonedElement.style.opacity = '1';
          clonedElement.style.width = '794px';
          clonedElement.style.margin = '0';

          // Helper to sanitize Tailwind v4 oklch / lab color values to standard rgb / hex
          const tempCanvas = clonedDoc.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');

          const sanitizeColor = (colorStr: string): string => {
            if (!colorStr) return colorStr;
            if (
              colorStr.includes('oklch') ||
              colorStr.includes('lab') ||
              colorStr.includes('color(')
            ) {
              if (tempCtx) {
                try {
                  tempCtx.fillStyle = '#000000';
                  tempCtx.fillStyle = colorStr;
                  return tempCtx.fillStyle;
                } catch {
                  return '#000000';
                }
              }
            }
            return colorStr;
          };

          const allElements = clonedElement.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            try {
              const computed = window.getComputedStyle(htmlEl);
              if (
                computed.color &&
                (computed.color.includes('oklch') || computed.color.includes('lab'))
              ) {
                htmlEl.style.color = sanitizeColor(computed.color);
              }
              if (
                computed.backgroundColor &&
                (computed.backgroundColor.includes('oklch') || computed.backgroundColor.includes('lab'))
              ) {
                htmlEl.style.backgroundColor = sanitizeColor(computed.backgroundColor);
              }
              if (
                computed.borderColor &&
                (computed.borderColor.includes('oklch') || computed.borderColor.includes('lab'))
              ) {
                htmlEl.style.borderColor = sanitizeColor(computed.borderColor);
              }
            } catch {
              // Ignore detached node
            }
          });
        },
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidthMm = 210;
      const pageHeightMm = 297;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate slice height in canvas pixels that matches an A4 page
      const pageCanvasHeight = Math.floor((canvasWidth * pageHeightMm) / pageWidthMm);
      const totalPages = Math.max(1, Math.ceil(canvasHeight / pageCanvasHeight));

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage();
        }

        const srcY = page * pageCanvasHeight;
        const currentSliceHeight = Math.min(pageCanvasHeight, canvasHeight - srcY);

        // Render page slice onto page canvas
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvasWidth;
        pageCanvas.height = pageCanvasHeight;
        const pCtx = pageCanvas.getContext('2d');

        if (pCtx) {
          pCtx.fillStyle = '#ffffff';
          pCtx.fillRect(0, 0, canvasWidth, pageCanvasHeight);
          pCtx.drawImage(
            canvas,
            0,
            srcY,
            canvasWidth,
            currentSliceHeight,
            0,
            0,
            canvasWidth,
            currentSliceHeight
          );
        }

        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        pdf.addImage(pageImgData, 'JPEG', 0, 0, pageWidthMm, pageHeightMm, undefined, 'FAST');
      }

      const safeFilename = (invoice.invoiceNumber || 'Invoice-0001').replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`${safeFilename}.pdf`);
      return;
    } catch (renderError) {
      console.warn('DOM to PDF capture fallback triggered:', renderError);
      // Fall through to vector renderer fallback
    }
  }

  // Fallback vector renderer with support for template styles
  await generateVectorFallbackPdf(invoice);
};

/**
 * Vector Fallback Generator that applies distinct template layout rules
 */
export const generateVectorFallbackPdf = async (invoice: InvoiceData): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const totals = calculateInvoiceTotals(invoice);
  const primaryRgb = hexToRgb(invoice.customization?.primaryColor || '#30364F');
  const tpl = invoice.template || 'template-01';

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  let currentPage = 1;
  let cursorY = margin;
  const fontName = 'helvetica';

  const checkPageOverflow = (requiredHeight: number): void => {
    if (cursorY + requiredHeight > pageHeight - margin - 15) {
      drawPageFooter(currentPage);
      doc.addPage();
      currentPage++;
      cursorY = margin;
      drawTableHeader();
    }
  };

  const drawPageFooter = (pageNum: number) => {
    doc.setFont(fontName, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    if (invoice.footerText) {
      doc.text(invoice.footerText, margin, pageHeight - 10);
    }
    const pageStr = `Page ${pageNum}`;
    doc.text(pageStr, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  // Header Styling differentiated by selected Template
  if (tpl === 'template-04') {
    // Bold Header: Solid Banner
    doc.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    doc.rect(0, 0, pageWidth, 44, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont(fontName, 'bold');
    doc.setFontSize(22);
    doc.text('INVOICE', margin, 24);

    doc.setFontSize(10);
    doc.setFont(fontName, 'normal');
    doc.text(`# ${invoice.invoiceNumber}`, margin, 33);

    doc.setFont(fontName, 'bold');
    doc.setFontSize(14);
    doc.text(invoice.business.name || 'Business Name', pageWidth - margin, 22, { align: 'right' });
    doc.setFont(fontName, 'normal');
    doc.setFontSize(9);
    doc.text(invoice.business.email || '', pageWidth - margin, 29, { align: 'right' });

    cursorY = 52;
  } else if (tpl === 'template-09') {
    // Top Accent Stripe
    doc.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    doc.rect(0, 0, pageWidth, 6, 'F');
    cursorY = margin + 4;

    doc.setTextColor(15, 23, 42);
    doc.setFont(fontName, 'bold');
    doc.setFontSize(24);
    doc.text('INVOICE', margin, cursorY + 8);
    cursorY += 16;
  } else if (tpl === 'template-05') {
    // Sidebar Style
    doc.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    doc.rect(0, 0, 50, pageHeight, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont(fontName, 'bold');
    doc.setFontSize(16);
    doc.text('INVOICE', 8, 25);
    doc.setFontSize(9);
    doc.setFont(fontName, 'normal');
    doc.text(invoice.invoiceNumber || '', 8, 32);

    doc.setFont(fontName, 'bold');
    doc.setFontSize(11);
    doc.text(invoice.business.name || '', 8, 48);
    doc.setFont(fontName, 'normal');
    doc.setFontSize(8);
    if (invoice.business.email) doc.text(invoice.business.email, 8, 54);
    if (invoice.business.phone) doc.text(invoice.business.phone, 8, 59);

    cursorY = margin;
  } else if (tpl === 'template-02' || tpl === 'template-12') {
    // Minimal Modern
    cursorY = margin;
    doc.setTextColor(30, 41, 59);
    doc.setFont(fontName, 'bold');
    doc.setFontSize(16);
    doc.text(invoice.business.name || 'Your Company', margin, cursorY + 5);

    doc.setFont(fontName, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    if (invoice.business.email) doc.text(invoice.business.email, margin, cursorY + 11);

    doc.setFont(fontName, 'normal');
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text('INVOICE', pageWidth - margin, cursorY + 4, { align: 'right' });
    doc.setFont(fontName, 'bold');
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.invoiceNumber || 'INV-0001', pageWidth - margin, cursorY + 11, { align: 'right' });

    cursorY += 22;
  } else {
    // Classic / Corporate Header
    cursorY = margin;
    doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    doc.setFont(fontName, 'bold');
    doc.setFontSize(22);
    doc.text('INVOICE', margin, cursorY + 6);

    doc.setFontSize(10);
    doc.setFont(fontName, 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text(`Invoice No: ${invoice.invoiceNumber || 'INV-0001'}`, margin, cursorY + 13);

    doc.setFont(fontName, 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(invoice.business.name || 'Your Company', pageWidth - margin, cursorY + 4, { align: 'right' });

    doc.setFont(fontName, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    let bY = cursorY + 9;
    if (invoice.business.address) {
      invoice.business.address.split('\n').slice(0, 2).forEach((l) => {
        doc.text(l, pageWidth - margin, bY, { align: 'right' });
        bY += 4;
      });
    }
    if (invoice.business.email) {
      doc.text(invoice.business.email, pageWidth - margin, bY, { align: 'right' });
      bY += 4;
    }
    cursorY = Math.max(cursorY + 22, bY + 2);
  }

  // Draw Logo if present
  if (invoice.business.logo && tpl !== 'template-05') {
    try {
      const logoW = 34;
      const logoH = 18;
      let logoX = margin;
      if (invoice.customization?.logoPosition === 'right') {
        logoX = pageWidth - margin - logoW;
      } else if (invoice.customization?.logoPosition === 'center') {
        logoX = (pageWidth - logoW) / 2;
      }
      doc.addImage(invoice.business.logo, 'JPEG', logoX, cursorY, logoW, logoH, undefined, 'FAST');
      if (invoice.customization?.logoPosition !== 'right') {
        cursorY += logoH + 4;
      }
    } catch {
      // Ignore format errors
    }
  }

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, cursorY, pageWidth - margin, cursorY);
  cursorY += 6;

  // Bill To & Dates Block
  const colWidth = contentWidth / 2;

  doc.setFont(fontName, 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.text('BILLED TO', margin, cursorY);

  cursorY += 5;
  doc.setFont(fontName, 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(invoice.customer.name || invoice.customer.company || 'Client Name', margin, cursorY);

  cursorY += 4.5;
  doc.setFont(fontName, 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  if (invoice.customer.company && invoice.customer.name) {
    doc.text(invoice.customer.company, margin, cursorY);
    cursorY += 4;
  }
  if (invoice.customer.address) {
    invoice.customer.address.split('\n').forEach((al) => {
      doc.text(al, margin, cursorY);
      cursorY += 4;
    });
  }
  if (invoice.customer.email) {
    doc.text(`Email: ${invoice.customer.email}`, margin, cursorY);
    cursorY += 4;
  }

  const metaStartX = margin + colWidth + 10;
  let metaY = cursorY - 18;

  const drawMetaRow = (label: string, value: string) => {
    doc.setFont(fontName, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(label, metaStartX, metaY);

    doc.setFont(fontName, 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(value, pageWidth - margin, metaY, { align: 'right' });
    metaY += 5;
  };

  drawMetaRow('Issue Date:', formatDateString(invoice.issueDate, invoice.customization?.dateFormat));
  drawMetaRow('Due Date:', formatDateString(invoice.dueDate, invoice.customization?.dateFormat));
  if (invoice.paymentTerms) {
    drawMetaRow('Payment Terms:', invoice.paymentTerms);
  }
  if (invoice.referenceNumber || invoice.poNumber) {
    drawMetaRow('PO / Ref:', invoice.referenceNumber || invoice.poNumber || '');
  }

  cursorY = Math.max(cursorY + 4, metaY + 4);

  // Line items table
  function drawTableHeader() {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, cursorY, contentWidth, 7, 'F');

    doc.setFont(fontName, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);

    const descW = contentWidth * 0.48;
    const qtyW = contentWidth * 0.12;
    const rateW = contentWidth * 0.2;
    const amtW = contentWidth * 0.2;

    doc.text('DESCRIPTION', margin + 3, cursorY + 4.8);
    doc.text('QTY', margin + descW + qtyW / 2, cursorY + 4.8, { align: 'center' });
    doc.text('RATE', margin + descW + qtyW + rateW - 2, cursorY + 4.8, { align: 'right' });
    doc.text('AMOUNT', margin + descW + qtyW + rateW + amtW - 2, cursorY + 4.8, { align: 'right' });

    cursorY += 9;
  }

  drawTableHeader();

  const descW = contentWidth * 0.48;
  const qtyW = contentWidth * 0.12;
  const rateW = contentWidth * 0.2;
  const amtW = contentWidth * 0.2;

  invoice.items.forEach((item, index) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const lineTotal = qty * rate;

    const lines = doc.splitTextToSize(item.description || `Item #${index + 1}`, descW - 4);
    const rowHeight = Math.max(lines.length * 4.2 + 3, 7.5);

    checkPageOverflow(rowHeight);

    if (index % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, cursorY - 1, contentWidth, rowHeight, 'F');
    }

    doc.setFont(fontName, 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);

    doc.text(lines, margin + 3, cursorY + 3.2);
    doc.text(String(qty), margin + descW + qtyW / 2, cursorY + 3.2, { align: 'center' });

    const formattedRate = formatCurrency(rate, invoice.currencySymbol, invoice.customization?.numberFormat);
    doc.text(formattedRate, margin + descW + qtyW + rateW - 2, cursorY + 3.2, { align: 'right' });

    const formattedLine = formatCurrency(lineTotal, invoice.currencySymbol, invoice.customization?.numberFormat);
    doc.setFont(fontName, 'bold');
    doc.text(formattedLine, margin + descW + qtyW + rateW + amtW - 2, cursorY + 3.2, { align: 'right' });

    cursorY += rowHeight;

    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(margin, cursorY - 1, pageWidth - margin, cursorY - 1);
  });

  cursorY += 4;
  checkPageOverflow(55);

  // Totals
  const totalsBoxWidth = 80;
  const totalsBoxX = pageWidth - margin - totalsBoxWidth;

  const drawTotalRow = (label: string, valStr: string, isBold: boolean = false, isAccent: boolean = false) => {
    doc.setFont(fontName, isBold ? 'bold' : 'normal');
    doc.setFontSize(isBold ? 9.5 : 8.5);

    if (isAccent) {
      doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    } else {
      doc.setTextColor(isBold ? 15 : 100, isBold ? 23 : 116, isBold ? 42 : 139);
    }

    doc.text(label, totalsBoxX, cursorY);
    doc.text(valStr, pageWidth - margin, cursorY, { align: 'right' });
    cursorY += 5;
  };

  const startTotalsY = cursorY;
  drawTotalRow('Subtotal:', formatCurrency(totals.subtotal, invoice.currencySymbol, invoice.customization?.numberFormat));

  if (totals.totalDiscount > 0) {
    drawTotalRow(
      `${invoice.discountLabel || 'Discount'}:`,
      `-${formatCurrency(totals.totalDiscount, invoice.currencySymbol, invoice.customization?.numberFormat)}`
    );
  }

  if (totals.totalTax > 0) {
    drawTotalRow(
      `${invoice.taxLabel || 'Tax'} (${invoice.taxRate}%):`,
      formatCurrency(totals.totalTax, invoice.currencySymbol, invoice.customization?.numberFormat)
    );
  }

  if (totals.shipping > 0) {
    drawTotalRow('Shipping / Handling:', formatCurrency(totals.shipping, invoice.currencySymbol, invoice.customization?.numberFormat));
  }

  doc.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setLineWidth(0.6);
  doc.line(totalsBoxX, cursorY, pageWidth - margin, cursorY);
  cursorY += 3.5;

  drawTotalRow(
    'Total:',
    formatCurrency(totals.grandTotal, invoice.currencySymbol, invoice.customization?.numberFormat),
    true,
    true
  );

  if (totals.amountPaid > 0) {
    drawTotalRow('Amount Paid:', formatCurrency(totals.amountPaid, invoice.currencySymbol, invoice.customization?.numberFormat));
    drawTotalRow('Balance Due:', formatCurrency(totals.balanceDue, invoice.currencySymbol, invoice.customization?.numberFormat), true);
  }

  const endTotalsY = cursorY;

  // Notes and payment terms
  let notesY = startTotalsY;
  const notesWidth = contentWidth - totalsBoxWidth - 10;

  if (invoice.notes) {
    doc.setFont(fontName, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    doc.text('NOTES', margin, notesY);
    notesY += 4;

    doc.setFont(fontName, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const noteLines = doc.splitTextToSize(invoice.notes, notesWidth);
    doc.text(noteLines, margin, notesY);
    notesY += noteLines.length * 3.8 + 3;
  }

  if (invoice.paymentInstructions) {
    doc.setFont(fontName, 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
    doc.text('PAYMENT INSTRUCTIONS', margin, notesY);
    notesY += 4;

    doc.setFont(fontName, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const payLines = doc.splitTextToSize(invoice.paymentInstructions, notesWidth);
    doc.text(payLines, margin, notesY);
  }

  cursorY = Math.max(endTotalsY, notesY) + 6;
  drawPageFooter(currentPage);

  const safeFilename = (invoice.invoiceNumber || 'Invoice-0001').replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`${safeFilename}.pdf`);
};
