

import { storageService } from "./storage.service.js"

export const mailService = {
  query,
  getById,
  
}

const KEY = 'mailsDB'
const gMails = [
    {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com'
    },
    {
    id: 'e102',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com'
    },
    {
    id: 'e103',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    to: 'momo@momo.com'
    },
]
function query(){
    let mails =gMails 
      return Promise.resolve(mails)
}  

function query1() {
  let mails = _loadFromStorage()
  if (!mails) {
    mails = gMails
    _saveToStorage(mails)
  }

}