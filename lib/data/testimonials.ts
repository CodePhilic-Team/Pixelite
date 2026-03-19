export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'The Meridian tote has become my daily companion. The leather has developed the most beautiful patina after six months of use.',
    author: 'Saoirse M.',
    location: 'Dublin',
    initials: 'SM',
  },
  {
    id: 't2',
    quote: 'I bought the Vesper coat for a trip to Copenhagen. It kept me warm without a single layer underneath. Worth every penny.',
    author: 'Théo B.',
    location: 'Paris',
    initials: 'TB',
  },
  {
    id: 't3',
    quote: 'The packaging alone communicates that these are people who care deeply about craft. The candle has been burning in my studio for weeks.',
    author: 'Nadia K.',
    location: 'Zürich',
    initials: 'NK',
  },
  {
    id: 't4',
    quote: 'Finally a linen shirt that doesn\'t wrinkle the moment you look at it. The Arcana is genuinely the best piece I\'ve bought this year.',
    author: 'James F.',
    location: 'London',
    initials: 'JF',
  },
];
