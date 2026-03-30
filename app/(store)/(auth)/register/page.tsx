'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Gem } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils/cn';

// ── Schema ────────────────────────────────────────────────────────────────────
const schema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard');
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    login({
      name: data.name,
      email: data.email,
      memberSince: new Date().toISOString(),
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen pt-16">
      {/* ── Form panel (left on register page) ──────── */}
      <motion.main
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-1 items-center justify-center bg-ivory px-6 py-16 sm:px-10"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="mb-10 block font-display text-xl tracking-widest uppercase text-ink lg:hidden">
            Pixelite
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="font-display text-display-md text-ink">Create account</h1>
            <p className="mt-2 font-body text-sm text-warm-gray">
              Already a member?{' '}
              <Link href="/login" className="text-gold hover:text-gold-light underline-offset-2 hover:underline transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <InputField
              id="name"
              label="Full name"
              type="text"
              icon={User}
              placeholder="Alexandra Chen"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />
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
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <InputField
              id="confirmPassword"
              label="Confirm password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'group relative w-full flex items-center justify-center gap-2 rounded-sm py-3.5 mt-2',
                'bg-gold text-ink font-body text-sm tracking-wide',
                'transition-all duration-200 hover:bg-gold-light',
                'disabled:opacity-60 disabled:cursor-not-allowed'
              )}
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
              ) : (
                <>
                  Create account
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 font-body text-2xs text-stone text-center leading-relaxed">
            By creating an account you agree to our{' '}
            <Link href="#" className="underline hover:text-warm-gray transition-colors">Terms of Service</Link>{' '}
            and{' '}
            <Link href="#" className="underline hover:text-warm-gray transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </motion.main>

      {/* ── Brand panel (right on register page) ────── */}
      <motion.aside
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-ink px-14 py-16 relative overflow-hidden"
      >
        {/* Decorative rings */}
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[560px] w-[560px] rounded-full border border-stone/10" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-[380px] w-[380px] rounded-full border border-stone/10" />
        <div className="pointer-events-none absolute top-0 left-0 h-[260px] w-[260px] rounded-full border border-gold/10 -translate-x-1/2 -translate-y-1/2" />

        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-widest uppercase text-ivory text-right">
          Pixelite
        </Link>

        {/* Centre copy */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-gold">
            <Gem size={14} />
            <span className="font-body text-xs tracking-widest uppercase">Join the community</span>
          </div>
          <h2 className="font-display text-display-lg text-ivory leading-tight">
            Curated for<br />your taste.
          </h2>
          <p className="font-body text-sm text-warm-gray max-w-[34ch] leading-relaxed">
            Unlock personalised recommendations, early access to drops, and seamless order management from day one.
          </p>
        </div>

        {/* Perks list */}
        <ul className="space-y-3">
          {[
            'Free shipping on your first order',
            'Early access to new collections',
            'Members-only pricing & rewards',
          ].map((perk) => (
            <li key={perk} className="flex items-start gap-3 font-body text-sm text-stone/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              {perk}
            </li>
          ))}
        </ul>
      </motion.aside>
    </div>
  );
}
