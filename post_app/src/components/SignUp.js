import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SignUp() {
    let [user, setUser] = useState({ email: '', password: '' })
    const handler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }
    const userData = (event) => {
        event.preventDefault();
        console.log(user)
        axios.post('http://localhost:3000/users', {}, {params: {
            'user': { user }}
        })
            .then(res => {
                alert("Resonpse added")
                if (res.data) {
                    alert("User added");
                    // navigate("/")
                }
            })
    }
    return (
        <div className="container mx-auto" style={{width: "400px"}}>
            Sign Up
            <form onSubmit={userData}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type="text" name="email" className="form-control" onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type="text" name="password" className="form-control" onChange={handler}></input>
                </div>
                <br/>
                <div className='form-group'>
                    <input type="submit" value="Sign Up" className='btn btn-success'></input>
                </div>
            </form >
            <br/>
            <Link to="/signin" className='btn btn-primary'>Sign In</Link>
        </div >
    )
}
