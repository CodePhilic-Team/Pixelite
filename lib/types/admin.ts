/**
 * Admin Panel TypeScript Types
 * Centralized type definitions for admin dashboard, orders, customers, and inventory.
 */

// ─── Dashboard Types ────────────────────────────────────────────────────────

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueChange: number; // percentage change from previous period
  ordersChange: number;
  customersChange: number;
  productsChange: number;
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  id: string;
  name: string;
  image: string;
  sold: number;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  salesData: SalesDataPoint[];
  topProducts: TopProduct[];
  recentOrders: Order[];
}

// ─── Order Types ────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variant: string;
  quantity: number;
  priceInCents: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotalInCents: number;
  shippingInCents: number;
  taxInCents: number;
  totalInCents: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// ─── Customer Types ─────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  totalOrders: number;
  totalSpentInCents: number;
  address?: Address;
  createdAt: string;
  lastOrderAt?: string;
  status: 'active' | 'inactive';
}

// ─── Product Admin Types ────────────────────────────────────────────────────

export interface ProductAdmin {
  id: string;
  slug: string;
  name: string;
  category: string;
  priceInCents: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
  image: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Stock/Inventory Types ──────────────────────────────────────────────────

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface StockItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  variant: string;
  quantity: number;
  reorderLevel: number;
  status: StockStatus;
  lastRestocked?: string;
}

// ─── Analytics Types ────────────────────────────────────────────────────────

export interface AnalyticsOverview {
  visitors: number;
  pageViews: number;
  conversionRate: number;
  averageOrderValue: number;
}

// ─── Sidebar Navigation Types ───────────────────────────────────────────────

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}
