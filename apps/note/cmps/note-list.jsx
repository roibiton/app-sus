import { NotePreview } from './Note-preview.jsx';

export function NoteList({ notes, onRemoveNote }) {
    { console.log(notes) }

    return <section className="note-list">
        <ul>
            {
                notes.map(note =>
                    <div className="note-preview" key={note.id}>
                        <NotePreview
                            note={note} />
                        <button onClick={() => onRemoveNote(note.id)}>X</button>
                    </div>)
            }
        </ul>

    </section>
}

