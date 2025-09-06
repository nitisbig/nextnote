import './globals.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'NextNote',
  description: 'Modern note-taking app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
