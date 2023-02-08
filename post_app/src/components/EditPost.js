import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function EditPost() {
    let [state, setState] = useState({ title: '', description: '', avatar: '' })
    let { id } = useParams();
    const API_URL = "http://localhost:3000/api/v1/posts"
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const postData = (event) => {
        event.preventDefault();
        axios.put(`${API_URL}/${id}`, state, { headers: { Authorization: `${localStorage.getItem('Token')}` } })
            .then(res => {
                if (res.data) {
                    navigate("/posts")
                }
            })
    }
    useEffect(() => {
        axios.get(`${API_URL}/${id}`,{ headers: { Authorization: `${localStorage.getItem('Token')}` } })
            .then(res => {
                if (res.data) {
                    setState(res.data);
                }
            })

    }, [])

    return (
        <div className="container">Edit Post
            <form onSubmit={postData}>
                <div className='form-group'>
                    <label>Title:</label>
                    <input type="text" name="title" className="form-control" value={state.title} onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input type="text" name="description" className="form-control" value={state.description} onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Avatar:</label>
                    <input type="file" name="avatar" className="form-control" ></input>
                </div>
                <input type="submit" value="Edit" className='btn btn-success'></input>
            </form>
        </div>
    )
}
