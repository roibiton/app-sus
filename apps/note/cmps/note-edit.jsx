// import { noteService } from "../services/note.service.js"

// export class noteEdit extends React.Component {

//     state = {
//         note: []
//     }

//     componentDidMount() {
//         this.loadnote()
//     }

//     loadNote = () => {
//         const { noteId } = this.props.match.params
//         if (!noteId) return
//         noteService.getById(noteId).then(note => this.setState({ note }))
//     }

//     handleChange = ({ target }) => {
//         const field = target.name
//         const value = target.type === 'text' ? +target.value : target.value
//         this.setState(({note}) => ({
//             note: { ...note, [field]: value }
//         }))
//     }

//     onSaveNote = (ev) => {
//         ev.preventDefault()
//         noteService.save(this.state.note)
//             .then(() => {
//                 this.props.history.push('/note')
//             })
//     }

//     render() {
//         const { txt } = this.info.txt
//         const {onSaveNote, handleChange} = this
//         return <section className="car-edit">
//             <form className="flex column align-center" onSubmit={onSaveCar}>

//                 <label htmlFor="vendor">text</label>
//                 <input type="text" name="vendor"
//                     value={vendor} id="vendor"
//                     onChange={handleChange}
//                 />
//                 <button>Save</button>
//             </form>
//         </section>
//     }
// }