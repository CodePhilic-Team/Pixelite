import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
});

const geistMono = localFont({
  src: '../public/fonts/GeistMono-Regular.woff2',
  variable: '--font-geistmono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Pixelite', template: '%s | Pixelite' },
  description: 'Premium curated goods — luxury editorial e-commerce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
