export const formatPrice = (price: number | string, language: string = 'en-US'): string => {
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(Number(price));
};

export const formatDate = (date: string | Date, language: string = 'en-US'): string => {
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(date));
};