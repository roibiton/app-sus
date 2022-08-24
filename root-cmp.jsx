<<<<<<< HEAD
import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { MailApp } from "./apps/mail/views/mail-app.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailDetails } from "./apps/mail/views/mail-details.jsx"
import { NoteApp } from "./apps/note/views/note-app.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Switch>
                <Route path="/mail/:mailId" component={MailDetails} />
                <Route path="/mail" component={MailApp} />
                <Route path="/note" component={NoteIndex} />
                <Route path="/about" component={About} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
    </Router>
}
>>>>>>> 40e89c2584134bcb4624de32e493b30e5fe531d9
