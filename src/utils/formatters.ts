/**
 * Formats a numeric currency value according to invoice settings
 */
export const formatCurrency = (
  amount: number,
  symbol: string = '$',
  numberFormat: string = 'comma-dot'
): string => {
  const safeAmount = Number.isFinite(amount) ? amount : 0;
  const isNegative = safeAmount < 0;
  const absAmount = Math.abs(safeAmount);

  let formattedNumber = '';

  if (numberFormat === 'dot-comma') {
    // European style: 1.234,56
    const parts = absAmount.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedNumber = `${integerPart},${parts[1]}`;
  } else if (numberFormat === 'space-comma') {
    // French/Nordic style: 1 234,56
    const parts = absAmount.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    formattedNumber = `${integerPart},${parts[1]}`;
  } else {
    // Standard US / UK style: 1,234.56
    const parts = absAmount.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formattedNumber = `${integerPart}.${parts[1]}`;
  }

  const sign = isNegative ? '-' : '';
  return `${sign}${symbol}${formattedNumber}`;
};

/**
 * Formats date string (YYYY-MM-DD) according to selected date format
 */
export const formatDateString = (
  dateStr: string,
  format: string = 'YYYY-MM-DD'
): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  const [year, month, day] = parts;
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const mIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[mIndex] || month;

  switch (format) {
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'DD MMM YYYY':
      return `${day} ${monthName} ${year}`;
    case 'YYYY-MM-DD':
    default:
      return `${year}-${month}-${day}`;
  }
};
