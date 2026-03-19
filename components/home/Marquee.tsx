/** CSS-only infinite marquee strip. Pauses on hover. Respects reduced-motion. */
export default function Marquee() {
  const items = [
    'Free Worldwide Shipping',
    'Sustainably Crafted',
    'New Arrivals Weekly',
    'Handmade with Intention',
    'Premium Natural Materials',
    'Curated for Longevity',
  ];

  const separator = <span className="text-[var(--color-gold)] mx-6" aria-hidden="true">◆</span>;

  const content = items.map((item, i) => (
    <span key={i} className="inline-flex items-center shrink-0">
      {item}
      {separator}
    </span>
  ));

  return (
    <div
      className="overflow-hidden bg-[var(--color-cream)] border-y border-[var(--color-stone)]/40 py-3"
      aria-label="Store features"
    >
      <div
        className="flex w-max animate-marquee hover:pause-animation"
        style={{ ['--pause' as string]: 'paused' }}
      >
        {/* Two copies for seamless loop */}
        <span className="inline-flex items-center font-body text-xs tracking-widest uppercase text-[var(--color-charcoal)]">
          {content}
          {content}
        </span>
      </div>
    </div>
  );
}
