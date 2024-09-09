import CONFIG from '@/config.json';

function formatCurrency(budget) {
  return new Intl.NumberFormat(CONFIG.locale, {
    style: 'currency',
    currency: CONFIG.currency,
  }).format(budget);
}

function formatDecimal(value, digits = 2) {
  return new Intl.NumberFormat(CONFIG.locale, {
    minimumFractionDigits: digits,
  }).format(value);
}

function formatPercentage(allocation) {
  return new Intl.NumberFormat(CONFIG.locale, {
    style: 'percent',
  }).format(allocation);
}

export { formatCurrency, formatDecimal, formatPercentage };
