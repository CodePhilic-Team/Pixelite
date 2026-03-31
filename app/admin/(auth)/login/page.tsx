'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Button from '@/components/ui/Button';

/**
 * AdminLoginPage - Authentication page for admin panel access
 * Matches the luxury editorial aesthetic of the main store
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication - replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo credentials check
    if (formData.email === 'admin@pixelite.com' && formData.password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password. Try admin@pixelite.com / admin123');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Brand panel */}
      <div
        className={cn(
          'hidden w-1/2 flex-col justify-between bg-[var(--color-ink)] p-12 lg:flex'
        )}
      >
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-wide text-[var(--color-gold)]">
            Pixelite
          </h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">Admin Portal</p>
        </div>

        <div className="max-w-md">
          <blockquote className="font-display text-2xl font-light leading-relaxed text-[var(--color-ivory)]">
            &ldquo;Premium curated goods deserve premium management.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-[var(--color-warm-gray)]">
            Access your dashboard to manage products, orders, and customers with elegance.
          </p>
        </div>

        <p className="text-xs text-[var(--color-warm-gray)]">
          © 2024 Pixelite. All rights reserved.
        </p>
      </div>

      {/* Right side - Login form */}
      <div
        className={cn(
          'flex w-full flex-col items-center justify-center bg-[var(--color-ivory)] px-6 py-12',
          'lg:w-1/2'
        )}
      >
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
              Pixelite
            </h1>
            <p className="text-sm text-[var(--color-warm-gray)]">Admin Portal</p>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-[var(--color-ink)]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-[var(--color-warm-gray)]">
              Sign in to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]"
                />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@pixelite.com"
                  required
                  className={cn(
                    'h-11 w-full rounded-md border bg-[var(--color-cream)]/50 pl-10 pr-4',
                    'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
                    'border-[var(--color-stone)]/50 transition-colors duration-200',
                    'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
                  )}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className={cn(
                    'h-11 w-full rounded-md border bg-[var(--color-cream)]/50 pl-10 pr-12',
                    'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
                    'border-[var(--color-stone)]/50 transition-colors duration-200',
                    'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    'absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]',
                    'transition-colors hover:text-[var(--color-charcoal)]'
                  )}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--color-charcoal)]">
                <input
                  type="checkbox"
                  className={cn(
                    'h-4 w-4 rounded border-[var(--color-stone)] text-[var(--color-gold)]',
                    'focus:ring-[var(--color-gold)] focus:ring-offset-0'
                  )}
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-light)]"
              >
                Forgot password?
              </a>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 rounded-md border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
            <p className="text-xs text-[var(--color-warm-gray)]">
              <strong className="text-[var(--color-charcoal)]">Demo credentials:</strong>
              <br />
              Email: admin@pixelite.com
              <br />
              Password: admin123
            </p>
          </div>

          {/* Back to store link */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]"
            >
              ← Back to store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}