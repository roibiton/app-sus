import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
export const mailService = {
    query,
    getById,
    remove,
    sendNewMail,
    toggleIsStarred,
    setIsRead,
    saveNoteAsEmail,


}

const KEY = 'mailsDB'
const loggedinUser = {
    name: 'Appsus',
    email: 'user@appsus.com'
}

const gMails = [
    {
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e102',
        subject: 'Missed u..',
        body: 'Would love to catch up sometimes',
        isRead: true,
        isStarred: false,
        sentAt: 1658229930594,
        to: {
            name: 'nikol',
            email: 'nikol@dahary.com'
        },
    },
    {
        
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e202',
        subject: 'new changes',
        body: 'transaction was successful. Thanks!',
        isRead: true,
        isStarred: false,
        sentAt: 1564129930594,
        to: {
            name: 'roni',
            email: 'roni@roni.com'
        },
    },
    {
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e302',
        subject: 'Fuck u..',
        body: 'hope we can meet again very soon😪',
        isRead: true,
        isStarred: true,
        sentAt: 1421339930594,
        to: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        }
    },
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e101',
        subject: 'Hello',
        body: 'Important policy updates coming to Discord',
        isRead: true,
        isStarred: false,
        sentAt: 1555133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e103',
        subject: 'Thanks!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: true,
        sentAt: 1442421339434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e104',
        subject: 'new changes',
        body: "These changes will take effect on  We’re letting you know ahead of time so you can learn what’s changing.",
        isRead: false,
        isStarred: false,
        sentAt: 1385422620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e105',
        subject: 'smokey!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 139920430594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: '899-events',
            email: 'ev@899.com'
        },
        id: 'e106',
        subject: 'confirm',
        body: `
        Hello,
        Your order for event 899 has been registered in our system and is now pending for the producer's confirmation.`,
        isRead: false,
        isStarred: true,
        sentAt: 139652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e107',
        subject: 'subscribe',
        body: `Order confirmations are the sole responsibility of the event's producer and are subjected to the licensed amount of attendees allowed in venue.`,
        isRead: true,
        isStarred: false,
        sentAt: 149752620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e108',
        subject: 'hey!',
        body: `you will received a text message and an email with your order confirmation and digital ticket to enter the event with.`,
        isRead: false,
        isStarred: true,
        sentAt: 139652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e109',
        subject: 'Hello',
        body: 'Important policy updates coming to Discord',
        isRead: true,
        isStarred: false,
        sentAt: 1442133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e603',
        subject: 'Thanks!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: false,
        sentAt: 1555133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e704',
        subject: 'new changes',
        body: "These changes will take effect on  We’re letting you know ahead of time so you can learn what’s changing.",
        isRead: false,
        isStarred: false,
        sentAt: 1385422620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e805',
        subject: 'smokey!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: true,
        isStarred: true,
        sentAt: 126142620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'coacher',
            email: 'coach@suck.com'
        },
        id: 'e905',
        subject: 'Duck you!',
        body: `Weekly Coaching 🤩: Roi, success is balance`,
        isRead: false,
        isStarred: false,
        sentAt: 136142520594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'zoom',
            email: 'zoom@zoom.com'
        },
        id: 'e115',
        subject: 'fuck you!',
        body: `Top 3 Ways to Secure Your Zoom Meetings`,
        isRead: false,
        isStarred: false,
        sentAt: 120162620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e127',
        subject: 'fuck you!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 139652620594,
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
        id: 'e1222',
        subject: 'Missed u..',
        body: 'Would love to catch up sometimes',
        isRead: true,
        isStarred: false,
        sentAt: 1354203930594,
        to: {
            name: 'nikol',
            email: 'nikol@dahary.com'
        },
    },
    {
        
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e1212',
        subject: 'new changes',
        body: 'transaction was successful. Thanks!',
        isRead: true,
        isStarred: true,
        sentAt: 1309129930594,
        to: {
            name: 'roni',
            email: 'roni@roni.com'
        },
    },
    {
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e1192',
        subject: 'Fuck u..',
        body: 'hope we can meet again very soon...',
        isRead: true,
        isStarred: false,
        sentAt: 1256129930594,
        to: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        }
    },
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e1181',
        subject: 'Hello',
        body: 'Important policy updates coming to Discord',
        isRead: true,
        isStarred: false,
        sentAt: 1442133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e1163',
        subject: 'Thanks!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: false,
        sentAt: 1555133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e1154',
        subject: 'new changes',
        body: "These changes will take effect on  We’re letting you know ahead of time so you can learn what’s changing.",
        isRead: false,
        isStarred: true,
        sentAt: 1385422620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e1145',
        subject: 'smokey!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 131652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: '899-events',
            email: 'ev@899.com'
        },
        id: 'e1136',
        subject: 'confirm',
        body: `
        Hello,
        Your order for event 899 has been registered in our system and is now pending for the producer's confirmation.`,
        isRead: true,
        isStarred: false,
        sentAt: 150652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e1127',
        subject: 'subscribe',
        body: `Order confirmations are the sole responsibility of the event's producer and are subjected to the licensed amount of attendees allowed in venue.`,
        isRead: false,
        isStarred: false,
        sentAt: 151311620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e1118',
        subject: 'hey!',
        body: `you will received a text message and an email with your order confirmation and digital ticket to enter the event with.`,
        isRead: false,
        isStarred: false,
        sentAt: 135752620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e199',
        subject: 'Hello',
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
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e183',
        subject: 'Thanks!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: false,
        sentAt: 1555133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e174',
        subject: 'new changes',
        body: "These changes will take effect on  We’re letting you know ahead of time so you can learn what’s changing.",
        isRead: true,
        isStarred: false,
        sentAt: 1385422620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e165',
        subject: 'smokey!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 139652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'coacher',
            email: 'coach@suck.com'
        },
        id: 'e155',
        subject: 'Duck you!',
        body: `Weekly Coaching 🤩: Roi, success is balance`,
        isRead: false,
        isStarred: false,
        sentAt: 120152620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'zoom',
            email: 'zoom@zoom.com'
        },
        id: 'e145',
        subject: 'fuck you!',
        body: `Top 3 Ways to Secure Your Zoom Meetings`,
        isRead: true,
        isStarred: false,
        sentAt: 166652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e137',
        subject: 'fuck you!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 149652620594,
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
        id: 'e5572',
        subject: 'Missed u..',
        body: 'Would love to catch up sometimes',
        isRead: true,
        isStarred: false,
        sentAt: 1217429930594,
        to: {
            name: 'nikol',
            email: 'nikol@dahary.com'
        },
    },
    {
        
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e5562',
        subject: 'new changes',
        body: 'transaction was successful. Thanks!',
        isRead: true,
        isStarred: false,
        sentAt: 1203129930594,
        to: {
            name: 'roni',
            email: 'roni@roni.com'
        },
    },
    {
        from: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },
        id: 'e5552',
        subject: 'Fuck u..',
        body: 'hope we can meet again very soon...',
        isRead: true,
        isStarred: false,
        sentAt: 1203129421339,
        to: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        }
    },
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e5541',
        subject: 'Hello',
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
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e5533',
        subject: 'Thanks!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: false,
        sentAt: 1465133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e5524',
        subject: 'new changes',
        body: "These changes will take effect on  We’re letting you know ahead of time so you can learn what’s changing.",
        isRead: true,
        isStarred: false,
        sentAt: 1385422620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e5515',
        subject: 'smokey!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 127162620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: '899-events',
            email: 'ev@899.com'
        },
        id: 'e4496',
        subject: 'confirm',
        body: `
        Hello,
        Your order for event 899 has been registered in our system and is now pending for the producer's confirmation.`,
        isRead: false,
        isStarred: false,
        sentAt: 139652620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e4487',
        subject: 'subscribe',
        body: `Order confirmations are the sole responsibility of the event's producer and are subjected to the licensed amount of attendees allowed in venue.`,
        isRead: false,
        isStarred: false,
        sentAt: 166322620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e4478',
        subject: 'hey!',
        body: `you will received a text message and an email with your order confirmation and digital ticket to enter the event with.`,
        isRead: false,
        isStarred: false,
        sentAt: 146552620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'yosi',
            email: 'yosi@yosi.com'
        },
        id: 'e4469',
        subject: 'Hello',
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
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e4453',
        subject: 'Thanks!',
        body: 'Thank You For Your Purchase, Your PlayStation™Store transaction was successful. Thanks!',
        isRead: false,
        isStarred: false,
        sentAt: 1541133920434,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'roni',
            email: 'roni@roni.com'
        },
        id: 'e4444',
        subject: 'new changes',
        body: "These changes will take effect on  We’re letting you know ahead of time so you can learn what’s changing.",
        isRead: false,
        isStarred: false,
        sentAt: 1385422620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        }
    },
    {
        from: {
            name: 'coffeshop',
            email: 'smokey@monkey.com'
        },
        id: 'e4435',
        subject: 'smokey!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 131752620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'coacher',
            email: 'coach@suck.com'
        },
        id: 'e4425',
        subject: 'Duck you!',
        body: `Weekly Coaching 🤩: Roi, success is balance`,
        isRead: false,
        isStarred: false,
        sentAt: 131752620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'zoom',
            email: 'zoom@zoom.com'
        },
        id: 'e4415',
        subject: 'fuck you!',
        body: `Top 3 Ways to Secure Your Zoom Meetings`,
        isRead: false,
        isStarred: false,
        sentAt: 132552620594,
        to: {
            name: 'Appsus',
            email: 'user@appsus.com'
        },

        from: {
            name: 'niv',
            email: 'niv@niv.com'
        },
        id: 'e4409',
        subject: 'fuck you!',
        body: `Thank you for visiting Smokey Coffeeshop in Amsterdam.
        We’d be grateful if you would review us on Tripadvisor. It’s the world’s largest travel site, helping millions of visitors every month plan the perfect trip.
        Our guests often tell us how helpful it is to read past guests' reviews before booking their own visits. And we're always eager to hear what you liked and how we can improve.       
        Thanks again, and we hope to see you again soon.`,
        isRead: false,
        isStarred: false,
        sentAt: 139652210594,
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

    if (!filterBy) return Promise.resolve(mails)
    console.log('filterBy from service', filterBy);

    let { search } = filterBy
    if (search) {
        mails = mails.filter(mail => (
            mail.body.includes(search) ||
            mail.subject.includes(search) ||
            mail.from.name.includes(search)

        ))
    }

    if (filterBy.isRead !== undefined) {
        mails = mails.filter(mail => mail.isRead && filterBy.isRead || !mail.isRead && !filterBy.isRead)
    }
    if (filterBy.isStarred !== undefined) {
        mails = mails.filter(mail => mail.isStarred && filterBy.isStarred || !mail.isStarred && !filterBy.isStarred)
    }
    if (filterBy.status === 'inbox') {

        mails = mails.filter(mail => mail.to.email === loggedinUser.email)
    } else if (filterBy.status === 'sent') {

        mails = mails.filter(mail => mail.to.email !== loggedinUser.email)
    }

    return Promise.resolve(mails)
}


function _add(mail) {
    let mails = _loadFromStorage()

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

function sendNewMail(mail) {
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
function saveNoteAsEmail(note){
    const newMailFromNote ={
        from: {
            name: 'Appsus',
            email: 'yosi@yosi.com'
        },
        id: utilService.makeId(3),
        subject: note.title,
        body: note.info.txt,
        isRead: true,
        isStarred: false,
        sentAt: Date.now(),
        to: {
            name: 'from note',
            email: 'google@keep.com'
        }
    }
    showSuccessMsg('sent as email')
    _add(newMailFromNote)

}
