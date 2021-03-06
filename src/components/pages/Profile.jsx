import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Profile({ currentUser }) {
    const [msg, setMsg] = useState('')

    useEffect(() => {
        (async () => {
            try {
                // get token for local storage
                const token = localStorage.getItem('jwt')
                // make the auth headers
                const options = {
                    headers: {
                        'Authorization': token
                    }
                }
                // hit the auth locked endpoint
                // axios.get(url, options)
                // axios.post(url, body, options)
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`, options)
                // set the data from the server in state
                setMsg(response.data.msg)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div>
            <h3>{currentUser.name}'s Profile</h3>
            <p>your email is {currentUser.email}</p>
            <h4>The message form the auth locked route is: </h4>
            <h6>{msg}</h6>
        </div>
    )
}