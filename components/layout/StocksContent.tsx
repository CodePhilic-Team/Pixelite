'use client';

import { useState, useMemo } from 'react';
import { Search, AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import stocksData from '@/lib/data/stocks.json';
import type { StockItem, StockStatus } from '@/lib/types/admin';

function getStockStatusColor(status: StockStatus): string {
  switch (status) {
    case 'in_stock':
      return 'bg-green-100 text-green-700';
    case 'low_stock':
      return 'bg-amber-100 text-amber-700';
    case 'out_of_stock':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function StocksContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StockStatus | 'all'>('all');

  const stocks = stocksData.stocks as StockItem[];

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const matchesSearch =
        stock.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.variant.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || stock.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [stocks, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: stocks.length,
      inStock: stocks.filter((s) => s.status === 'in_stock').length,
      lowStock: stocks.filter((s) => s.status === 'low_stock').length,
      outOfStock: stocks.filter((s) => s.status === 'out_of_stock').length,
      totalUnits: stocks.reduce((sum, s) => sum + s.quantity, 0),
    };
  }, [stocks]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Inventory</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Monitor and manage stock levels
          </p>
        </div>
        <button
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5',
            'border border-[var(--color-stone)] bg-white text-sm font-medium text-[var(--color-charcoal)]',
            'transition-colors hover:bg-[var(--color-cream)]'
          )}
        >
          <RefreshCw size={16} />
          Update Stock
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Total SKUs</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-ink)]">
            {stats.total}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Total Units</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-ink)]">
            {stats.totalUnits.toLocaleString()}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-green-50 p-4">
          <p className="text-sm text-green-700">In Stock</p>
          <p className="mt-1 font-mono text-xl font-semibold text-green-700">
            {stats.inStock}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-amber-50 p-4">
          <p className="text-sm text-amber-700">Low Stock</p>
          <p className="mt-1 font-mono text-xl font-semibold text-amber-700">
            {stats.lowStock}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-red-50 p-4">
          <p className="text-sm text-red-600">Out of Stock</p>
          <p className="mt-1 font-mono text-xl font-semibold text-red-600">
            {stats.outOfStock}
          </p>
        </div>
      </div>

      {/* Low stock alert */}
      {stats.lowStock > 0 || stats.outOfStock > 0 ? (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle size={20} className="shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">
            <strong>{stats.lowStock + stats.outOfStock}</strong> items need attention.{' '}
            {stats.outOfStock > 0 && (
              <span className="text-red-600">{stats.outOfStock} out of stock. </span>
            )}
            {stats.lowStock > 0 && <span>{stats.lowStock} running low.</span>}
          </p>
        </div>
      ) : null}

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
            placeholder="Search by product, SKU, or variant..."
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
          {(['all', 'in_stock', 'low_stock', 'out_of_stock'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
                statusFilter === status
                  ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                  : 'bg-[var(--color-cream)] text-[var(--color-charcoal)] hover:bg-[var(--color-stone)]/30'
              )}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Stock table */}
      <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--color-stone)]/20 bg-[var(--color-cream)]/30">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Product
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  SKU
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Variant
                </th>
                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Quantity
                </th>
                <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Reorder Level
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                  Last Restocked
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-stone)]/10">
              {filteredStocks.map((stock) => (
                <tr
                  key={stock.id}
                  className={cn(
                    'transition-colors hover:bg-[var(--color-cream)]/30',
                    stock.status === 'out_of_stock' && 'bg-red-50/50'
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-[var(--color-cream)]">
                        <div className="h-full w-full bg-[var(--color-stone)]/20" />
                      </div>
                      <p className="text-sm font-medium text-[var(--color-charcoal)]">
                        {stock.productName}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-[var(--color-charcoal)]">
                      {stock.sku}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-[var(--color-charcoal)]">
                      {stock.variant}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span
                      className={cn(
                        'font-mono text-sm font-medium',
                        stock.quantity === 0
                          ? 'text-red-600'
                          : stock.quantity <= stock.reorderLevel
                            ? 'text-amber-600'
                            : 'text-[var(--color-charcoal)]'
                      )}
                    >
                      {stock.quantity}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="font-mono text-xs text-[var(--color-warm-gray)]">
                      {stock.reorderLevel}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize',
                        getStockStatusColor(stock.status)
                      )}
                    >
                      {stock.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-[var(--color-warm-gray)]">
                      {stock.lastRestocked ? formatDate(stock.lastRestocked) : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStocks.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Package size={40} className="mx-auto text-[var(--color-stone)]" />
            <h3 className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">
              No items found
            </h3>
            <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
              Try adjusting your search or filter.
            </p>
          </div>
        )}

        {filteredStocks.length > 0 && (
          <div className="border-t border-[var(--color-stone)]/20 px-5 py-3">
            <p className="text-sm text-[var(--color-warm-gray)]">
              Showing{' '}
              <span className="font-medium text-[var(--color-charcoal)]">
                {filteredStocks.length}
              </span>{' '}
              of{' '}
              <span className="font-medium text-[var(--color-charcoal)]">
                {stocks.length}
              </span>{' '}
              items
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
