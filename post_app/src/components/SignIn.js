import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function SignIn() {
    let [user, setUser] = useState({ email: '', password: '' })
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    }
    const userData = (event) => {
        // let hasError=false
        if (user.email == ""){
            return false;
        }
        event.preventDefault();
        console.log(user)
        axios.post("http://localhost:3000/users/sign_in", {user})
            .then(res => {
                console.log("Response Header" + res.headers)
                localStorage.setItem('Token', res.headers.authorization);
                if (res.data) {
                    alert("User Signed in");
                    navigate("/posts")
                }
            })
    }
    const isDisabled=()=>{
        console.log("userdata inside isdisabled"+userData);

    }
    return (
        <div className="container mx-auto" style={{ width: "400px" }}>
            <h2>Sign In</h2>
            <form onSubmit={userData}>
                <div className='form-group'>
                    <label>Email:</label>
                    <input type="text" name="email" className="form-control" onChange={handler} ></input>
                </div>
                <div className='form-group'>
                    <label>Password:</label>
                    <input type="text" name="password" className="form-control" onChange={handler} ></input>
                </div>
                <br/>
                <div className='form-group'>
                    <input type="submit" value="Sign in" className='btn btn-success' disabled={isDisabled}></input>
                </div>
            </form >
            <Link to="/signup">Sign Up</Link>
        </div >
    )
}
