import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from ' ../../../services/event-bus.service.js';

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


    




    render() {
        const { mails } = this.state

        return (
            <section className="mail-app">
                <h3 className="second-title" >Mail</h3>
                <MailFilter onSetFilter={this.onSetFilter} />
                <MailList mails={mails} onRemoveMail={this.onRemoveMail} />
            </section>
        )
    }
}
