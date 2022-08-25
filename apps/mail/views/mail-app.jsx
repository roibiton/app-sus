import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from ' ../../../services/event-bus.service.js'

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy)
            .then(mails => {

                this.setState({ mails })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadMails)
    }

    onAddItem = () => {
        const { mails } = this.state
        mailService.createNewMail()
            .then((mail) => {
                const newMails = [mail, ...mails]
                this.setState({ mails: newMails })
                showSuccessMsg('mail sent..')
            })
    }
    onRemoveMail = (mailId) => {
        mailService.remove(mailId)
            .then(() => {
                console.log('Removed!')
                const mails = this.state.mails.filter(mail => mail.id !== mailId)
                this.setState({ mails, isBounce: true })
                showSuccessMsg('mail removed')
                setTimeout(() => {
                    this.setState({ isBounce: false })
                }, 500)

            })
            .catch(err => {
                console.log('Problem!!', err)
                showErrorMsg('Cannot remove mail')
            })
    }

    onStarredMail = (mailId) => {
        mailService.toggleIsStarred(mailId)
            .then((updatedMail) => {
                console.log('Starred!')
                const mails = this.state.mails.map(mail => (mail.id !== mailId)? mail : updatedMail)
                this.setState({ mails })


            })
    }

    // onReadMail = (mailId) => {
    //     mailService.readMail(mailId)
    //         .then(() => {
    //             console.log('Read!')
    //         })
    // }


    render() {
        const { mails } = this.state
        const { onSetFilter, onRemoveMail, onStarredMail, onReadMail } = this
        return (
            <section className="mail-app">
                <h3 className="second-title" >Mail</h3>

                <MailFilter onSetFilter={onSetFilter} />

                <button onClick={() => { this.onAddItem() }}>➕</button>

                <MailList mails={mails} onRemoveMail={onRemoveMail}
                    onStarredMail={onStarredMail} onReadMail={onReadMail} />
            </section>
        )
    }
}
