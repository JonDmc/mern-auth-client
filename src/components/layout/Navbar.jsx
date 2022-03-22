import { Link } from "react-router-dom"

export default function Navbar({ handleLogout, currentUser }) {

    const loggedIn = (
        <>
            {/* if the user is logged in.... */}
            <Link to='/'>
                {/* todo: app function to logout */}
                <span onClick={handleLogout}>Log out</span>
            </Link>

            <Link to='/profile'>
                <span> Profile </span>
            </Link>

        </>
    )

    const loggedOut = (
        <>
            {/* if the use is logged out.... */}
            <Link to='/register'>
                <span>Register </span>
            </Link>
            <Link to='/login'>
                <span>Login </span>
            </Link>
        </>
    )

    return (
        <nav>
            <Link to='/'>
                <span> User App </span>
            </Link>
            {currentUser ? loggedIn : loggedOut}
        </nav>
    )
}