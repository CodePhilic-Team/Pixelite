export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  type: 'size' | 'color' | 'material';
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  /** Price in cents — e.g. 14900 = $149 */
  priceInCents: number;
  /** Original price for sale items */
  compareAtPriceInCents?: number;
  images: ProductImage[];
  category: string;
  tags: string[];
  shortDescription: string;
  description: string;
  variants: ProductVariant[];
  isNew?: boolean;
  isBestseller?: boolean;
  stock: number;
}
