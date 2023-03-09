import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EditUser() {
  let [state, setState] = useState({ photo: '' })
  let { id } = useParams();
  const API_URL = "http://localhost:3000/api/v1/posts"
  const navigate = useNavigate();
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value })
  }
  const userData = (event) => {
    event.preventDefault();
    axios.get(`${API_URL}/${id}/update_profile`, state, { headers: { Authorization: `${localStorage.getItem('Token')}` } })
      .then(res => {
        if (res.data) {
          navigate("/posts")
        }
      })
  }
  // useEffect(() => {
  //   axios.get(`${API_URL}/${id}`, { headers: { Authorization: `${localStorage.getItem('Token')}` } })
  //     .then(res => {
  //       console.log("Response in edit user"+res.data);
  //       if (res.data) {
  //         setState(res.data);
  //       }
  //     })

  // }, [])
  return (
    <div className="container">EditUser
      <form onSubmit={userData}>
        {/* <div className='form-group'>
          <label>Email:</label>
          <input type="text" name="email" className="form-control" value={state.email} onChange={handler}></input>
        </div>
        <div className='form-group'>
          <label>Password:</label>
          <input type="text" name="password" className="form-control" value={state.password} onChange={handler}></input>
        </div> */}
        <div className='form-group'>
          <label>Photo:</label>
          <input type="file" name="photo" className="form-control" ></input>
        </div>
        <br/>
        <input type="submit" value="Edit" className='btn btn-success'></input>
      </form>
    </div>
  )
}
