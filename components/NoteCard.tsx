import Link from 'next/link';

interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
}

export default function NoteCard({ id, title, preview, updatedAt }: NoteCardProps) {
  return (
    <Link
      href={`/note/${id}`}
      className="block p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 overflow-hidden text-ellipsis">
        {preview}
      </p>
      <span className="text-xs text-gray-500">{updatedAt}</span>
    </Link>
  );
}
