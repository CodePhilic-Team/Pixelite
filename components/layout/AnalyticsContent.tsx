'use client';

import { TrendingUp, TrendingDown, Users, Eye, ShoppingCart, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';

export default function AnalyticsContent() {
  // Mock analytics data
  const analytics = {
    visitors: 12847,
    visitorsChange: 8.5,
    pageViews: 45621,
    pageViewsChange: 12.3,
    conversionRate: 3.2,
    conversionRateChange: -0.4,
    averageOrderValue: 12500,
    averageOrderValueChange: 5.2,
  };

  const topPages = [
    { path: '/', title: 'Home', views: 8456, percentage: 28 },
    { path: '/shop', title: 'Shop', views: 6234, percentage: 21 },
    { path: '/product/leather-tote', title: 'Artisan Leather Tote', views: 3421, percentage: 12 },
    { path: '/product/cashmere-wrap', title: 'Silk Cashmere Wrap', views: 2876, percentage: 10 },
    { path: '/about', title: 'About Us', views: 1954, percentage: 7 },
  ];

  const trafficSources = [
    { source: 'Direct', visits: 4521, percentage: 35, color: 'bg-blue-500' },
    { source: 'Organic Search', visits: 3867, percentage: 30, color: 'bg-green-500' },
    { source: 'Social Media', visits: 2456, percentage: 19, color: 'bg-purple-500' },
    { source: 'Referral', visits: 1289, percentage: 10, color: 'bg-amber-500' },
    { source: 'Email', visits: 714, percentage: 6, color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Analytics</h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Store performance and visitor insights
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Visitors"
          value={analytics.visitors.toLocaleString()}
          change={analytics.visitorsChange}
          icon={Users}
          iconBg="bg-blue-500"
        />
        <MetricCard
          title="Page Views"
          value={analytics.pageViews.toLocaleString()}
          change={analytics.pageViewsChange}
          icon={Eye}
          iconBg="bg-purple-500"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analytics.conversionRate}%`}
          change={analytics.conversionRateChange}
          icon={ShoppingCart}
          iconBg="bg-green-500"
        />
        <MetricCard
          title="Avg. Order Value"
          value={formatPrice(analytics.averageOrderValue)}
          change={analytics.averageOrderValueChange}
          icon={DollarSign}
          iconBg="bg-[var(--color-gold)]"
        />
      </div>

      {/* Charts placeholder */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic chart placeholder */}
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
            Traffic Overview
          </h2>
          <p className="mt-1 text-xs text-[var(--color-warm-gray)]">Last 7 days</p>
          <div className="mt-6 flex h-48 items-center justify-center rounded-lg bg-[var(--color-cream)]/50">
            <p className="text-sm text-[var(--color-warm-gray)]">
              Chart visualization placeholder
            </p>
          </div>
        </div>

        {/* Sales chart placeholder */}
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white p-5">
          <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
            Sales Trend
          </h2>
          <p className="mt-1 text-xs text-[var(--color-warm-gray)]">Last 7 days</p>
          <div className="mt-6 flex h-48 items-center justify-center rounded-lg bg-[var(--color-cream)]/50">
            <p className="text-sm text-[var(--color-warm-gray)]">
              Chart visualization placeholder
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top pages */}
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
          <div className="border-b border-[var(--color-stone)]/20 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
              Top Pages
            </h2>
          </div>
          <div className="divide-y divide-[var(--color-stone)]/10">
            {topPages.map((page) => (
              <div key={page.path} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--color-charcoal)]">
                    {page.title}
                  </p>
                  <p className="text-xs text-[var(--color-warm-gray)]">{page.path}</p>
                </div>
                <div className="ml-4 flex items-center gap-4">
                  <span className="font-mono text-sm text-[var(--color-charcoal)]">
                    {page.views.toLocaleString()}
                  </span>
                  <div className="w-24">
                    <div className="h-2 rounded-full bg-[var(--color-cream)]">
                      <div
                        className="h-2 rounded-full bg-[var(--color-gold)]"
                        style={{ width: `${page.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
          <div className="border-b border-[var(--color-stone)]/20 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
              Traffic Sources
            </h2>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-charcoal)]">{source.source}</span>
                    <span className="font-mono text-[var(--color-charcoal)]">
                      {source.visits.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-[var(--color-cream)]">
                    <div
                      className={cn('h-2 rounded-full', source.color)}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  iconBg: string;
}

function MetricCard({ title, value, change, icon: Icon, iconBg }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div
      className={cn(
        'rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-5',
        'transition-shadow duration-200 hover:shadow-md'
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[var(--color-warm-gray)]">{title}</p>
          <p className="mt-1 font-mono text-2xl font-semibold text-[var(--color-ink)]">
            {value}
          </p>
        </div>
        <div className={cn('rounded-lg p-2.5', iconBg)}>
          <Icon size={20} className="text-[var(--color-ivory)]" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp size={14} className="text-green-600" />
        ) : (
          <TrendingDown size={14} className="text-red-500" />
        )}
        <span
          className={cn('text-xs font-medium', isPositive ? 'text-green-600' : 'text-red-500')}
        >
          {isPositive ? '+' : ''}
          {change}%
        </span>
        <span className="text-xs text-[var(--color-warm-gray)]">vs last period</span>
      </div>
    </div>
  );
}
