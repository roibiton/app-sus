import { LongText } from '../cmps/long-text.jsx';
import { mailService } from "../services/mail.service.js"
import { utilService } from '../../../services/util.service.js';
import { noteService } from '../../note/services/note.service.js';

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {
    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
    //         this.loadMail()
    //     }
    // }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
            .then((mail) => {
                if (!mail) return this.onGoBack()
                this.setState({ mail })
                mailService.setIsRead(mailId, true)
            })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    saveAsNote = (mail) => {
        console.log('mail:', mail)
        noteService.onMailToNote(mail)
        return mail
    }
    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading...</div>
        const { onRemoveMail, onGoBack, saveAsNote } = this
        const sentTime = utilService.getCurrFullDate(mail.sentAt)

        return <article>
            <div className="mail-details">
                <h2>{mail.from.name}</h2>
                <h4>{mail.subject}</h4>
                <LongText mailText={mail.body} val1={'⬅'} val2={'➡'} />
                <p>{sentTime}</p>
                <div className="mail-details-btns">
                <button onClick={onRemoveMail}>Delete</button>
                <button onClick={onGoBack}>Go Back!</button>
                <button onClick={() => {
                    saveAsNote(mail)
                }}>save as note
                </button>
                </div>
                <div className="mail-details-btns">
                    <button className="btn btn-mail-preview" onClick={() => onRemoveMail(mail.id)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <button className="btn btn-mail-preview btn-star" onClick={() => onStarredMail(mail.id)}>
                        <i className={((mail.isStarred) ? 'fa-solid' : 'fa-regular') + " fa-star"}></i>
                    </button>
                </div>
            </div>
        </article>



    }
}