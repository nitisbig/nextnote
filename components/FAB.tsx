import Link from 'next/link';

export default function FAB() {
  return (
    <Link
      href="/note/new"
      aria-label="Create new note"
      className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700"
    >
      +
    </Link>
  );
}

