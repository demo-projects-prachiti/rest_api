import React from 'react'
import user_logo from './default_user.png'
// import $ from 'jquery';

export default function UserProfile() {
  return (
    <div className='container'>UserProfile
        <img src={user_logo} alt="" style={{width:"100px"}} id="user_profile"/>
        {/* <input type="file" id="my_file" style="display: none;" /> */}
    </div>
  )
}
// $("#user_profile").click(function() {
//     $("input[id='my_file']").click();
// });