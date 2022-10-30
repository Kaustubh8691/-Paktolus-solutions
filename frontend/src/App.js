import './App.css';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import AddForm from "./Componets/AddForm"
import Home from './Componets/Home';
import Blogpost from './Componets/Blogpost';
import Posts from './Componets/Posts';
import { useState } from 'react';


function App() {
  const [blogid,setBlogid]=useState()
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/posts" element={<Posts setBlogid={setBlogid} blogid={blogid}/>}></Route>
            <Route path="/post" element={<Blogpost blogid={blogid}/>}></Route>
            <Route path="/addBlog" element={<AddForm />}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
