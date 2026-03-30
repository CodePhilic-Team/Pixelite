'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthUser {
  name: string;
  email: string;
  /** Avatar initials derived from name */
  initials: string;
  memberSince: string; // ISO date string
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (user: Omit<AuthUser, 'initials'>) => void;
  logout: () => void;
}

function toInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      login: (userData) =>
        set({
          isAuthenticated: true,
          user: {
            ...userData,
            memberSince: userData.memberSince ?? new Date().toISOString(),
            initials: toInitials(userData.name),
          },
        }),

      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    { name: 'pixelite-auth' }
  )
);
