import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    query,
    getById,
    remove,
    createNewMail,
    toggleIsStarred,
    setIsRead,

}

const KEY = 'mailsDB'
const loggedinUser = {
    name: 'Appsus',
    email: 'user@appsus.com'
}

const gMails = [
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e101',
        subject: 'Miss you!',
        body: 'Important policy updates coming to Discord',
        isRead: false,
        isStarred: false,
        sentAt: 1442133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }


    },
    {
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e102',
        subject: 'love you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        isStarred: false,
        sentAt: 1203129930594,
        to: {
            name: 'roni',
            email: 'roni@roni.com'
        }
    },
    {
        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e103',
        subject: 'fuck you!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: false,
        sentAt: 1200132620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
]


// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: true, // (optional property, if missing: show all)
//     isStared: true, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
// }

function query(filterBy) {

    let mails = _loadFromStorage()
    if (!mails || !mails.length) {
        mails = gMails
        _saveToStorage(mails)
    }

    if (filterBy) {
        let { search } = filterBy
        console.log('filterBy from service', filterBy);
        mails = mails.filter(mail => (
            mail.body.includes(search) ||
            mail.subject.includes(search) ||
            mail.from.name.includes(search)

        ))

        if (filterBy.isRead !== undefined) {
            mails = mails.filter(mail => mail.isRead && filterBy.isRead || !mail.isRead && !filterBy.isRead)
        }
        if (filterBy.isStarred !== undefined) {
            mails = mails.filter(mail => mail.isStarred && filterBy.isStarred || !mail.isRead && !filterBy.isRead)
        }
    }
    return Promise.resolve(mails)
}


function _add(mail) {
    let mails = _loadFromStorage()
    const existMail = mails.find(currMail => mail.id === currMail.id)
    if (existMail) return Promise.resolve(existMail)
    mails = [mail, ...mails]
    _saveToStorage(mails)
    return Promise.resolve(mail)
}

function _update(mailToUpdate) {
    let mails = _loadFromStorage()
    mails = mails.map(mail => mail.id === mailToUpdate.id ? mailToUpdate : mail)
    _saveToStorage(mails)
    return Promise.resolve(mailToUpdate)
}

function remove(mailId) {
    let mails = _loadFromStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _saveToStorage(mails)
    return Promise.resolve()
}

function toggleIsStarred(mailId) {
    let mails = _loadFromStorage()
    const existMail = mails.find(currMail => currMail.id === mailId)
    existMail.isStarred = !existMail.isStarred
    return _update(existMail)
}

function setIsRead(mailId, val) {
    let mails = _loadFromStorage()
    const existMail = mails.find(currMail => currMail.id === mailId)
    existMail.isRead = val
    return _update(existMail)
}

function createNewMail() {
    const mail = {

        from: {
            name: 'Appsus',
            email: 'yosi@yosi.com'
        },
        id: utilService.makeId(3),
        subject: 'new add!',
        body: 'you just added me, tnx!',
        isRead: false,
        isStarred: false,
        sentAt: 1550835950594,
        to: {
            name: 'niv',
            email: 'niv@niv.com'
        }
    }
    return _add(mail)
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
