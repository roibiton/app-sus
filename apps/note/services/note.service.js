import { storageService } from '../../../services/storage.service.js'

const KEY = 'noteDB'

const gNotes = [
    {
        id: "n101",
        backgroundColor: 'green',
        type: "note-txt",
        title: "text note",
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        backgroundColor: 'lightblue',
        type: "note-img",
        title:'Bobi and Me',
        info: {
            url: "../assets/img/meme-img.jpg"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        backgroundColor: 'yellow',
        type: "note-todos",
        isMarked: false,
        title:'',
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
        backgroundColor: 'red',
        type: "note-video",
        title:'my-video',
        info: {
            url: "../assets/vid/funny.mp4",
        }
    },
    {
        id: "n105",
        backgroundColor: 'blue',
        type: "note-audio",
        title:'my-jam',
        aud: 'audio/mp3',
        info: {
            url: "../assets/audio/TheEnd.mp3",
        }
    },
]

export const noteService = {
    query,
    remove,
    getById,
    _saveToStorage,
    _loadFromStorage,
    gNotes,
}

function query() {
    let notes = _loadFromStorage()

    if (!notes || !notes.length) {
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
