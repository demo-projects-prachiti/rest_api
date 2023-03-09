import './App.css';
import Post from './components/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPost from './components/AddPost';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EditPost from './components/EditPost';
import UserProfile from './components/UserProfile';
import EditUser from './components/EditUser';

function App() {
  return (
    <div>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/editpost/:id" element={<EditPost/>} />
          <Route path="/showuser/:id" element={<EditPost/>} />
          <Route path="/user_profile" element={<UserProfile/>} />
          <Route path="/edituser/:id" element={<EditUser/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
