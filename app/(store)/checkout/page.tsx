'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/lib/hooks/useCart';
import { formatPrice } from '@/lib/utils/formatPrice';
import PageWrapper from '@/components/layout/PageWrapper';
import AnimatedSection from '@/components/shared/AnimatedSection';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import Image from 'next/image';

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  address: z.string().min(5, 'Please enter your full address'),
  city: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  zip: z.string().min(3, 'Required'),
  shipping: z.enum(['standard', 'express']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, subtotalInCents } = useCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { shipping: 'standard' },
    mode: 'onChange',
  });

  const shipping = watch('shipping');
  const shippingCost = shipping === 'express' ? 2500 : 0;
  const total = subtotalInCents + shippingCost;

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Order submitted:', data);
    alert('Order placed! (Demo — no actual payment is processed.)');
  };

  return (
    <PageWrapper className="pt-32 pb-24">
      <AnimatedSection className="mb-10">
        <h1 className="font-display font-light text-[var(--color-ink)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Checkout
        </h1>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Form — 3 cols */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 flex flex-col gap-10">
          {/* Contact */}
          <AnimatedSection>
            <h2 className="font-body text-xs tracking-widest uppercase text-[var(--color-charcoal)] mb-5">
              1. Contact
            </h2>
            <FormField label="Email" error={errors.email?.message}>
              <input type="email" {...register('email')} placeholder="you@example.com" className={inputClass} />
            </FormField>
          </AnimatedSection>

          {/* Shipping address */}
          <AnimatedSection delay={0.05}>
            <h2 className="font-body text-xs tracking-widest uppercase text-[var(--color-charcoal)] mb-5">
              2. Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First Name" error={errors.firstName?.message}>
                <input {...register('firstName')} placeholder="Jane" className={inputClass} />
              </FormField>
              <FormField label="Last Name" error={errors.lastName?.message}>
                <input {...register('lastName')} placeholder="Doe" className={inputClass} />
              </FormField>
            </div>
            <FormField label="Address" error={errors.address?.message} className="mt-4">
              <input {...register('address')} placeholder="123 Main Street" className={inputClass} />
            </FormField>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <FormField label="City" error={errors.city?.message}>
                <input {...register('city')} placeholder="London" className={inputClass} />
              </FormField>
              <FormField label="Country" error={errors.country?.message}>
                <input {...register('country')} placeholder="UK" className={inputClass} />
              </FormField>
              <FormField label="ZIP / Postcode" error={errors.zip?.message}>
                <input {...register('zip')} placeholder="SW1A 1AA" className={inputClass} />
              </FormField>
            </div>
          </AnimatedSection>

          {/* Shipping method */}
          <AnimatedSection delay={0.1}>
            <h2 className="font-body text-xs tracking-widest uppercase text-[var(--color-charcoal)] mb-5">
              3. Shipping Method
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { value: 'standard', label: 'Standard Shipping', sub: '5–7 business days', price: 'Free' },
                { value: 'express', label: 'Express Shipping', sub: '1–3 business days', price: '$25' },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center justify-between p-4 border border-[var(--color-stone)] rounded-sm cursor-pointer hover:border-[var(--color-charcoal)] transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" value={opt.value} {...register('shipping')} className="accent-[var(--color-charcoal)]" />
                    <div>
                      <p className="font-body text-sm text-[var(--color-charcoal)]">{opt.label}</p>
                      <p className="font-body text-xs text-[var(--color-warm-gray)]">{opt.sub}</p>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-[var(--color-charcoal)]">{opt.price}</span>
                </label>
              ))}
            </div>
          </AnimatedSection>

          <Button type="submit" variant="primary" className="h-12" disabled={!isValid}>
            Place Order
          </Button>
        </form>

        {/* Order summary — 2 cols */}
        <AnimatedSection delay={0.15} className="lg:col-span-2">
          <div className="sticky top-24 border border-[var(--color-stone)] rounded-sm p-6 flex flex-col gap-4">
            <h2 className="font-body text-xs tracking-widest uppercase text-[var(--color-charcoal)] mb-2">
              Order Summary
            </h2>
            {items.map((item) => (
              <div key={`${item.productId}-${item.variantId}`} className="flex gap-3 items-start">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-sm bg-[var(--color-cream)]">
                  <Image src={item.imageSrc} alt={item.name} fill sizes="48px" className="object-cover" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center
                                   rounded-full bg-[var(--color-charcoal)] text-[var(--color-ivory)] font-mono text-2xs">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs text-[var(--color-charcoal)] truncate">{item.name}</p>
                  {item.variant && <p className="font-body text-2xs text-[var(--color-warm-gray)]">{item.variant}</p>}
                </div>
                <p className="font-mono text-xs text-[var(--color-charcoal)] shrink-0">
                  {formatPrice(item.priceInCents * item.quantity)}
                </p>
              </div>
            ))}
            <Divider />
            <div className="flex justify-between font-body text-sm text-[var(--color-charcoal)]">
              <span>Subtotal</span>
              <span className="font-mono">{formatPrice(subtotalInCents)}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-[var(--color-warm-gray)]">
              <span>Shipping</span>
              <span className="font-mono">{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
            </div>
            <div className="flex justify-between font-mono text-base text-[var(--color-charcoal)] pt-1">
              <span className="font-body">Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </PageWrapper>
  );
}

function FormField({ label, error, children, className }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block font-body text-xs text-[var(--color-warm-gray)] mb-1.5">{label}</label>
      {children}
      {error && <p className="font-body text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const inputClass = `
  w-full bg-transparent border-b border-[var(--color-stone)] font-body text-sm
  text-[var(--color-charcoal)] placeholder:text-[var(--color-stone)]
  py-2 focus:outline-none focus:border-[var(--color-charcoal)] transition-colors duration-200
`.trim();
