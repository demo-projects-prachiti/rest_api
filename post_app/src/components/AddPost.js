import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
    let [state, setState] = useState({ title: '', description: '', avatar: '' })
    const navigate = useNavigate();
    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const postData = (event) => {
        event.preventDefault();
        console.log("State params"+state)
        axios.post('http://localhost:3000/api/v1/posts', { post:state}, { headers: { Authorization: `${localStorage.getItem('Token')}`,"Content-Type":"multipart/form-data" } })
            .then(res => {
                if (res.data) {
                    setState({...state, avatar: res?.data?.url});
                    navigate("/posts")
                }
            })
    }
    const fileHandler=(event)=>{
        setState((prev) => ({ ...prev, avatar: event.target.files[0] }))
    }
    return (
        <div className="container mx-auto" >Add Post
            <form onSubmit={postData}>
                <div className='form-group'>
                    <label>Title:</label>
                    <input type="text" name="title" className="form-control" onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <input type="text" name="description" className="form-control" onChange={handler}></input>
                </div>
                <div className='form-group'>
                    <label>Avatar:</label>
                    <input type="file" name="avatar" className="form-control" onChange={fileHandler}></input>
                </div>
                <br/>
                <input type="submit" value="Add" className='btn btn-success'></input>
            </form>
        </div>
    )
}
