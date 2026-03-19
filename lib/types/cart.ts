export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  imageSrc: string;
  priceInCents: number;
  quantity: number;
  variant?: string;
}
