import { noteService } from '../services/note.service.js';

const { Link } = ReactRouterDOM

export class NotePreview extends React.Component {

    state = {
        note: []
    }

    componentDidMount() {
        this.loadNote()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     this.loadNote()
    // }

    loadNote = () => {
        const { note } = this.props
        console.log('me', note.id)
        noteService.getById(note.id)
            .then((note) => {
                if (!note) return this.onGoBack()
                this.setState({ note })
            })
    }


    // changeBG = () => {
    //     console.log(props)
    //     const { note } = this.props
    //     console.log(note.id, 'noteId')
    //     console.log(this)
    // }

    render() {
        const { note } = this.props
        const { changeBG } = this
        console.log('hello from button')

        switch (note.type) {
            case ("note-txt"):
                return <div className="note-box" >
                    <h3 className="note-txt-title">{note.title}</h3>
                    <h3 className="note-txt">{note.info.txt}</h3>
                    <input onChange={changeBG} type="color" id="head" name="note-box"
                    ></input>
                </div>;
            case ("note-img"):
                return <div className="note-box">
                    <h3 className="title">{note.info.title}</h3>
                    <img className="img-container" src={`${note.info.url}`} />
                    <input onChange={changeBG} type="color" id="head" name="note-box" ></input>
                </div>;
            case ("note-todos"):
                return <div className="note-box">
                    <h3 className="label">{note.info.title}</h3>
                    <div>{note.info.todos.map((todo) =>
                        <li className="to-do" key={todo.doneAt}>{todo.txt}</li>
                    )}
                        <input onChange={changeBG} type="color" id="head" name="note-box"
                        ></input>
                    </div>
                </div>;
            case ("note-video"):
                return <div className="note-box">
                    <h3 className="title">{note.info.title}</h3>
                    <video width="200" height="150" controls>
                        <source src={`${note.info.url}`} type="video/mp4" />
                    </video>
                    <input onChange={changeBG} type="color" id="head" name="note-box"
                    ></input>
                </div>;
        }
    }
}