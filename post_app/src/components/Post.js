import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjc1MTU0MjQwLCJleHAiOjE2NzY0NTAyNDAsImp0aSI6Ijg5MjZlZmZhLTU0N2YtNDFkNy1hMjRlLWE2MWU4Yzg0NDc0NSJ9.sujoyJZe9wwZhfWX0OEVHtE-kCi4K1raxs0o7hYKo0Y'
export default function Post() {
    const [postData, setPostData] = useState([]);
    useEffect(() => {
        const API = "http://localhost:3000/api/v1/posts";
        axios.get(API, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                console.log(res.data)
                setPostData(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='container'>
            {/* <div className='row'> */}
            <table>
                <tr>
                    <td>Title</td>
                    <td>Description</td>
                </tr>
                {postData.map((post) => (
                // <div className="col-sm-4 card" style={{ width: '18rem' }}>
                //     <img src={post.avatar} className="card-img-top" alt="" width={200} height={150}/>
                //     <div className="card-body">
                //         <h5 className="card-title">{post.title}</h5>
                //         <p className="card-text">{post.description}</p>
                //         {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                //     </div>
                // </div>
                <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.description}</td>
                </tr>

            ))}
            </table>
            {/* </div> */}
            <Link to="/addpost">Add Post</Link>
        </div>
    )
}
