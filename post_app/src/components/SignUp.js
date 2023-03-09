import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [user, setUser] = useState({ email: '', password: '', password_confirmation: '' })
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
        else if (user.password != user.password_confirmation) {
            codes.push('Password and Password confirmation does not match')
        }
        if (user.password != "" && user.password_confirmation == "") {
            codes.push('Confirm Password is required')
        }

        if (codes.length === 0) {
            axios.post('http://localhost:3000/users', { user })
                .then(res => {
                    if (res.data) {
                        console.log("Res data" + res.data.status.message);
                        // setError(codes);
                        if (window.confirm("Signed up successfully!") == true) {
                            document.getElementById("sign-up-form").reset();
                            navigate("/")
                        } else {
                            document.getElementById("sign-up-form").reset();
                            codes.push(res.data.status.message);
                            setError(codes);
                            navigate("/signup")
                        }
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
    return (
        // <div className="container mx-auto" style={{ width: "400px" }}>
        //     <h2>Sign Up</h2>
        //     {error.map((err) => (
        //         <div key={err}>{err}</div>
        //     ))}
        //     <form id="sign-up-form" onSubmit={userData}>
        //         <div className='form-group'>
        //             <label>Email:</label>
        //             <input value={user.email} type="text" name="email" className="form-control" onChange={handler}></input>
        //         </div>
        //         <div className='form-group'>
        //             <label>Password:</label>
        //             <input value={user.password} type="text" name="password" className="form-control" onChange={handler}></input>
        //         </div>
        //         <div className='form-group'>
        //             <label>Confirm Password:</label>
        //             <input value={user.password_confirmation} type="text" name="password_confirmation" className="form-control" onChange={handler}></input>
        //         </div>
        //         <br />
        //         <div className='form-group'>
        //             <input type="submit" value="Sign Up" className='btn btn-success'></input>
        //         </div>
        //     </form >
        //     <br />
        //     <Link to="/">Sign In</Link>
        // </div >
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ bordeRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={userData}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    {error.map((err) => (
                                                        <div key={err}>{err}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={user.email} type="text" name="email" className="form-control" onChange={handler}></input>
                                                    <label className="form-label">Your Email</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={user.password} type="text" name="password" className="form-control" onChange={handler}></input>
                                                    <label className="form-label">Password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input value={user.password_confirmation} type="text" name="password_confirmation" className="form-control" onChange={handler}></input>
                                                    <label className="form-label">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <input type="submit" value="Sign Up" className='btn btn-primary btn-lg'></input>
                                            </div>

                                        </form>
                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <Link to="/">Sign In</Link>
                                        </div>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
