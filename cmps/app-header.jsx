import { UserMsg } from "../cmps/user-msg.jsx"

const { Link, NavLink, withRouter } = ReactRouterDOM
export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3><i className="logo fa-brands fa-google-plus-g" ></i></h3>
        </Link>
        <UserMsg /><i class=""></i>
        
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/mail">Mail</NavLink>
        </nav>
        
    </header>
}
