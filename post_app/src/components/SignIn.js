import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignIn() {
    const [user, setUser] = useState({ email: '', password: '' })
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }

    const userData = (event) => {
        event.preventDefault();
        const codes = []
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (user.email == "") {
            codes.push('Email is required')
        }
        else if (!(user.email).match(emailRegex)) {
            codes.push('Email is not in the format.')
        }
        if (user.password == "") {
            codes.push('Password is required')
        }
        else if ((user.password).length > 128 || (user.password).length < 6) {
            codes.push('Password must be between 6 to 128')
        }
        if (codes.length === 0) {
            axios.post("http://localhost:3000/users/sign_in", { user })
                .then(res => {
                    console.log("inside response of then")
                    localStorage.setItem('Token', res.headers.authorization);
                    if (res.status === 200) {
                        alert("User Signed in");
                        navigate("/posts")
                    }
                    else {
                        console.log("Credentials does not match");
                        codes.push('Credentials does not match.')
                        console.log("codes"+codes)
                        setError(codes);
                        navigate("/")
                    }
                })
                .catch(err => console.log(err))
        }
        console.log("after length")
        setError(codes);
        console.log("Error"+error);
        console.log("after set code")
    }
    return (
        <div className="container mx-auto" style={{ width: "400px" }}>
            <h2>Sign In</h2>
            {error.length !== 0 && error.map((err) => (
                <div key={err}>{err}</div>
            ))}
            <form onSubmit={userData}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type="text" name="email" className="form-control" onChange={handler} value={user.email} ></input>
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type="text" name="password" className="form-control" onChange={handler} value={user.password}  ></input>
                </div>
                <br />
                <div className='form-group'>
                    <input type="submit" value="Sign in" className='btn btn-success' ></input>
                </div>
            </form >
            <Link to="/signup">Sign Up</Link>
        </div >
    )
}
