import { noteService } from '../services/note.service.js';

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
        console.log('note',note)
    }

    render() {
        const { note } = this.props
        const { changeBG, markTodo, removeTodo } = this
        switch (note.type) {
            case ("note-txt"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }
                    }>
                    <textarea className="note-txt-title" >{note.title}</textarea>
                    <textarea rows='6' cols='14' className="note-txt-area">{note.info.txt}</textarea>
                    <input className="bgColor" onChange={changeBG} type="color" id="head" name="note-box"
                    ></input>
                    <button onClick={() => {
                            this.sendAsMail(note)
                        }}>Send as email</button>
                </div>;
            case ("note-img"):
                return <div className="note-box"
                    style={
                        { backgroundColor: note.backgroundColor }

                    }>
                    <h3 className="title">{note.title}</h3>
                    <img className="img-container" src={`${note.info.url}`} />
                    <input className="bgColor" onChange={changeBG} type="color" id="head" name="note-box" ></input>

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
                        <input className="bgColor" onChange={changeBG} type="color" id="head" name="note-box"
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
                    <input className="bgColor" onChange={changeBG} type="color" id="head" name="note-box"
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
                    <input className="bgColor" onChange={changeBG} type="color" id="head" name="note-box" ></input>

                </div>;
        }
    }
}