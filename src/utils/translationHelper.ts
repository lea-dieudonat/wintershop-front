import type { Product } from '../types/productTypes';

interface ProductTranslation {
  locale: string;
  name: string;
  description: string;
}

interface ProductWithTranslations extends Product {
  translations?: ProductTranslation[];
}

export function getProductTranslation(
  product: ProductWithTranslations,
  locale: string = 'en'
): { name: string; description: string } {
  const translation = product.translations?.find(
    (t) => t.locale === locale
  );

  if (translation) {
    return {
      name: translation.name,
      description: translation.description,
    };
  }

  // Fallback to English
  const frTranslation = product.translations?.find(
    (t) => t.locale === 'en'
  );
  return {
    name: frTranslation?.name || product.name || 'N/A',
    description: frTranslation?.description || product.description || 'N/A',
  };
}
