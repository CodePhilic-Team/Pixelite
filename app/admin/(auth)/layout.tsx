/**
 * Auth Layout - No sidebar for login/auth pages
 * This layout overrides the admin layout for authentication routes
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
