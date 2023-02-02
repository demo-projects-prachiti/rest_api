import logo from './logo.svg';
import './App.css';
import Post from './components/Post';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddPost from './components/AddPost';

function App() {
  return (
    <div>

      <Router>
        {/* <Post /> */}
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/addpost" element={<AddPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
