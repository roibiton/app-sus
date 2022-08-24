import { LongText } from './long-text.jsx';

const { Link } = ReactRouterDOM


export function MailPreview({ mail, onRemoveMail }) {

    return <article className="mail-preview flex space-around">
        <div>
            <button onClick={onRemoveMail}>❌</button>
            <button>⭐</button>
        </div>
        <Link to={"/mail/" + mail.id}>
            <div className="mail-body flex  ">
                <h2>{mail.from.name}</h2>
                <h4>{mail.subject}</h4>
                <LongText mailText={mail.body} />
                <p>{mail.sentAt}</p>
            </div>
        </Link>
    </article>

}