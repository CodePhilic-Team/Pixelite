'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';
import ordersData from '@/lib/data/orders.json';
import type { Order, OrderStatus, PaymentStatus } from '@/lib/types/admin';

const statusOptions: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

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

function getPaymentColor(status: PaymentStatus): string {
  switch (status) {
    case 'paid':
      return 'text-green-600';
    case 'pending':
      return 'text-amber-600';
    case 'failed':
      return 'text-red-600';
    case 'refunded':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function OrdersContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const orders = ordersData.orders as Order[];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: orders.length };
    statusOptions.forEach((status) => {
      counts[status] = orders.filter((o) => o.status === status).length;
    });
    return counts;
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Orders</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]"
          />
          <input
            type="search"
            placeholder="Search by order #, customer name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 bg-white pl-10 pr-4',
              'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          />
        </div>

        {/* Status filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
              statusFilter === 'all'
                ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-stone)]/30'
            )}
          >
            All
            <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
              {statusCounts.all}
            </span>
          </button>
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                statusFilter === status
                  ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                  : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-stone)]/30'
              )}
            >
              {status}
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                {statusCounts[status]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders table */}
      <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--color-stone)]/20 bg-[var(--color-cream)]/30">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Order
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Items
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Payment
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Total
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Date
                </th>
                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-stone)]/10">
              {filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-[var(--color-cream)]/30"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-[var(--color-charcoal)]">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-[var(--color-charcoal)]">
                          {order.customerName}
                        </p>
                        <p className="text-xs text-[var(--color-warm-gray)]">
                          {order.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-[var(--color-charcoal)]">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-5 py-4">
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
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          'text-xs font-medium capitalize',
                          getPaymentColor(order.paymentStatus)
                        )}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-mono text-sm text-[var(--color-charcoal)]">
                        {formatPrice(order.totalInCents)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs text-[var(--color-warm-gray)]">
                        {formatDate(order.createdAt)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        className={cn(
                          'inline-flex cursor-pointer items-center gap-1 rounded-md px-2.5 py-1.5',
                          'text-xs font-medium text-[var(--color-charcoal)]',
                          'bg-[var(--color-cream)]/50 hover:bg-[var(--color-cream)]',
                          'transition-colors'
                        )}
                        aria-label={`View order ${order.orderNumber}`}
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Package size={40} className="mx-auto text-[var(--color-stone)]" />
            <h3 className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">No orders found</h3>
            <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}

        {/* Pagination placeholder */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between border-t border-[var(--color-stone)]/20 px-5 py-3">
            <p className="text-sm text-[var(--color-warm-gray)]">
              Showing <span className="font-medium text-[var(--color-charcoal)]">{filteredOrders.length}</span> of{' '}
              <span className="font-medium text-[var(--color-charcoal)]">{orders.length}</span> orders
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled
                className={cn(
                  'rounded-md border border-[var(--color-stone)]/50 px-3 py-1.5',
                  'text-sm text-[var(--color-warm-gray)]',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              >
                Previous
              </button>
              <button
                disabled
                className={cn(
                  'rounded-md border border-[var(--color-stone)]/50 px-3 py-1.5',
                  'text-sm text-[var(--color-warm-gray)]',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
