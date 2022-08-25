import { noteService } from "../services/note.service.js"
import { NoteList } from "./note-list.jsx";
import { utilService } from "../../../services/util.service.js";

export class EditList extends React.Component {

    

    state = {
        note: {
            id: 'test',
            title: '',
            info: { txt: '' },
            type: 'note-txt'
        }
    }

    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const prop = target.name
        const val = target.type === 'select-one' ? +target.value : target.value

        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                [prop]: val
            }
        }))
        console.log(this.state.note)
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const note = this.state.note
        console.log('submit note', note)
        console.log(noteService.gNotes, 'gNotes')
        noteService.gNotes.push(note)
        noteService._saveToStorage(noteService.gNotes)
        return noteService.query()
            .then((notes) => {
                return <NoteList notes={notes} />
            })
    }

    render() {
        const { note } = this.props
        const { title, txt } = this.state.note

        return <section className="note-container">
            <div className="note-submit">
                <h2>Write a note</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="input-field">
                        <label htmlFor="title">title </label>
                        <input
                            ref={this.inputRef}
                            type="text"
                            placeholder="title..."
                            id="title"
                            value={title}
                            name="title"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label htmlFor="review-txt">Write something </label>
                        <textarea
                            type="textarea"
                            placeholder="text..."
                            id="review-txt"
                            value={txt}
                            name="txt"
                            onChange={this.handleChange}
                        />
                    </div>

                    <button className="btn btn-review">Submit</button>
                </form>
            </div>
        </section >
    }
}