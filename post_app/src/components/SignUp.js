import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    let [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }
    const userData = (event) => {
        event.preventDefault();
        console.log(user)
        axios.post('http://localhost:3000/users', {}, {
            params: {
                'user': { user }
            }
        })
            .then(res => {
                if (res.data) {
                    navigate("/posts")
                }
            })
    }
    return (
        <div className="container mx-auto" style={{ width: "400px" }}>
            <h2>Sign Up</h2>
            <form onSubmit={userData}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type="text" name="email" className="form-control" onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type="text" name="password" className="form-control" onChange={handler}></input>
                </div>
                <br />
                <div className='form-group'>
                    <input type="submit" value="Sign Up" className='btn btn-success'></input>
                </div>
            </form >
            <br />
            <Link to="/">Sign In</Link>
        </div >
    )
}
