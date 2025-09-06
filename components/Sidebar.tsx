'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navLinks = [
  { href: '/', label: 'Notes', icon: '📝' },
  { href: '/favorites', label: 'Favorites', icon: '⭐' },
  { href: '/trash', label: 'Trash', icon: '🗑️' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <h2 className="text-xl font-semibold mb-6">NextNote</h2>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                pathname === link.href ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
              }`}
            >
              <span>{link.icon}</span>
              <span className="hidden lg:inline">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 flex justify-around border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center flex-1 h-14 text-xs ${
              pathname === link.href ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            <span className="text-xl" aria-hidden>
              {link.icon}
            </span>
            <span className="mt-1">{link.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
