import { MailPreview } from './mail-preview.jsx';

export function MailList({ mails, onRemoveMail, onStarredMail, onReadMail }) {

     // console.log('id',mails[0].id)

     return <section className="mail-list ">
          <table>
               <tbody>
                    {mails.map(currMail =>

                         <tr className={(!currMail.isRead)? 'mail-unread' : '' } key={currMail.id}>
                              <MailPreview
                                   onReadMail={onReadMail}
                                   onRemoveMail={onRemoveMail}
                                   onStarredMail={onStarredMail}
                                   mail={currMail} />
                         </tr>)}
               </tbody>

          </table>
     </section>
}