import axios from 'axios'
import { useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser }) {

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        passwordConfirmation: ''
    })

    const [msg, setMessage] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (form.password === form.passwordConfirmation) {
                // remove un-needed data in the form pre-request
                delete form.passwordConfirmation

                // axios.method = (where we want to go, want we want to pass)
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, form)
                // do the axios sice the passwords match
                const { token } = response.data
                // set the token in local storage
                localStorage.setItem('jwt', token)
                // decode the token
                const decoded = jwt_decode(token)
                // log the user in
                setCurrentUser(decoded)
            } else setMessage('password does not match')
        } catch (error) {
            if (error.response.status === 400) {
                setMessage(error.response.data.msg)
            } else if (error.response.status === 409) {
                setMessage(error.response.data.msg)
            }
            console.log(error)

        }
    }

    if (currentUser) {
        return <Navigate to='/profile' />
    }



    return (
        <div>
            <h3>Register form:</h3>
            <p>{msg ? `the server has a message for you: ${msg}` : ''}</p>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name: </label>
                <input
                    id="name"
                    type='text'
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                />
                <br />

                <label htmlFor="email">Email: </label>
                <input
                    id="email"
                    type='email'
                    placeholder='user@domain.com'
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    value={form.email}
                />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    type='password'
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    value={form.password}
                />
                <br />
                <label htmlFor="passwordConfirmation">Confirm Password: </label>
                <input
                    id="passwordConfirmation"
                    type='password'
                    onChange={e => setForm({ ...form, passwordConfirmation: e.target.value })}
                    value={form.passwordConfirmation}
                />

                <input type='submit' />
            </form>
        </div>
    )
}