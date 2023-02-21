import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('Token');
  const signout = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:3000/users/sign_out', { headers: { Authorization: `${localStorage.getItem('Token')}` } })
      .then(res => {
        if (res.data) {
          localStorage.removeItem('Token');
          navigate("/")
        }
      })
  }
  return (
    <div><nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            {authToken &&
              <>
                <li className="nav-item">
                  <Link to="/posts" className='nav-link'>Posts</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary" onClick={signout}>Sign Out</button>
                </li>
              </>
            }
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav></div>
  )
}
