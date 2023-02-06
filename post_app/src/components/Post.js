import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY3NTY4MTEyNCwiZXhwIjoxNjc2OTc3MTI0LCJqdGkiOiJjMjhiMDkxNy0yY2VhLTQ0NmQtYjM4MC1kNmYxZmZmMDUyY2QifQ.H4NfSbs7HXLPmItBZVMLmENnup2kENe6cp3QavLcz1k'
export default function Post() {
    const [postData, setPostData] = useState([]);
    const getToken = () => {
        return localStorage.getItem('Token')
    }
    useEffect(() => {
        const API = "http://localhost:3000/api/v1/posts";
        axios.get(API, { headers: { Authorization: `${getToken()}` } })
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
                        <span />
                        <Link to={`editpost/${post.id}`} className='btn btn-primary'>Edit</Link>
                    </tr>

                ))}
            </table>
            {/* </div> */}
            <Link to="/addpost" className='btn btn-primary'>Add Post</Link>

        </div>
    )
}
