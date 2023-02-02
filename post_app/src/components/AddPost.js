import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddPost() {
    let [state,setState]=useState({title:'',description:'',avatar:''})
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjc1MTU0MjQwLCJleHAiOjE2NzY0NTAyNDAsImp0aSI6Ijg5MjZlZmZhLTU0N2YtNDFkNy1hMjRlLWE2MWU4Yzg0NDc0NSJ9.sujoyJZe9wwZhfWX0OEVHtE-kCi4K1raxs0o7hYKo0Y'
    const navigate=useNavigate();
    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const postData=(event)=>{
        event.preventDefault();
        console.log(state)
        axios.post('http://localhost:3000/api/v1/posts',state,{ headers: { Authorization: `Bearer ${token}`} })
        .then(res=>{
            alert("Resonpse added")
            if(res.data){
                alert("Post added");
                navigate("/")
            }
        })
    }
  return (
    <div className="container">Add Post
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
                <input type="file" name="avatar" className="form-control" onChange={handler}></input>
            </div>
            <input type="submit" value="Add" className='btn btn-success'></input>
        </form>
    </div>
  )
}
