'use client';

import { useState, useMemo } from 'react';
import { Search, Mail, Phone, MapPin, User, Eye } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';
import customersData from '@/lib/data/customers.json';
import type { Customer } from '@/lib/types/admin';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function CustomersContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const customers = customersData.customers as Customer[];

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (customer.phone?.includes(searchQuery) ?? false);

      const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: customers.length,
      active: customers.filter((c) => c.status === 'active').length,
      inactive: customers.filter((c) => c.status === 'inactive').length,
      totalSpent: customers.reduce((sum, c) => sum + c.totalSpentInCents, 0),
    };
  }, [customers]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Customers</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            View and manage your customer base
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Total Customers</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-ink)]">
            {stats.total.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Active</p>
          <p className="mt-1 font-mono text-xl font-semibold text-green-600">
            {stats.active.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Inactive</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-warm-gray)]">
            {stats.inactive.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Total Revenue</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-gold)]">
            {formatPrice(stats.totalSpent)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]"
          />
          <input
            type="search"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 bg-white pl-10 pr-4',
              'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors',
                statusFilter === status
                  ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                  : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-stone)]/30'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Customers table */}
      <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[var(--color-stone)]/20 bg-[var(--color-cream)]/30">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Customer
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Contact
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Location
                </th>
                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Orders
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Total Spent
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Joined
                </th>
                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-stone)]/10">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="transition-colors hover:bg-[var(--color-cream)]/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                          'bg-[var(--color-cream)] text-[var(--color-charcoal)]'
                        )}
                      >
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[var(--color-charcoal)]">
                          {customer.firstName} {customer.lastName}
                        </p>
                        <p className="text-xs text-[var(--color-warm-gray)]">
                          ID: {customer.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm text-[var(--color-charcoal)]">
                        <Mail size={12} className="text-[var(--color-warm-gray)]" />
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-warm-gray)]">
                          <Phone size={12} />
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {customer.address && (
                      <div className="flex items-start gap-1.5 text-sm text-[var(--color-charcoal)]">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-[var(--color-warm-gray)]" />
                        <span>
                          {customer.address.city}, {customer.address.state}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="font-mono text-sm text-[var(--color-charcoal)]">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="font-mono text-sm text-[var(--color-charcoal)]">
                      {formatPrice(customer.totalSpentInCents)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize',
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-[var(--color-warm-gray)]">
                      {formatDate(customer.createdAt)}
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
                      aria-label={`View customer ${customer.firstName} ${customer.lastName}`}
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredCustomers.length === 0 && (
          <div className="px-5 py-12 text-center">
            <User size={40} className="mx-auto text-[var(--color-stone)]" />
            <h3 className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">
              No customers found
            </h3>
            <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
              Try adjusting your search or filter.
            </p>
          </div>
        )}

        {/* Results count */}
        {filteredCustomers.length > 0 && (
          <div className="border-t border-[var(--color-stone)]/20 px-5 py-3">
            <p className="text-sm text-[var(--color-warm-gray)]">
              Showing{' '}
              <span className="font-medium text-[var(--color-charcoal)]">
                {filteredCustomers.length}
              </span>{' '}
              of{' '}
              <span className="font-medium text-[var(--color-charcoal)]">
                {customers.length}
              </span>{' '}
              customers
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
