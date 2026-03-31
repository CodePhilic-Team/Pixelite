'use client';

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';
import dashboardData from '@/lib/data/dashboard.json';
import ordersData from '@/lib/data/orders.json';
import type { Order, OrderStatus } from '@/lib/types/admin';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  iconBg: string;
}

function StatCard({ title, value, change, icon: Icon, iconBg }: StatCardProps) {
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
        <span className="text-xs text-[var(--color-warm-gray)]">vs last month</span>
      </div>
    </div>
  );
}

function getStatusIcon(status: OrderStatus) {
  switch (status) {
    case 'pending':
      return Clock;
    case 'processing':
      return Package;
    case 'shipped':
      return Truck;
    case 'delivered':
      return CheckCircle;
    case 'cancelled':
      return XCircle;
    default:
      return Clock;
  }
}

function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'processing':
      return 'bg-blue-100 text-blue-700';
    case 'shipped':
      return 'bg-purple-100 text-purple-700';
    case 'delivered':
      return 'bg-green-100 text-green-700';
    case 'cancelled':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export default function DashboardPage() {
  const { stats, topProducts } = dashboardData;
  const recentOrders = (ordersData.orders as Order[]).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Dashboard</h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          change={stats.revenueChange}
          icon={DollarSign}
          iconBg="bg-[var(--color-gold)]"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersChange}
          icon={ShoppingCart}
          iconBg="bg-blue-500"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change={stats.customersChange}
          icon={Users}
          iconBg="bg-green-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          change={stats.productsChange}
          icon={Package}
          iconBg="bg-purple-500"
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div
          className={cn(
            'rounded-lg border border-[var(--color-stone)]/30 bg-white lg:col-span-2'
          )}
        >
          <div className="flex items-center justify-between border-b border-[var(--color-stone)]/30 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
              Recent Orders
            </h2>
            <a
              href="/admin/orders"
              className={cn(
                'flex items-center gap-1 text-sm text-[var(--color-gold)]',
                'transition-colors hover:text-[var(--color-gold-light)]'
              )}
            >
              View all
              <ArrowRight size={14} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[var(--color-stone)]/20">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Order
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Customer
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Status
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-stone)]/10">
                {recentOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-[var(--color-cream)]/30"
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-sm text-[var(--color-charcoal)]">
                          {order.orderNumber}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-sm font-medium text-[var(--color-charcoal)]">
                            {order.customerName}
                          </p>
                          <p className="text-xs text-[var(--color-warm-gray)]">
                            {order.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize',
                            getStatusColor(order.status)
                          )}
                        >
                          <StatusIcon size={12} />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="font-mono text-sm text-[var(--color-charcoal)]">
                          {formatPrice(order.totalInCents)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
          <div className="flex items-center justify-between border-b border-[var(--color-stone)]/30 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
              Top Products
            </h2>
            <a
              href="/admin/products"
              className={cn(
                'flex items-center gap-1 text-sm text-[var(--color-gold)]',
                'transition-colors hover:text-[var(--color-gold-light)]'
              )}
            >
              View all
              <ArrowRight size={14} />
            </a>
          </div>
          <div className="divide-y divide-[var(--color-stone)]/10">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-[var(--color-cream)]/30"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream)] font-mono text-xs text-[var(--color-charcoal)]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--color-charcoal)]">
                    {product.name}
                  </p>
                  <p className="text-xs text-[var(--color-warm-gray)]">{product.sold} sold</p>
                </div>
                <span className="shrink-0 font-mono text-sm text-[var(--color-charcoal)]">
                  {formatPrice(product.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className={cn(
          'rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/30 p-5'
        )}
      >
        <h3 className="mb-4 font-display text-lg font-semibold text-[var(--color-ink)]">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/products"
            className={cn(
              'rounded-md border border-[var(--color-charcoal)] bg-[var(--color-charcoal)] px-4 py-2',
              'text-sm font-medium text-[var(--color-ivory)] transition-colors',
              'hover:bg-[var(--color-ink)]'
            )}
          >
            Add New Product
          </a>
          <a
            href="/admin/orders"
            className={cn(
              'rounded-md border border-[var(--color-stone)] bg-white px-4 py-2',
              'text-sm font-medium text-[var(--color-charcoal)] transition-colors',
              'hover:bg-[var(--color-cream)]'
            )}
          >
            View All Orders
          </a>
          <a
            href="/admin/customers"
            className={cn(
              'rounded-md border border-[var(--color-stone)] bg-white px-4 py-2',
              'text-sm font-medium text-[var(--color-charcoal)] transition-colors',
              'hover:bg-[var(--color-cream)]'
            )}
          >
            Manage Customers
          </a>
          <a
            href="/admin/stocks"
            className={cn(
              'rounded-md border border-[var(--color-stone)] bg-white px-4 py-2',
              'text-sm font-medium text-[var(--color-charcoal)] transition-colors',
              'hover:bg-[var(--color-cream)]'
            )}
          >
            Check Inventory
          </a>
        </div>
      </div>
    </div>
  );
}
