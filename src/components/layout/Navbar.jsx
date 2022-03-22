import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav>
            <Link to='/'>
                <span> User App </span>
            </Link>

            {/* if the user is logged in.... */}
            <Link to='/'>
                {/* todo: app function to logout */}
                <span>Log out</span>
            </Link>

            <Link to='/profile'>
                <span> Profile </span>
            </Link>

            {/* if the use is logged out.... */}
            <Link to='/register'>
                <span>Register </span>
            </Link>
            <Link to='/login'>
                <span>Login </span>
            </Link>
        </nav>
    )
}