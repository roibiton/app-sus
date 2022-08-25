import { mailService } from "../services/mail.service.js"
import {utilService} from ' ../../../services/util.service.js'
export class MailAdd extends React.Component {
    state = {
   mail: {

            from: {
                name: 'Appsus',
                email: 'yosi@yosi.com'
            },
            id: utilService.makeId(3),
            subject: '',
            body: '',
            isRead: true,
            isStarred: false,
            sentAt: Date.now(),
            to: {
                name: '',
                email: 'niv@niv.com'
            }
        }
        
    }
    
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(({mail}) => ({
            mail: { ...mail, [field]: value }
        }))
    }

    onSaveMail = (ev) => {
        const { mail }= this.state
        ev.preventDefault()
        this.setState(({mail}) => ({
            mail: { ...mail, sentAt: Date.now() }
        }))
        mailService.sendNewMail(mail)
            .then(() => {
                this.props.history.push('/mail')
            })
    }

    render() {
        const { subject,body } = this.state.mail
        const { Name,Email } = this.state.mail.to
        const {onSaveMail, handleChange} = this
        return <section className="mail-add">
            <form className="flex column align-center" onSubmit={onSaveMail}>

                <label htmlFor="Name">To:</label>
                <input type="text" name="Name" 
                    value={Name} id="Name"
                    onChange={handleChange}
                />

                <label htmlFor="Email">Email:</label>
                <input type="text" name="Email" placeholder="niv@niv.com"
                    value={Email} id="Email"
                    onChange={handleChange}
                />

                <label htmlFor="subject">subject</label>
                <input type="text" name="subject"
                    value={subject} id="subject"
                    onChange={handleChange}
                />

                <label htmlFor="body">body</label>
                <input type="text" name="body"
                    value={body} id="body"
                    onChange={handleChange}
                />

                <button>Send</button>
            </form>
        </section>
    }
}