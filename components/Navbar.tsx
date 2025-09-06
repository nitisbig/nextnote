import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-2">
        <h1 className="font-semibold text-lg sm:hidden">NextNote</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 placeholder-gray-500 focus:outline-none"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
