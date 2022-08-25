import { utilService } from "../../../services/util.service.js"

const { Link } = ReactRouterDOM

export class MailPreview extends React.Component {
    componentDidMount() {

    }
    render() {
        const { mail, onStarredMail, onRemoveMail } = this.props

        const mailSource = `${mail.from.name}:`
        const mailText = `-${mail.body.substring(0, 45)}...`
        const sentTime = utilService.getCurrFullDate(mail.sentAt)
        return <React.Fragment>
            <td>{mailSource}</td>
            <td>
                <Link to={"/mail/" + mail.id}>
                    {mail.subject}
                </Link>
            </td>
            <td>
                <Link to={"/mail/" + mail.id}>
                    {mailText}
                </Link>
            </td>
            <td>{sentTime}</td>
            <td>
                <button className="btn btn-mail-preview" onClick={() => onRemoveMail(mail.id)}>❌</button>
                <button className="btn btn-mail-preview btn-star" onClick={() => onStarredMail(mail.id)}>
                    <i className={((mail.isStarred) ? 'fa-solid' : 'fa-regular') + " fa-star"}></i>
                </button>
            </td>
        </React.Fragment>


    }
}

{/* <section className="mail-preview">
    <div></div>
    <div>
        <Link to={"/mail/" + mail.id}>
            {mail.subject}
        </Link>
    </div>
    <div>{mailText}</div>
    <div>{sentTime}</div>
    <div className="mail-preview-btns">
    </div>

</section > */}