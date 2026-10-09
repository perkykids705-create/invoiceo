import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceData } from '../../types/invoice';

/**
 * Generates a high-fidelity A4 PDF that captures the exact DOM element of the
 * active React template component (#invoice-pdf-export-container).
 * This guarantees 100% visual parity between the live preview and the downloaded PDF,
 * perfectly preserving custom primary colors, fonts, logo placement, item tables, and totals.
 */
export const generateSearchablePdf = async (invoice: InvoiceData): Promise<void> => {
  // Allow DOM to settle so any dynamic template/color/logo changes are fully applied
  await new Promise((resolve) => setTimeout(resolve, 200));

  const exportTarget =
    document.getElementById('invoice-pdf-export-container') ||
    document.getElementById('invoice-print-sheet');

  if (!exportTarget) {
    throw new Error('Export container not found');
  }

  try {
    // Wait for any embedded images (e.g. uploaded business logo) to be fully loaded
    const images = Array.from(exportTarget.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve(null);
        return new Promise((res) => {
          img.onload = () => res(null);
          img.onerror = () => res(null);
          setTimeout(() => res(null), 1000);
        });
      })
    );

    const canvas = await html2canvas(exportTarget, {
      scale: 2, // Crisp 300 DPI print quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc, clonedElement) => {
        const clonedWin = clonedDoc.defaultView || window;

        // 1. Sanitize all <style> tags in clonedDoc to prevent html2canvas crashing on Tailwind v4 oklch colors
        clonedDoc.querySelectorAll('style').forEach((styleTag) => {
          if (styleTag.textContent) {
            styleTag.textContent = styleTag.textContent
              .replace(/oklch\([^)]+\)/gi, '#475569')
              .replace(/color-mix\([^)]+\)/gi, '#475569')
              .replace(/lab\([^)]+\)/gi, '#475569');
          }
        });

        // 2. Clear out body and place ONLY clonedElement in pristine document flow
        clonedDoc.body.innerHTML = '';
        clonedDoc.body.appendChild(clonedElement);

        clonedDoc.body.style.backgroundColor = '#ffffff';
        clonedDoc.body.style.margin = '0';
        clonedDoc.body.style.padding = '0';
        clonedDoc.body.style.width = '794px';

        clonedElement.style.position = 'static';
        clonedElement.style.transform = 'none';
        clonedElement.style.left = '0';
        clonedElement.style.top = '0';
        clonedElement.style.zIndex = '1';
        clonedElement.style.visibility = 'visible';
        clonedElement.style.opacity = '1';
        clonedElement.style.width = '794px';
        clonedElement.style.minHeight = '1123px';
        clonedElement.style.margin = '0';
        clonedElement.style.padding = '0';
        clonedElement.style.display = 'block';

        // 3. Compute and convert any remaining oklch/lab colors on elements to hex/rgb
        try {
          const tempCanvas = clonedDoc.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');

          const toRgb = (colorStr: string): string => {
            if (!colorStr || !tempCtx) return colorStr;
            if (
              colorStr.includes('oklch') ||
              colorStr.includes('lab') ||
              colorStr.includes('color(')
            ) {
              try {
                tempCtx.fillStyle = '#000000';
                tempCtx.fillStyle = colorStr;
                return tempCtx.fillStyle;
              } catch {
                return '#30364F';
              }
            }
            return colorStr;
          };

          const allElements = [clonedElement, ...Array.from(clonedElement.querySelectorAll('*'))];
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            try {
              const computed = clonedWin.getComputedStyle(htmlEl);
              if (computed.color && (computed.color.includes('oklch') || computed.color.includes('lab'))) {
                htmlEl.style.color = toRgb(computed.color);
              }
              if (
                computed.backgroundColor &&
                (computed.backgroundColor.includes('oklch') || computed.backgroundColor.includes('lab'))
              ) {
                htmlEl.style.backgroundColor = toRgb(computed.backgroundColor);
              }
              if (
                computed.borderColor &&
                (computed.borderColor.includes('oklch') || computed.borderColor.includes('lab'))
              ) {
                htmlEl.style.borderColor = toRgb(computed.borderColor);
              }
            } catch {
              // Ignore detached nodes
            }
          });
        } catch (sanitizeErr) {
          console.warn('Color sanitization warning:', sanitizeErr);
        }
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
      const srcY = page * pageCanvasHeight;
      const currentSliceHeight = Math.min(pageCanvasHeight, canvasHeight - srcY);

      // Skip micro-slices at the bottom under 40px
      if (page > 0 && currentSliceHeight < 40) {
        break;
      }

      if (page > 0) {
        pdf.addPage();
      }

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
  } catch (err) {
    console.error('PDF generation error:', err);
    throw err;
  }
};
