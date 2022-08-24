import { storageService } from "../../../services/storage.service.js"

export const mailService = {
    query,
    getById,
    remove,

}

const KEY = 'mailsDB'
const loggedinUser = {
    name: 'Mahatma Appsus',
    email: 'user@appsus.com'
   }
   
const gMails = [
        {
            from:{
                name:'yosi',
                email:'yosi@yosi.com'
            },
            id: 'e101',
            subject: 'Miss you!',
            body: 'Important policy updates coming to Discord',
            isRead: false,
            sentAt: 1551133930594,
            to: {
                name: 'Mahatma Appsus',
                email: 'user@appsus.com'
               }
            
    
        },
        {
            from:{
                name:'Mahatma Appsus',
                email:'user@appsus.com'
            },
            id: 'e102',
            subject: 'love you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            to: {
                name: 'roni',
                email: 'roni@roni.com'
               }
        },
        {
            from:{
                name:'niv',
                email:'niv@niv.com'
            },
            id: 'e103',
            subject: 'fuck you!',
            body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
            isRead: false,
            sentAt: 1551133930594,
            to: {
                name: 'Mahatma Appsus',
                email: 'user@appsus.com'
               }
        },
    ]

    
    
    


function query(filterBy) {
    
    let mails = _loadFromStorage()
    if (!mails||!mails.length) {
        mails = gMails
        _saveToStorage(mails)
    }

    if (filterBy) {
        let { search } = filterBy
        console.log('filterBy from service', filterBy);
        mails = mails.filter(mail => (
            mail.body.includes(search)||
            mail.subject.includes(search)||
            mail.from.name.includes(search)
            
        ))

        if (filterBy.isRead !== undefined)    {
            mails = mails.filter(mail => mail.isRead && filterBy.isRead || !mail.isRead && !filterBy.isRead)
        }

    }


    return Promise.resolve(mails)

}


function remove(mailId) {
    let mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve()
  }

  function getById(mailId) {
    if (!mailId) return Promise.resolve(null)
    const mails = _loadFromStorage()
    const mail = mails.find(mail => mail.id === mailId)
    return Promise.resolve(mail)
  }
  
  function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
  }
  
  function _saveToStorage(mails) {
    storageService.saveToStorage(KEY, mails)
  }
  