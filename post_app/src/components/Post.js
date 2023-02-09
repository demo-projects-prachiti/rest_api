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
                    <td>Avatar</td>
                </tr>
                {postData.map((post) => (
                    // <tr><h2>{post}</h2></tr>
                    <tr key={post.post.id}>
                        {/* <td>{post}</td> */}
                        <td>{post.post.title}</td>
                        <td>{post.post.description}</td>
                        <td><img src={post.url} width={150} height={150}/></td>
                        <td><Link to={`/editpost/${post.post.id}`} className='btn btn-primary'>Edit</Link>
                        <button className='btn btn-primary' onClick={() => deletePost(post.post.id)}>Delete</button></td>
                        
                    </tr>

                ))}
            </table>
            <Link to="/addpost" className='btn btn-primary'>Add Post</Link>
        </div>
    )
}
