import { noteService } from './../services/note.service.js';
import { NoteList } from '../cmps/note-list.jsx';
import { EditList } from '../cmps/note-edit.jsx'

const { Link } = ReactRouterDOM

export class NoteApp extends React.Component {
        
    state = {
        notes: [],
        isBounce:false
    }

    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.noteId !== this.props.match.params.noteId) {
            this.loadCar()
        }
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }

    onRemoveNote = (noteId) => {
        noteService.remove(noteId)            
        .then(() => {
            console.log('Removed!')
            const notes = this.state.notes.filter(note => note.id !== noteId)
            this.setState({ notes, isBounce: true})
            setTimeout(()=>{
                this.setState({ isBounce: false })
            }, 500)
        })
        .catch(err => {
            console.log('Problem!!', err)
        })
    }

    render() {
        const { notes } = this.state
        console.log('notes',notes)
        const { onRemoveNote } = this
        return <section className="note-app">
            {/* <Link to="/note/edit"><button>Add note</button></Link> */}
            <EditList onRemoveNote={onRemoveNote}/>
            <NoteList notes = {notes} onRemoveNote={onRemoveNote} />
            <Link to="/note/edit"><button>edit</button></Link>
        </section>
    }
}