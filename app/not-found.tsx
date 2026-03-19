import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-ivory)] text-center px-4">
      <p className="font-body text-xs tracking-widest uppercase text-[var(--color-gold)] mb-4">
        Page not found
      </p>
      <h1
        className="font-display font-light text-[var(--color-ink)] mb-6"
        style={{ fontSize: 'clamp(6rem, 15vw, 10rem)', lineHeight: 1 }}
      >
        404
      </h1>
      <p className="font-body text-sm text-[var(--color-warm-gray)] max-w-[36ch] mb-10 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center h-12 px-8 font-body text-sm tracking-wide border
                   border-[var(--color-charcoal)] text-[var(--color-charcoal)] rounded-sm
                   hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] transition-all duration-200"
      >
        Back to Shop
      </Link>
    </main>
  );
}
