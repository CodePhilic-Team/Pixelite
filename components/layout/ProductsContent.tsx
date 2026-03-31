'use client';

import { useState, useMemo } from 'react';
import { Search, Package, Plus, Eye, Edit, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/formatPrice';
import { products as productsData } from '@/lib/data/products';
import type { Product } from '@/lib/types/product';

export default function ProductsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const products = productsData as Product[];
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const stats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter((p) => p.stock > 0).length,
      outOfStock: products.filter((p) => p.stock === 0).length,
      lowStock: products.filter((p) => p.stock > 0 && p.stock <= 10).length,
    };
  }, [products]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Products</h1>
          <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
            Manage your product catalog
          </p>
        </div>
        <button
          className={cn(
            'inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5',
            'bg-[var(--color-charcoal)] text-sm font-medium text-[var(--color-ivory)]',
            'transition-colors hover:bg-[var(--color-ink)]'
          )}
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Total Products</p>
          <p className="mt-1 font-mono text-xl font-semibold text-[var(--color-ink)]">
            {stats.total}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">In Stock</p>
          <p className="mt-1 font-mono text-xl font-semibold text-green-600">
            {stats.inStock}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Low Stock</p>
          <p className="mt-1 font-mono text-xl font-semibold text-amber-600">
            {stats.lowStock}
          </p>
        </div>
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-[var(--color-cream)]/50 p-4">
          <p className="text-sm text-[var(--color-warm-gray)]">Out of Stock</p>
          <p className="mt-1 font-mono text-xl font-semibold text-red-600">
            {stats.outOfStock}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]"
            />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                'h-10 w-full rounded-md border border-[var(--color-stone)]/50 bg-white pl-10 pr-4',
                'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
                'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
              )}
            />
          </div>

          {/* Category filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={cn(
              'h-10 rounded-md border border-[var(--color-stone)]/50 bg-white px-3',
              'text-sm text-[var(--color-charcoal)] capitalize',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 rounded-md border border-[var(--color-stone)]/50 bg-white p-1">
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'cursor-pointer rounded p-1.5 transition-colors',
              viewMode === 'list'
                ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                : 'text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]'
            )}
            aria-label="List view"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'cursor-pointer rounded p-1.5 transition-colors',
              viewMode === 'grid'
                ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                : 'text-[var(--color-warm-gray)] hover:text-[var(--color-charcoal)]'
            )}
            aria-label="Grid view"
          >
            <Grid size={16} />
          </button>
        </div>
      </div>

      {/* Products list/grid */}
      {viewMode === 'list' ? (
        <div className="rounded-lg border border-[var(--color-stone)]/30 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-[var(--color-stone)]/20 bg-[var(--color-cream)]/30">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Product
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Category
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Price
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Stock
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Status
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--color-warm-gray)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-stone)]/10">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition-colors hover:bg-[var(--color-cream)]/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--color-cream)]">
                          {product.images?.[0] && (
                            <div className="h-full w-full bg-[var(--color-stone)]/20" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--color-charcoal)]">
                            {product.name}
                          </p>
                          <p className="text-xs text-[var(--color-warm-gray)]">
                            {product.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-[var(--color-cream)] px-2.5 py-1 text-xs capitalize text-[var(--color-charcoal)]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-mono text-sm text-[var(--color-charcoal)]">
                        {formatPrice(product.priceInCents)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={cn(
                          'font-mono text-sm',
                          product.stock === 0
                            ? 'text-red-600'
                            : product.stock <= 10
                              ? 'text-amber-600'
                              : 'text-[var(--color-charcoal)]'
                        )}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {product.isNew && (
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                            NEW
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="rounded bg-[var(--color-gold)]/20 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-gold)]">
                            BESTSELLER
                          </span>
                        )}
                        {product.stock === 0 && (
                          <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-600">
                            OUT OF STOCK
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className={cn(
                            'cursor-pointer rounded p-1.5 text-[var(--color-warm-gray)]',
                            'hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]',
                            'transition-colors'
                          )}
                          aria-label={`View ${product.name}`}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className={cn(
                            'cursor-pointer rounded p-1.5 text-[var(--color-warm-gray)]',
                            'hover:bg-[var(--color-cream)] hover:text-[var(--color-charcoal)]',
                            'transition-colors'
                          )}
                          aria-label={`Edit ${product.name}`}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Package size={40} className="mx-auto text-[var(--color-stone)]" />
              <h3 className="mt-4 text-sm font-medium text-[var(--color-charcoal)]">
                No products found
              </h3>
              <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
                Try adjusting your search or filter.
              </p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="border-t border-[var(--color-stone)]/20 px-5 py-3">
              <p className="text-sm text-[var(--color-warm-gray)]">
                Showing{' '}
                <span className="font-medium text-[var(--color-charcoal)]">
                  {filteredProducts.length}
                </span>{' '}
                products
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={cn(
                'group rounded-lg border border-[var(--color-stone)]/30 bg-white p-4',
                'transition-shadow hover:shadow-md'
              )}
            >
              <div className="aspect-square overflow-hidden rounded-md bg-[var(--color-cream)]">
                <div className="h-full w-full bg-[var(--color-stone)]/20" />
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium text-[var(--color-charcoal)]">
                  {product.name}
                </p>
                <p className="mt-1 text-xs capitalize text-[var(--color-warm-gray)]">
                  {product.category}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-sm text-[var(--color-charcoal)]">
                    {formatPrice(product.priceInCents)}
                  </span>
                  <span
                    className={cn(
                      'text-xs',
                      product.stock === 0
                        ? 'text-red-600'
                        : product.stock <= 10
                          ? 'text-amber-600'
                          : 'text-[var(--color-warm-gray)]'
                    )}
                  >
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
