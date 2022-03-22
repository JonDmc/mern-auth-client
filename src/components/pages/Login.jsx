import { useState } from "react"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { Navigate } from "react-router-dom"


export default function Login({ currentUser, setCurrentUser }) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [msg, setMessage] = useState('')
    const handleFormSubmit = async e => {
        e.preventDefault()
        try {
            // post to the backend with the form data to login
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, form)
            console.log(response)
            // decode the token that is sent to use
            const { token } = response.data
            const decoded = jwt_decode(token)
            // console.log(decoded)
            // save the token in local storage
            localStorage.setItem('jwt', token)
            // set the app state to the logged in user
            setCurrentUser(decoded)
        } catch (error) {
            // handle errors such as wrong credentials
            if (error.response.status === 400) {
                console.log(error.response.data)
                setMessage(error.response.data.msg)
            }
            console.log(error)
        }
    }

    // navigate to the user's profile if currentUser is not null
    if (currentUser) return <Navigate to='/profile' />
    return (
        <div>
            <h3>Login form:</h3>
            <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    placeholder="user@domain.com"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    value={form.email}
                />

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    value={form.password}
                />

                <input type='submit' />
            </form>
        </div>
    )
}