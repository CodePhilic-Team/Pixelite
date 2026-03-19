import type { Category } from '@/lib/types/category';

export const categories: Category[] = [
  {
    id: 'cat-bags',
    slug: 'bags',
    name: 'Bags',
    description: 'Handcrafted leather and canvas bags built to last a lifetime.',
    imageSrc: '/images/categories/bags.jpg',
    imageAlt: 'Editorial shot of luxury leather bags',
    productCount: 4,
  },
  {
    id: 'cat-clothing',
    slug: 'clothing',
    name: 'Clothing',
    description: 'Considered garments in natural fibres. Minimal. Enduring.',
    imageSrc: '/images/categories/clothing.jpg',
    imageAlt: 'Model wearing luxury cashmere coat',
    productCount: 3,
  },
  {
    id: 'cat-accessories',
    slug: 'accessories',
    name: 'Accessories',
    description: 'The finishing details that define the whole.',
    imageSrc: '/images/categories/accessories.jpg',
    imageAlt: 'Luxury accessories flat lay',
    productCount: 3,
  },
  {
    id: 'cat-home',
    slug: 'home',
    name: 'Home',
    description: 'Objects for the thoughtfully curated interior.',
    imageSrc: '/images/categories/home.jpg',
    imageAlt: 'Luxury ceramic vase on marble surface',
    productCount: 3,
  },
];
