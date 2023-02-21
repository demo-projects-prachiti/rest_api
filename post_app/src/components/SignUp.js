import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    let [user, setUser] = useState({ email: '', password: '', password_confirmation: '' })
    const [error, setError] = useState([]);
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }
    const userData = (event) => {
        event.preventDefault();
        const codes = []
        if (user.email == "") {
            codes.push('Email is required')
        }
        if (user.password == "") {
            codes.push('Password is required')
        }
        if (user.password_confirmation == "") {
            codes.push('Confirm Password is required')
        }
        else if ((user.password).length > 128 || (user.password).length < 6) {
            codes.push('Password must be between 6 to 128')
        }
        if (codes.length === 0) {
            axios.post('http://localhost:3000/users', { user })
                .then(res => {
                    if (res.data) {
                        navigate("/")
                    }
                })
                .catch(err => {
                    codes.push(err.response.data.status.message);
                    setError(codes);

                })
        } else {
            setError(codes);
        }
    }
    console.log(error)
    return (
        <div className="container mx-auto" style={{ width: "400px" }}>
            <h2>Sign Up</h2>
            {error.map((err) => (
                <div key={err}>{err}</div>
            ))}
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
                    <label>Confirm Password:</label>
                    <input type="text" name="password_confirmation" className="form-control" onChange={handler}></input>
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
