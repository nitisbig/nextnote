import { useState, useEffect } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('notes');
      if (saved) {
        try {
          setNotes(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse notes', e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNotes([...notes, { id: Date.now(), text: trimmed }]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <main style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1>NextNote</h1>
      <div style={{ marginBottom: '1rem' }}>
        <textarea
          style={{ width: '100%', height: '100px' }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your note here"
        />
        <button onClick={addNote} style={{ marginTop: '0.5rem' }}>
          Add Note
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{note.text}</span>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
