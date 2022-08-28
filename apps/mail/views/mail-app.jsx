import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from ' ../../../event-bus.service.js'
import { MailAdd } from "../views/mail-add.js"

export class MailApp extends React.Component {
    state = {
        mails: [],
        filterBy: {
            status: 'inbox'
        },
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

    onSetStatusFilter = (status) => {
        const filterBy = { ...this.state.filterBy }
        filterBy.status = status
        this.onSetFilter(filterBy)
        // this.toggleMenu()
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
                const mails = this.state.mails.map(mail => (mail.id !== mailId) ? mail : updatedMail)
                this.setState({ mails })
                showSuccessMsg('starred')


            })
    }


    // onReadMail = (mailId) => {
    //     mailService.readMail(mailId)
    //         .then(() => {
    //             console.log('Read!')
    //         })
    // }
    toggleMenu = () => {
        document.body.classList.toggle('menu-open');
    }



    render() {
        const { Link } = ReactRouterDOM
        const { mails } = this.state
        const { onSetFilter, onSetStatusFilter, onRemoveMail, onStarredMail, onReadMail,toggleMenu } = this
        return (
            <section className="mail-app">
                <div className="mail-screen" onClick={() => {
                    toggleMenu()
                }}>
                </div>
                <MailFilter onSetFilter={onSetFilter} />
                <div className="full-email-list">
                <div className="mail-side-bar flex space-between main-layout">

                    <div className="side-bar flex column main-nav-list ">
                        <div className=" flex clean-list main-nav"></div>
                        <Link to={"/mail/add"}>
                            <button><div>🖍</div></button>
                        </Link>
                        <button onClick={() => {
                            onSetStatusFilter('inbox')
                        }}>Inbox</button>
                        <button onClick={() => {
                            onSetStatusFilter('sent')
                        }}>Sent</button>
                    </div>
                    <button className="menu-toggle button-menu" onClick={() => {
                        toggleMenu()
                    }}>☰
                    </button>
                </div>
                <div className="mail-list">
                    <MailList mails={mails} onRemoveMail={onRemoveMail}
                        onStarredMail={onStarredMail} onReadMail={onReadMail} />
                </div>
                </div>

            </section>
        )
    }
}
