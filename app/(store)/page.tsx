import HeroSection from '@/components/home/HeroSection';
import Marquee from '@/components/home/Marquee';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import OverviewSection from '@/components/home/OverviewSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import Testimonials from '@/components/home/Testimonials';
import NewsletterBanner from '@/components/home/NewsletterBanner';

export const metadata = {
  title: 'Pixelite — Premium Curated Goods',
  description: 'Handcrafted luxury goods in natural materials. Designed for the considered life.',
};

/** Homepage — assembles all sections in spec order. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee />
      <FeaturedCollection />
      <OverviewSection />
      <CategoryGrid />
      <Testimonials />
      <NewsletterBanner />
    </>
  );
}
