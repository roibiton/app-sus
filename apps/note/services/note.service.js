import { storageService } from '../../../services/storage.service.js'


export const noteService = {
    query,
    // getById,
  }

const KEY = 'noteDB'

const gNotes = [
    {
     id: "n101",
     type: "note-txt",
     isPinned: true,
     info: {
     txt: "Fullstack Me Baby!"
     }
    },
    {
     id: "n102",
     type: "note-img",
     info: {
     url: "../assets/img/meme-img.jpg",
     title: "Bobi and Me"
     },
     style: {
     backgroundColor: "#00d"
     }
    },
    {
     id: "n103",
     type: "note-todos",
     info: {
     label: "Get my stuff together",
     todos: [
     { txt: "Driving liscence", doneAt: null },
     { txt: "Coding power", doneAt: 187111111 }
     ]
     }
     },
     {
      id: "n104",
      type: "note-video",
      info: {
      title: "my-video",
      url: "../assets/vid/crystalised.mp4",
      }
     },
]

function query(){
    let notes =_loadFromStorage() 

    console.log(notes.length,gNotes.length)

    if(!notes || !notes.length) {
        notes = gNotes;
        _saveToStorage(notes)
    }
    return Promise.resolve(notes)
}  

function _saveToStorage(notes) {
    storageService.saveToStorage(KEY, notes)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}