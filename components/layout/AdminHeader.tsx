 'use client';

import { Menu, Bell, Search, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAdminStore } from '@/lib/store/admin.store';
import { useState, useRef, useEffect } from 'react';

interface AdminHeaderProps {
  /** Optional page title to display */
  title?: string;
}

/**
 * AdminHeader - Top header bar for admin panel
 * Features hamburger menu toggle, search, notifications, and user menu
 */
export default function AdminHeader({ title }: AdminHeaderProps) {
  const { toggleSidebar, toggleCollapsed, sidebarCollapsed } = useAdminStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close user menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b',
        'border-[var(--color-stone)]/30 bg-[var(--color-ivory)] px-4',
        'sm:px-6 lg:px-8'
      )}
    >
      {/* Left section */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={toggleSidebar}
          className={cn(
            'rounded-md p-2 text-[var(--color-charcoal)] transition-colors',
            'hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]',
            'lg:hidden'
          )}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Desktop collapse toggle (shown when sidebar is collapsed) */}
        {sidebarCollapsed && (
          <button
            onClick={toggleCollapsed}
            className={cn(
              'hidden rounded-md p-2 text-[var(--color-charcoal)] transition-colors',
              'hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]',
              'lg:block'
            )}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Page title */}
        {title && (
          <h1 className="hidden font-display text-xl font-semibold text-[var(--color-ink)] sm:block">
            {title}
          </h1>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-warm-gray)]"
          />
          <input
            type="search"
            placeholder="Search..."
            className={cn(
              'h-9 w-40 rounded-md border border-[var(--color-stone)]/50 bg-[var(--color-cream)]/50',
              'pl-9 pr-3 text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
              'transition-all duration-200 focus:w-56 focus:border-[var(--color-gold)]',
              'focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          />
        </div>

        {/* Mobile search button */}
        <button
          className={cn(
            'rounded-md p-2 text-[var(--color-charcoal)] transition-colors',
            'hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]',
            'sm:hidden'
          )}
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          className={cn(
            'relative rounded-md p-2 text-[var(--color-charcoal)] transition-colors',
            'hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]'
          )}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {/* Notification badge */}
          <span
            className={cn(
              'absolute right-1 top-1 h-2 w-2 rounded-full',
              'bg-[var(--color-gold)] ring-2 ring-[var(--color-ivory)]'
            )}
          />
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={cn(
              'flex items-center gap-2 rounded-md p-1.5 transition-colors',
              'hover:bg-[var(--color-cream)]',
              userMenuOpen && 'bg-[var(--color-cream)]'
            )}
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full',
                'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
              )}
            >
              <User size={16} />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-[var(--color-charcoal)]">Admin</p>
              <p className="text-xs text-[var(--color-warm-gray)]">admin@pixelite.com</p>
            </div>
            <ChevronDown
              size={16}
              className={cn(
                'hidden text-[var(--color-warm-gray)] transition-transform sm:block',
                userMenuOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown menu */}
          {userMenuOpen && (
            <div
              className={cn(
                'absolute right-0 top-full mt-2 w-48 rounded-md border',
                'border-[var(--color-stone)]/30 bg-[var(--color-ivory)] py-1 shadow-lg'
              )}
            >
              <a
                href="/admin/profile"
                className={cn(
                  'block px-4 py-2 text-sm text-[var(--color-charcoal)]',
                  'hover:bg-[var(--color-cream)]'
                )}
              >
                Your Profile
              </a>
              <a
                href="/admin/settings"
                className={cn(
                  'block px-4 py-2 text-sm text-[var(--color-charcoal)]',
                  'hover:bg-[var(--color-cream)]'
                )}
              >
                Settings
              </a>
              <hr className="my-1 border-[var(--color-stone)]/30" />
              <a
                href="/admin/login"
                className={cn(
                  'block px-4 py-2 text-sm text-[var(--color-charcoal)]',
                  'hover:bg-[var(--color-cream)]'
                )}
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
