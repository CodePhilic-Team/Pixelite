'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import AdminHeader from '@/components/layout/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * AdminLayout - Main layout wrapper for all admin pages
 * Provides sidebar navigation and header with responsive behavior
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();

  // Hide sidebar and header on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-ivory)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area with header and scrollable content */}
      <div
        className="flex min-w-0 flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out"
      >
        {/* Header */}
        <AdminHeader />

        {/* Page content - scrollable */}
        <main className="flex-1 overflow-y-auto bg-[var(--color-ivory)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}