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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockNotes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}
