import { storageService } from '../../../services/storage.service.js'

console.log('hello')

const KEY = 'noteDB'

const gNotes = [
    {
     id: "n101",
     type: "note-txt",
     title: "text note",
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
     title: "Get my stuff together",
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

export const noteService = {
    query,
    remove,
    getById,
    _saveToStorage,
    gNotes,
  }

function query(){
    let notes =_loadFromStorage() 

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

function remove(noteId) {
    console.log(noteId)
    let notes = _loadFromStorage()
    notes = notes.filter(note => note.id !== noteId)
    _saveToStorage(notes)
    return Promise.resolve()
  }

  function getById(noteId) {
    if (!noteId) return Promise.resolve(null)
    const notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    return Promise.resolve(note)
  }