import NoteCard from '../components/NoteCard';

const mockNotes = [
  {
    id: '1',
    title: 'Welcome to NextNote',
    preview: 'This is an example note. Start writing your thoughts... ',
    updatedAt: '2023-10-05',
  },
  {
    id: '2',
    title: 'Another Note',
    preview: 'Notes support **markdown** formatting.',
    updatedAt: '2023-10-06',
  },
];

export default function Home() {
  return (
    <div className="relative">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockNotes.map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </div>
      <a
        href="/note/new"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl shadow-lg hover:bg-blue-700"
      >
        +
      </a>
    </div>
  );
}
