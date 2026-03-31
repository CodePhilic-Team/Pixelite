'use client';

import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import Button from '@/components/ui/Button';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance' | 'general';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'general', label: 'General', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-ink)]">Settings</h1>
        <p className="mt-1 text-sm text-[var(--color-warm-gray)]">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar tabs */}
        <div className="lg:w-56">
          <nav className="flex gap-1 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  activeTab === tab.id
                    ? 'bg-[var(--color-charcoal)] text-[var(--color-ivory)]'
                    : 'text-[var(--color-charcoal)] hover:bg-[var(--color-cream)]'
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1 rounded-lg border border-[var(--color-stone)]/30 bg-white p-6">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'general' && <GeneralSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Profile</h2>
        <p className="text-sm text-[var(--color-warm-gray)]">Update your personal information</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
            First name
          </label>
          <input
            type="text"
            defaultValue="Admin"
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
              'text-sm text-[var(--color-charcoal)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
            Last name
          </label>
          <input
            type="text"
            defaultValue="User"
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
              'text-sm text-[var(--color-charcoal)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
          Email address
        </label>
        <input
          type="email"
          defaultValue="admin@pixelite.com"
          className={cn(
            'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
            'text-sm text-[var(--color-charcoal)]',
            'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
          )}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
          Bio
        </label>
        <textarea
          rows={3}
          defaultValue="Store administrator"
          className={cn(
            'w-full rounded-md border border-[var(--color-stone)]/50 px-3 py-2',
            'text-sm text-[var(--color-charcoal)]',
            'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
          )}
        />
      </div>

      <div className="flex justify-end">
        <Button variant="primary">
          <Save size={16} />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Notifications</h2>
        <p className="text-sm text-[var(--color-warm-gray)]">Configure how you receive alerts</p>
      </div>

      <div className="space-y-4">
        {[
          { id: 'new-orders', label: 'New orders', description: 'Get notified when a new order is placed' },
          { id: 'low-stock', label: 'Low stock alerts', description: 'Alert when products are running low' },
          { id: 'reviews', label: 'New reviews', description: 'Notify when customers leave reviews' },
          { id: 'marketing', label: 'Marketing updates', description: 'Tips and updates from Pixelite' },
        ].map((item) => (
          <div key={item.id} className="flex items-start justify-between rounded-md border border-[var(--color-stone)]/20 p-4">
            <div>
              <p className="text-sm font-medium text-[var(--color-charcoal)]">{item.label}</p>
              <p className="text-xs text-[var(--color-warm-gray)]">{item.description}</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" defaultChecked className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-[var(--color-stone)] after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[var(--color-gold)] peer-checked:after:translate-x-full peer-focus:outline-none" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Security</h2>
        <p className="text-sm text-[var(--color-warm-gray)]">Manage your account security</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-[var(--color-charcoal)]">Change Password</h3>
          <div className="mt-3 space-y-3">
            <input
              type="password"
              placeholder="Current password"
              className={cn(
                'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
                'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
                'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
              )}
            />
            <input
              type="password"
              placeholder="New password"
              className={cn(
                'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
                'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
                'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
              )}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className={cn(
                'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
                'text-sm text-[var(--color-charcoal)] placeholder:text-[var(--color-warm-gray)]',
                'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
              )}
            />
          </div>
        </div>

        <div className="rounded-md border border-[var(--color-stone)]/20 p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--color-charcoal)]">Two-factor authentication</p>
              <p className="text-xs text-[var(--color-warm-gray)]">Add an extra layer of security</p>
            </div>
            <Button variant="outline" className="text-xs">
              Enable
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">
          <Save size={16} />
          Update Security
        </Button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">Appearance</h2>
        <p className="text-sm text-[var(--color-warm-gray)]">Customize how the admin panel looks</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--color-charcoal)]">
            Theme
          </label>
          <div className="flex gap-3">
            {['Light', 'Dark', 'System'].map((theme) => (
              <button
                key={theme}
                className={cn(
                  'cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                  theme === 'Light'
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                    : 'border-[var(--color-stone)]/50 text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]'
                )}
              >
                {theme}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--color-warm-gray)]">
            Dark mode coming soon
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--color-charcoal)]">
            Sidebar behavior
          </label>
          <div className="flex gap-3">
            {['Expanded', 'Collapsed', 'Auto'].map((mode) => (
              <button
                key={mode}
                className={cn(
                  'cursor-pointer rounded-md border px-4 py-2 text-sm font-medium transition-colors',
                  mode === 'Expanded'
                    ? 'border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)]'
                    : 'border-[var(--color-stone)]/50 text-[var(--color-charcoal)] hover:border-[var(--color-charcoal)]'
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">General</h2>
        <p className="text-sm text-[var(--color-warm-gray)]">Store-wide settings</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
            Store name
          </label>
          <input
            type="text"
            defaultValue="Pixelite"
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
              'text-sm text-[var(--color-charcoal)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
            Currency
          </label>
          <select
            defaultValue="USD"
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
              'text-sm text-[var(--color-charcoal)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--color-charcoal)]">
            Timezone
          </label>
          <select
            defaultValue="America/New_York"
            className={cn(
              'h-10 w-full rounded-md border border-[var(--color-stone)]/50 px-3',
              'text-sm text-[var(--color-charcoal)]',
              'focus:border-[var(--color-gold)] focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]'
            )}
          >
            <option value="America/New_York">Eastern Time (ET)</option>
            <option value="America/Chicago">Central Time (CT)</option>
            <option value="America/Denver">Mountain Time (MT)</option>
            <option value="America/Los_Angeles">Pacific Time (PT)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">
          <Save size={16} />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
