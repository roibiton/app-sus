import { noteService } from './../services/note.service.js';
import { NoteList } from '../cmps/note-list.jsx';
import { noteEdit } from '../cmps/note-edit.jsx';

const { Link } = ReactRouterDOM

export class NoteApp extends React.Component {
        
    state = {
        notes: [],
    }

    componentDidMount() {
        this.loadNotes()
    }
    loadNotes = () => {
        noteService.query()
            .then(notes => this.setState({ notes }))
    }

    render() {
        const { notes } = this.state
        return <section className="note-app">
            {/* <Link to="/note/edit"><button>Add note</button></Link> */}
            <NoteList notes = {notes} />
        </section>
    }
}