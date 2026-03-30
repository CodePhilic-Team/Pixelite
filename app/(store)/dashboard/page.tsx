'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  DollarSign,
  Star,
  LogOut,
  Package,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { cn } from '@/lib/utils/cn';

// ── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_STATS = [
  { label: 'Orders Placed', value: '12', icon: ShoppingBag, suffix: '' },
  { label: 'Wishlist Items', value: '8', icon: Heart, suffix: '' },
  { label: 'Total Spent', value: '$1,240', icon: DollarSign, suffix: '' },
  { label: 'Loyalty Points', value: '3,650', icon: Star, suffix: 'pts' },
];

type OrderStatus = 'Delivered' | 'In Transit' | 'Processing' | 'Returned';

interface Order {
  id: string;
  date: string;
  items: string;
  total: string;
  status: OrderStatus;
}

const MOCK_ORDERS: Order[] = [
  { id: '#PX-9041', date: 'Mar 18, 2026', items: 'Leather Tote Bag', total: '$289.00', status: 'Delivered' },
  { id: '#PX-8812', date: 'Mar 05, 2026', items: 'Silk Blouse + Trousers', total: '$412.00', status: 'Delivered' },
  { id: '#PX-8755', date: 'Feb 24, 2026', items: 'Canvas Backpack', total: '$179.00', status: 'In Transit' },
  { id: '#PX-8620', date: 'Feb 10, 2026', items: 'Wool Coat', total: '$560.00', status: 'Processing' },
  { id: '#PX-8301', date: 'Jan 28, 2026', items: 'Suede Wallet', total: '$95.00', status: 'Returned' },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; icon: React.ElementType; classes: string }> = {
  Delivered:  { label: 'Delivered',  icon: CheckCircle2, classes: 'bg-emerald-50 text-emerald-700' },
  'In Transit': { label: 'In Transit', icon: Truck, classes: 'bg-blue-50 text-blue-700' },
  Processing: { label: 'Processing', icon: Clock, classes: 'bg-amber-50 text-amber-700' },
  Returned:   { label: 'Returned',   icon: RotateCcw, classes: 'bg-stone/20 text-warm-gray' },
};

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
  delay,
}: (typeof MOCK_STATS)[number] & { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      className="group flex flex-col gap-4 rounded-sm border border-stone/30 bg-cream p-6 hover:border-gold/40 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="font-body text-xs tracking-widest uppercase text-warm-gray">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold/20 transition-colors">
          <Icon size={14} />
        </div>
      </div>
      <p className="font-display text-display-md text-ink leading-none">
        {value}
        {suffix && <span className="ml-1 font-body text-sm text-warm-gray">{suffix}</span>}
      </p>
    </motion.div>
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-xs',
        cfg.classes
      )}
    >
      <cfg.icon size={11} />
      {cfg.label}
    </span>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login');
  }, [isAuthenticated, router]);

  // Don't render if unauthenticated (redirect in progress)
  if (!isAuthenticated || !user) return null;

  const memberYear = new Date(user.memberSince).getFullYear();

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-ivory pt-16">
      {/* Subtle top gradient strip */}
      <div className="h-1 w-full bg-linear-to-r from-charcoal via-gold to-charcoal" />

      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10 xl:px-16 py-12 sm:py-16">

        {/* ── Profile hero ──────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-charcoal ring-2 ring-gold/40 ring-offset-2 ring-offset-ivory">
              <span className="font-display text-xl text-ivory">{user.initials}</span>
            </div>

            {/* Name & meta */}
            <div>
              <h1 className="font-display text-display-md text-ink">{user.name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="font-body text-sm text-warm-gray">{user.email}</span>
                <span className="hidden sm:inline h-3 w-px bg-stone/60" />
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-2.5 py-0.5 font-body text-xs text-gold">
                  <Star size={10} /> Member since {memberYear}
                </span>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 self-start sm:self-auto rounded-sm border border-stone/50 px-4 py-2 font-body text-sm text-warm-gray transition-all duration-200 hover:border-ink hover:text-ink"
          >
            <LogOut size={14} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
            Sign out
          </button>
        </motion.section>

        {/* ── Stats grid ────────────────────────────── */}
        <section className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {MOCK_STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={0.1 + i * 0.07} />
          ))}
        </section>

        {/* ── Main content grid ─────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">

          {/* Recent orders */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-display-md text-ink text-[1.5rem]">Recent Orders</h2>
              <Link href="/shop" className="group flex items-center gap-1 font-body text-xs text-warm-gray hover:text-gold transition-colors tracking-wide">
                View all
                <ChevronRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Orders table */}
            <div className="overflow-hidden rounded-sm border border-stone/30">
              {/* Desktop table */}
              <table className="hidden w-full sm:table">
                <thead className="bg-cream">
                  <tr>
                    {['Order', 'Date', 'Items', 'Total', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left font-body text-2xs tracking-widest uppercase text-warm-gray"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone/20 bg-ivory">
                  {MOCK_ORDERS.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className="group hover:bg-cream/60 transition-colors duration-150"
                    >
                      <td className="px-5 py-4 font-mono text-xs text-charcoal">{order.id}</td>
                      <td className="px-5 py-4 font-body text-xs text-warm-gray">{order.date}</td>
                      <td className="px-5 py-4 font-body text-sm text-charcoal">{order.items}</td>
                      <td className="px-5 py-4 font-mono text-xs text-ink">{order.total}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile cards */}
              <ul className="sm:hidden divide-y divide-stone/20">
                {MOCK_ORDERS.map((order) => (
                  <li key={order.id} className="flex flex-col gap-2 bg-ivory px-4 py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-charcoal">{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="font-body text-sm text-ink">{order.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-xs text-warm-gray">{order.date}</span>
                      <span className="font-mono text-xs text-ink">{order.total}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Sidebar: Quick links & account info */}
          <aside className="space-y-6">

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="rounded-sm border border-stone/30 bg-cream overflow-hidden"
            >
              <h3 className="border-b border-stone/30 px-5 py-3.5 font-body text-2xs tracking-widest uppercase text-warm-gray">
                Quick links
              </h3>
              {[
                { href: '/shop', label: 'Browse Shop', icon: Package },
                { href: '/wishlist', label: 'My Wishlist', icon: Heart },
              ].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between px-5 py-4 font-body text-sm text-charcoal hover:bg-stone/10 transition-colors border-b border-stone/20 last:border-0"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={14} className="text-warm-gray group-hover:text-gold transition-colors" />
                    {label}
                  </span>
                  <ChevronRight
                    size={13}
                    className="text-stone group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </Link>
              ))}
            </motion.div>

            {/* Account details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.48 }}
              className="rounded-sm border border-stone/30 bg-cream p-5 space-y-4"
            >
              <h3 className="font-body text-2xs tracking-widest uppercase text-warm-gray">Account</h3>
              <div className="space-y-3">
                {[
                  { label: 'Name', value: user.name },
                  { label: 'Email', value: user.email },
                  { label: 'Member since', value: String(memberYear) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body text-2xs tracking-wide text-stone uppercase">{label}</p>
                    <p className="font-body text-sm text-charcoal mt-0.5 break-all">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </aside>
        </div>
      </div>
    </div>
  );
}
