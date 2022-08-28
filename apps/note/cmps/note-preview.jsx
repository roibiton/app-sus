import { noteService } from '../services/note.service.js';
import { mailService } from '../../mail/services/mail.service.js';

const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {

    state = {
        note: []
    }

    componentDidMount() {
        this.loadNote()
    }

    loadNote = () => {
        const { note } = this.props
        noteService.getById(note.id)
            .then((note) => {
                if (!note) return
                this.setState({ note })
            })
    }

    changeBG = (props) => {
        const { note } = this.props
        console.log(this.props.value)
        const newBgColor = props.target.value
        note.backgroundColor = newBgColor
        this.setState({ note })
    }

    markTodo = (props) => {
        const { note } = this.props
        console.log(props)
        note.marked = !note.marked
        if (note.marked === true) {
            props.target.style.textDecoration = "line-through"
        }
        else {
            props.target.style.textDecoration = 'none'
        }
    }

    removeTodo = (props) => {
        props.target.parentNode.hidden = 'true'
    }

    sendAsMail(note){
        mailService.saveNoteAsEmail(note)
    }

    updateText = (props) => {
        const { note } = this.props
        note.info.txt = props.target.value
        this.setState({ note })
    }

    updateTextTitle = (props) => {
        const { note } = this.props
        note.title = props.target.value
        this.setState({ note })
    }

    render() {
        const { note } = this.props
        const { changeBG, markTodo, removeTodo, updateText ,updateTextTitle} = this
        switch (note.type) {
            case ("note-txt"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }
                    }>
                    <textarea onChange={updateTextTitle} className="note-txt-title" value={note.title}/>
                    <textarea onChange={updateText} className="note-txt-area" value={note.info.txt}/>
                    <input className="fa fa-palette backg-color" onChange={changeBG} type="color" name="note-box"
                    ></input>
                    <i className="fa fa-email" onClick={() => {
                            this.sendAsMail(note)
                        }}></i>
                </div>;
            case ("note-img"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }

                    }>
                    <h3 className="title">{note.title}</h3>
                    <img className="img-container" src={`${note.info.url}`} />
                    <input className="fa fa-palette backg-color" onChange={changeBG} type="color"  name="note-box" ></input>

                </div>;
            case ("note-todos"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }
                    }>
                    <h3 className="title">{note.info.title}</h3>
                    <div>{note.info.todos.map((todo) =>
                        <li className="to-do"
                            style={
                                { textDecoration: "none" }
                            } onClick={markTodo} key={todo.doneAt}>{todo.txt} <button className="remove-button" onClick={removeTodo}>x</button> </li>
                    )}
                        <input className="fa fa-palette backg-color" onChange={changeBG} type="color" name="note-box"
                        ></input>
                    </div>

                </div>;
            case ("note-video"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }
                    }>
                    <h3 className="title">{note.title}</h3>
                    <video width="200" height="150" controls>
                        <source src={`${note.info.url}`} type="video/mp4" />
                    </video>
                    <input className="fa fa-palette backg-color" onChange={changeBG} type="color" name="note-box"
                    ></input>

                </div>;
            case ("note-audio"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }

                    }>
                    <h3 className="title">{note.title}</h3>
                    <audio controls className="audio-container">
                        <source src={`${note.info.url}`} type={`${note.aud}`}/>
                    </audio>
                    <input className="fa fa-palette backg-color" onChange={changeBG} type="color" id="head" name="note-box" ></input>

                </div>;
        }
    }
}