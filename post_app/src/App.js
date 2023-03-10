import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPost from './components/AddPost';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import EditPost from './components/EditPost';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
