import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY3NTY4MTEyNCwiZXhwIjoxNjc2OTc3MTI0LCJqdGkiOiJjMjhiMDkxNy0yY2VhLTQ0NmQtYjM4MC1kNmYxZmZmMDUyY2QifQ.H4NfSbs7HXLPmItBZVMLmENnup2kENe6cp3QavLcz1k'
export default function Navbar() {
  // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY3NTY4MTEyNCwiZXhwIjoxNjc2OTc3MTI0LCJqdGkiOiJjMjhiMDkxNy0yY2VhLTQ0NmQtYjM4MC1kNmYxZmZmMDUyY2QifQ.H4NfSbs7HXLPmItBZVMLmENnup2kENe6cp3QavLcz1k'
  const navigate = useNavigate();
  const signout = (event) => {
    event.preventDefault();
    console.log("inside signout");
    console.log(`Bearer ${localStorage.getItem('Token')}`);
    axios.delete('http://localhost:3000/users/sign_out', { headers: { Authorization: `${localStorage.getItem('Token')}` } })
      .then(res => {
        alert("signed out")
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
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <Link to="/posts" className='nav-link'>Posts</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={signout}>Sign Out</button>
            </li>
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
