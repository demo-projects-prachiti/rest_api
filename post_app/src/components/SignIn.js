import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    let [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }
    const userData = (event) => {
        event.preventDefault();
        console.log(user)
        axios.post("http://localhost:3000/users/sign_in", {user})
            .then(res => {
                // console.log("Response" + res.data)
                console.log("Response Header" + res.headers)
                // console.log("Response Headertoken" + res.headers.authorization)
                localStorage.setItem('Token', res.headers.authorization);
                // console.log("Local  Storage"+localStorage.getItem('Token'));
                if (res.data) {
                    alert("User Signed in");
                    // navigate("/posts")
                }
            })
    }
    return (
        <div className="container">
            Sign In
            <form onSubmit={userData}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type="text" name="email" className="form-control" onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type="text" name="password" className="form-control" onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <input type="submit" value="Sign in" className='btn btn-success'></input>
                </div>
            </form >
        </div >
    )
}
