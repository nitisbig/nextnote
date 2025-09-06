'use client';

import { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { navLinks } from './Sidebar';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between h-14 md:h-16 px-4">
        <div className="flex items-center gap-2">
          <button
            aria-label="Open menu"
            className="md:hidden h-11 w-11 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
          <Link href="/" className="font-semibold text-lg">
            NextNote
          </Link>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 placeholder-gray-500 focus:outline-none"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="md:hidden h-11 w-11 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSearchOpen(true)}
          >
            🔍
          </button>
          <Link
            href="/note/new"
            className="hidden md:inline-flex px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Note
          </Link>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4">
          <div className="flex items-center gap-2">
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              className="flex-1 p-2 rounded-md bg-gray-100 dark:bg-gray-800 focus:outline-none"
            />
            <button
              aria-label="Close search"
              className="h-11 w-11 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setSearchOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

