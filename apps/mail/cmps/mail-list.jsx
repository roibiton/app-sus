import { MailPreview } from './mail-preview.jsx';

export function MailList(props) {
     const { mails} = props

     return <section className="mail-list">
          {mails.map(currMail => <MailPreview
               key={currMail.id}
               mail={currMail} />)}
     </section>
}