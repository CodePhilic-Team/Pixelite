'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils/cn';

// ── Schema ───────────────────────────────────────────────────────────────────
const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormValues = z.infer<typeof schema>;

// ── Floating label input ──────────────────────────────────────────────────────
function InputField({
  id,
  label,
  type,
  icon: Icon,
  error,
  ...rest
}: {
  id: string;
  label: string;
  type: string;
  icon: React.ElementType;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-body text-xs tracking-widest uppercase text-warm-gray">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone pointer-events-none"
        />
        <input
          id={id}
          type={type}
          className={cn(
            'w-full rounded-sm border bg-transparent py-3 pl-9 pr-4',
            'font-body text-sm text-ink placeholder:text-stone',
            'transition-colors duration-200 focus:outline-none focus:ring-1',
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-300'
              : 'border-stone focus:border-gold focus:ring-gold/30'
          )}
          {...rest}
        />
      </div>
      {error && <p className="font-body text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  // Redirect already-authenticated users
  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard');
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormValues) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 700));
    login({
      name: data.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: data.email,
      memberSince: new Date().toISOString(),
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen pt-16">
      {/* ── Brand panel ──────────────────────────────── */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-charcoal px-14 py-16 relative overflow-hidden"
      >
        {/* Background texture rings */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full border border-stone/10" />
        <div className="pointer-events-none absolute -top-16 -left-16 h-[380px] w-[380px] rounded-full border border-stone/10" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full border border-gold/10 translate-x-1/3 translate-y-1/3" />

        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-widest uppercase text-ivory">
          Pixelite
        </Link>

        {/* Centre copy */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-gold">
            <Sparkles size={14} />
            <span className="font-body text-xs tracking-widest uppercase">Member exclusive</span>
          </div>
          <h1 className="font-display text-display-lg text-ivory leading-tight">
            Welcome<br />back.
          </h1>
          <p className="font-body text-sm text-warm-gray max-w-[34ch] leading-relaxed">
            Sign in to access your orders, wishlist, and curated recommendations — all in one place.
          </p>
        </div>

        {/* Testimonial */}
        <blockquote className="border-l-2 border-gold/40 pl-5">
          <p className="font-display text-base italic text-stone/80">
            "Pixelite changed how I shop — everything feels personal."
          </p>
          <footer className="mt-2 font-body text-xs text-warm-gray tracking-wide">
            — A. Chen, Member since 2023
          </footer>
        </blockquote>
      </motion.aside>

      {/* ── Form panel ───────────────────────────────── */}
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="flex flex-1 items-center justify-center bg-ivory px-6 py-16 sm:px-10"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="mb-10 block font-display text-xl tracking-widest uppercase text-ink lg:hidden">
            Pixelite
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="font-display text-display-md text-ink">Sign in</h2>
            <p className="mt-2 font-body text-sm text-warm-gray">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-gold hover:text-gold-light underline-offset-2 hover:underline transition-colors">
                Create one
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <InputField
              id="email"
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            {/* Forgot password */}
            <div className="text-right">
              <Link href="#" className="font-body text-xs text-warm-gray hover:text-gold transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'group relative w-full flex items-center justify-center gap-2 rounded-sm py-3.5',
                'bg-gold text-ink font-body text-sm tracking-wide',
                'transition-all duration-200 hover:bg-gold-light',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
              ) : (
                <>
                  Sign in
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-stone/40" />
            <span className="font-body text-xs text-stone tracking-widest uppercase">Or</span>
            <div className="h-px flex-1 bg-stone/40" />
          </div>

          {/* Social placeholders */}
          <div className="grid grid-cols-2 gap-3">
            {['Continue with Google', 'Continue with Apple'].map((label) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center gap-2 rounded-sm border border-stone/60 bg-transparent py-3 font-body text-xs text-charcoal tracking-wide transition-colors hover:border-charcoal hover:bg-cream"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </motion.main>
    </div>
  );
}
