'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  Boxes,
  BarChart3,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAdminStore } from '@/lib/store/admin.store';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin/Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', href: '/admin/customers', icon: Users },
  { id: 'products', label: 'Products', href: '/admin/products', icon: Package },
  { id: 'stocks', label: 'Inventory', href: '/admin/stocks', icon: Boxes },
  { id: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

const bottomNavItems: NavItem[] = [
  { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
];

/**
 * AdminSidebar - Collapsible navigation sidebar for admin panel
 * - Full sidebar on desktop (collapsible to icons)
 * - Overlay drawer on mobile
 */
export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, toggleCollapsed } = useAdminStore();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-ink)]/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-[var(--color-ink)] text-[var(--color-ivory)]',
          'transition-all duration-300 ease-in-out',
          'w-72',
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-72',
          // Mobile: fixed drawer overlay behavior
          'fixed inset-y-0 left-0 z-50',
          // Desktop: static positioning in flex flow (overrides fixed for lg+ screens)
          'lg:static lg:z-0 lg:inset-auto lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={cn(
              'flex h-16 items-center border-b border-[var(--color-charcoal)]/50 px-5',
              sidebarCollapsed ? 'lg:justify-center lg:px-3' : 'justify-between'
            )}
          >
            {!sidebarCollapsed && (
              <Link href="/admin/Dashboard" className="flex items-center gap-3">
                <span className="font-display text-2xl font-semibold tracking-wide text-[var(--color-gold)]">
                  Pixelite
                </span>
                <span className="text-sm text-[var(--color-warm-gray)]">Admin</span>
              </Link>
            )}
            {sidebarCollapsed && (
              <Link href="/admin/Dashboard" className="flex items-center justify-center">
                <span className="font-display text-2xl font-semibold text-[var(--color-gold)]">P</span>
              </Link>
            )}

            {/* Close button - mobile only */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="cursor-pointer rounded-lg p-2 text-[var(--color-warm-gray)] hover:bg-[var(--color-charcoal)]/50 hover:text-[var(--color-ivory)] lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'group flex items-center gap-4 rounded-lg px-4 py-3.5 text-base font-medium transition-all duration-200',
                      isActive(item.href)
                        ? 'bg-[var(--color-gold)]/15 text-[var(--color-gold)]'
                        : 'text-[var(--color-stone)] hover:bg-[var(--color-charcoal)]/50 hover:text-[var(--color-ivory)]',
                      sidebarCollapsed && 'lg:justify-center lg:px-3'
                    )}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={1.8}
                      className={cn(
                        'shrink-0 transition-colors',
                        isActive(item.href)
                          ? 'text-[var(--color-gold)]'
                          : 'text-[var(--color-warm-gray)] group-hover:text-[var(--color-ivory)]'
                      )}
                    />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                    {sidebarCollapsed && (
                      <span className="sr-only">{item.label}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-[var(--color-charcoal)]/50 px-4 py-5">
            <ul className="space-y-2">
              {bottomNavItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'group flex items-center gap-4 rounded-lg px-4 py-3.5 text-base font-medium transition-all duration-200',
                      isActive(item.href)
                        ? 'bg-[var(--color-gold)]/15 text-[var(--color-gold)]'
                        : 'text-[var(--color-stone)] hover:bg-[var(--color-charcoal)]/50 hover:text-[var(--color-ivory)]',
                      sidebarCollapsed && 'lg:justify-center lg:px-3'
                    )}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={1.8}
                      className={cn(
                        'shrink-0 transition-colors',
                        isActive(item.href)
                          ? 'text-[var(--color-gold)]'
                          : 'text-[var(--color-warm-gray)] group-hover:text-[var(--color-ivory)]'
                      )}
                    />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}

              {/* Logout */}
              <li>
                <Link
                  href="/admin/login"
                  className={cn(
                    'group flex items-center gap-4 rounded-lg px-4 py-3.5 text-base font-medium text-[var(--color-stone)] transition-all duration-200 hover:bg-[var(--color-charcoal)]/50 hover:text-[var(--color-ivory)]',
                    sidebarCollapsed && 'lg:justify-center lg:px-3'
                  )}
                >
                  <LogOut
                    size={22}
                    strokeWidth={1.8}
                    className="shrink-0 text-[var(--color-warm-gray)] transition-colors group-hover:text-[var(--color-ivory)]"
                  />
                  {!sidebarCollapsed && <span>Logout</span>}
                </Link>
              </li>
            </ul>

            {/* Collapse Toggle - Desktop only */}
            <button
              onClick={toggleCollapsed}
              className={cn(
                'mt-5 hidden w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-[var(--color-charcoal)]/50 py-2.5 text-sm text-[var(--color-warm-gray)] transition-colors hover:border-[var(--color-stone)] hover:text-[var(--color-ivory)] lg:flex',
                sidebarCollapsed && 'px-3'
              )}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight size={18} />
              ) : (
                <>
                  <ChevronLeft size={18} />
                  <span>Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
