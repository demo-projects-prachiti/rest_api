import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Post() {
    const [postData, setPostData] = useState([]);
    const navigate = useNavigate();
    const getToken = () => {
        return localStorage.getItem('Token')
    }
    useEffect(() => {
        const API = "http://localhost:3000/api/v1/posts";
        axios.get(API, { headers: { Authorization: `${getToken()}` } })
            .then(res => {
                setPostData(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    const deletePost = (id) => {
        const API_URL = "http://localhost:3000/api/v1/posts/"
        axios.delete(`${API_URL}${id}`, { headers: { Authorization: `${localStorage.getItem('Token')}` } })
            .then(res => {
                let data=postData.filter(post=>post.id!=id);
                setPostData(data);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container'>
            <table>
                <tr>
                    <td>Title</td>
                    <td>Description</td>
                </tr>
                {postData.map((post) => (
                    <tr key={post.id}>
                        <td>{post.title}</td>
                        <td>{post.description}</td>
                        <td><Link to={`/editpost/${post.id}`} className='btn btn-primary'>Edit</Link>
                        <button className='btn btn-primary' onClick={() => deletePost(post.id)}>Delete</button></td>
                        <td><img src={post.avatar}/></td>
                    </tr>

                ))}
            </table>
            <Link to="/addpost" className='btn btn-primary'>Add Post</Link>
        </div>
    )
}
