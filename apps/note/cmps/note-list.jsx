import { NotePreview } from './Note-preview.jsx';

export function NoteList({ notes, onRemoveNote }) {

    return <section className="note-list-display note-list-layout">
            {notes.map(note =>
            
                    <div className="note-preview" key={note.id}>
                        <button className="exit-button" onClick={() => onRemoveNote(note.id)}>X</button>
                        <NotePreview
                            note={note} />
                        
                    </div>)
            }
    </section>
}

