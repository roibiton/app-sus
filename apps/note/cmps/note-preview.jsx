import { remove } from '../services/note.service.js';


const {Link} = ReactRouterDOM

export class NotePreview extends React.Component {
    
    changeBG = (props) => {
        console.log(props)
        const { note } = this.props
            console.log(note.id,'noteId')
            console.log(this)
    }

    onRemove = (props) => {
        console.log(props)
    }

    render() {
    const { note } = this.props
    const { changeBG } = this
    const { onRemove } = this

    switch (note.type) {
        case ("note-txt"):
            return <div className="note-box" >
                        <h3 className="note-txt">{note.info.txt}</h3>
                        <input onChange={changeBG} type="color" id="head" name="note-box"
                            ></input>
                        <button onClick={onRemove} >X</button>
                    </div>;
        case ("note-img"):
            return <div className="note-box">
                        <h3 className="title">{note.info.title}</h3>
                        <img  className="img-container" src={`${note.info.url}`} />
                        <input onChange={changeBG} type="color" id="head" name="note-box" ></input>
                    </div>;
        case ("note-todos"):
            return <div className="note-box">      
                        <h3 className="label">{note.info.label}</h3>
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
                            <source src={`${note.info.url}`} type="video/mp4"/>
                        </video>
                        <input onChange={changeBG} type="color" id="head" name="note-box"
                            ></input>
                    </div>;
}
}
}