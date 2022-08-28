import { noteService } from "../services/note.service.js"
import { NoteList } from "./note-list.jsx";
import { utilService } from "../../../services/util.service.js";



export class EditList extends React.Component {

    state = {
        note: {
            id: '',
            url: '',
            title: '',
            info: { txt: '', todos : [{txt:''}],}, 
            type: 'note-txt',
            newTxt: '',
        },
        isTodo: false
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
        info.url = note.url
        info.todos[0].txt = info.txt
        info.title = note.title
        notes.push(note)
        noteService._saveToStorage(notes)
        this.props.loadNotes()
    }


    // uploadPhoto = (ev) => {
    //     ev.preventDefault()
    //     const note = this.state.note
    //     const info = this.state.note.info
    //     const notes = noteService._loadFromStorage()
    //     note.id = utilService.makeId()
    //     note.type = "note-img"
    //     info.url = note.url
    //     notes.push(note)
    //     noteService._saveToStorage(notes)
    //     this.props.loadNotes()

    //     console.log(note.url)
    //     // const note = this.state.note
    //     // console.log(note.url)
    //     // note.type = "note-img"
    // }

    getFileType(filename) {
        let parts = filename.split('.')
        return parts[parts.length - 1]
    }

    loadImageFromInput = (ev) => {   
        ev.preventDefault()
        console.log(ev.target)
        const reader = new FileReader()
        const note = this.state.note
        const info = this.state.note.info
        reader.readAsDataURL(ev.target.files[0])

        reader.onload = () => {
            note.url = '' +  reader.result
        }
        info.url = note.url
        console.log(info.url)

        let filename = ev.target.parentElement[3].value
        let type = this.getFileType(filename)
        type.toLowerCase()
        switch(type) {
            case('gif' || 'jpg' || 'png'):
                note.type = "note-img"
                return
            case('mp4'):
                note.type = "note-video"
                return
            case('mp3'):
                note.type = "note-audio"
                note.aud = "audio/mp3"
                return
            case('wav'):
                note.type = "note-audio"
                note.aud = "audio/wav"
                return
            default:
                note.type = "note-txt"
                return
        }
        // console.log(reader.readAsText(ev.target.files[0]))
        // note.url = reader.readAsDataURL(ev.target.files[0])
        // console.log(note.url)
    }

    // onImgInput(ev) {
        
    //     this.loadImageFromInput(ev)
    //     console.log(ev.target.files,'what')
    // }

    changeSubmitTxt = (ev) => {
        ev.preventDefault()
        const note = this.state.note
        note.type = "note-txt"
    }

    changeSubmitTodo = (ev) => {
        ev.preventDefault()
        const note = this.state.note
        note.type = "note-todos"
    }

    addTodoLine = (ev) => {
        ev.preventDefault()
        const note = this.state.note
        const info = note.info
        const newLine = {txt:note.newTxt}
        info.todos.push(newLine)
    }

    render() {
        const { title, newTxt } = this.state.note
        
        return <section className="note-submit">
                <i className="fa fa-txt fa-files upper-function-buttons" onClick={this.changeSubmitTxt}>/</i>
                <i className="fa fa-todo upper-function-buttons" onClick={this.changeSubmitTodo}></i>
                <i className="fa fa-plus fa-plusline upper-function-buttons" onClick={this.addTodoLine}></i>
                <h2>Write a note</h2>
                <form onSubmit={this.onSubmit}>

                    <div className="input-field">
                        <label className="label-txt" htmlFor="title">title </label>
                        <input
                            ref={this.inputRef}
                            // type="text"
                            // placeholder="title..."
                            // id="title"
                            value={title}
                            name="title"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label className="label-txt" htmlFor="txt">Note body</label>
                        <textarea className="submit-text-area"
                            // type="textarea"
                            // placeholder="text..."
                            // id="newTxt"
                            value={newTxt}
                            name="newTxt"
                            onChange={this.handleChange}
                        />
                    </div>
                    <i className="fa fa-plus" onClick={this.onSubmitNote}></i>
                    <input className="submit-btn" type="file" onChange={this.loadImageFromInput}/>
                </form>
            </section>
    }
}

