import { noteService } from "../services/note.service.js"
import { NoteList } from "./note-list.jsx";
import { utilService } from "../../../services/util.service.js";



export class EditList extends React.Component {

    state = {
        note: {
            id: '',
            url: '',
            title: '',
            info: { txt: '', },
            type: 'note-txt',
            newTxt: '',
            backgroundColor: 'lightblue'

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
    }

    onSubmitNote = (ev) => {
        ev.preventDefault()
        const note = this.state.note
        const info = this.state.note.info
        const notes = noteService._loadFromStorage()
        note.id = utilService.makeId()
        info.txt = this.state.note.newTxt
        notes.push(note)
        noteService._saveToStorage(notes)
        this.props.loadNotes()
    }

    uploadPhoto = (ev) => {
        ev.preventDefault()
        const note = this.state.note
        const info = this.state.note.info
        const notes = noteService._loadFromStorage()
        note.id = utilService.makeId()
        note.type = "note-img"
        info.url = note.url
        notes.push(note)
        noteService._saveToStorage(notes)
        this.props.loadNotes()

        console.log(note)
        // const note = this.state.note
        // console.log(note.url)
        // note.type = "note-img"

    }

    render() {
        const { title, newTxt, url } = this.state.note

        return <section className="note-submit">
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
                        <label htmlFor="txt">Write something </label>
                        <textarea
                            type="textarea"
                            placeholder="text..."
                            id="newTxt"
                            value={newTxt}
                            name="newTxt"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button className="submit-btn" onClick={this.onSubmitNote} >Submit</button>  
                    <input
                            type="text"
                            placeholder="url..."
                            id="url"
                            value={url}
                            name="url"
                            onChange={this.handleChange}
                        />
                    <button onClick={this.uploadPhoto} >Submit photo</button>

                </form>
            </section>
    }
}