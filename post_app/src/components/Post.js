import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/Post_css.css';
import * as Icon from 'react-bootstrap-icons';
import user_logo from './default_user.png'
import UserProfile from './UserProfile';

export default function Post() {
    const [postData, setPostData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const API = "http://localhost:3000/api/v1/posts";
        axios.get(API, { headers: { Authorization: `${localStorage.getItem('Token')}` } })
            .then(res => {
                console.log("resposen", res.data)
                setPostData(res.data)

            })
            .catch(err => console.log(err))
    }, [])
    const deletePost = (id) => {
        const API_URL = "http://localhost:3000/api/v1/posts/"
        axios.delete(`${API_URL}${id}`, { headers: { Authorization: `${localStorage.getItem('Token')}` } })
            .then(res => {
                console.log("Response" + res);
                let data = postData.filter(post => post.post.id != id);
                setPostData(data);
            })
            .catch(err => console.log(err))
    }

    return (
        // <div classNameName='container'>
        //     <table>
        //         <tr>
        //             <td>Title</td>
        //             <td>Description</td>
        //             <td>Avatar</td>
        //         </tr>
        //         {postData.pmap((post) => (
        //             <tr key={post.post.id}>
        //                 <td>{post.post.title}</td>
        //                 <td>{post.post.description}</td>
        //                 {post.url ? <td><img src={post.url} width={150} height={150} /></td> : <td></td>}
        //                 <td><Link to={`/editpost/${post.post.id}`} classNameName='btn btn-primary'>Edit</Link>
        //                     <button classNameName='btn btn-primary' onClick={() => deletePost(post.post.id)}>Delete</button></td>

        //             </tr>

        //         ))}
        //     </table>
        //     <Link to="/addpost" classNameName='btn btn-primary'>Add Post</Link>
        // </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="main-box clearfix">
                        <div className="table-responsive">
                            <table className="table user-list">
                                <thead>
                                    <tr>
                                        <th><span>User</span></th>
                                        <th><span>Created</span></th>
                                        <th className="text-center"><span>Title</span></th>
                                        <th><span>Description</span></th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {postData.map((post) => (
                                        <tr key={post.id}>
                                            <td>
                                                <img src={user_logo} alt="" />

                                                {post.current_user_email === post.user.email ? <Link to={`/edituser/${post.id}`}>{post.user.email}</Link> : <span className="label label-default">{post.user.email}</span>}
                                            </td>
                                            <td>
                                                {post.created_at}
                                            </td>
                                            <td className="text-center">
                                                <span className="label label-default">{post.title}</span>
                                            </td>
                                            <td>
                                                <span className="label label-default">{post.description}</span>
                                            </td>
                                            <td style={{ width: "20%" }}>
                                                <Link to={`/editpost/${post.id}`} className='btn btn-primary'>
                                                    <Icon.PencilSquare />
                                                </Link>
                                                <Link to="#" className='btn btn-primary' onClick={() => deletePost(post.id)}><Icon.Trash />
                                                </Link>
                                                <a href="#" className="table-link danger">
                                                    <span className="fa-stack">
                                                        <i className="fa fa-square fa-stack-2x"></i>
                                                        <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/addpost" className='btn btn-primary'>Add Post</Link>
                        <ul className="pagination pull-right">
                            <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
