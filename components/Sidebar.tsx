'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Notes' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/trash', label: 'Trash' },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden sm:flex sm:w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <h2 className="text-xl font-semibold mb-6">NextNote</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
              pathname === link.href ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
