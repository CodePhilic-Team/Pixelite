import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminState {
  /** Whether the sidebar is expanded (desktop) or visible (mobile) */
  sidebarOpen: boolean;
  /** Whether the sidebar is collapsed to icons-only mode on desktop */
  sidebarCollapsed: boolean;
  /** Toggle sidebar open/closed (mobile) */
  toggleSidebar: () => void;
  /** Set sidebar open state directly */
  setSidebarOpen: (open: boolean) => void;
  /** Toggle sidebar collapsed state (desktop) */
  toggleCollapsed: () => void;
  /** Set collapsed state directly */
  setCollapsed: (collapsed: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    }),
    {
      name: 'pixelite-admin',
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
    }
  )
);
