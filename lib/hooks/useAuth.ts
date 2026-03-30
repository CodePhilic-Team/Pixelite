'use client';

import { useAuthStore } from '@/lib/store/auth.store';

/**
 * Convenience hook for authentication state and actions.
 * Wraps the Zustand auth store.
 */
export function useAuth() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  return { isAuthenticated, user, login, logout };
}
