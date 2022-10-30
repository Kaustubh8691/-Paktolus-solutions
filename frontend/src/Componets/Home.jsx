import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ setBlogid }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const handleadd = () => {
    navigate("/addBlog");
  };
  const handleclick = () => {
    if (name.length == 0) {
      alert("please add name to move ahead");
    } else {
      sessionStorage.setItem("name", name);
      navigate("/posts");
    }
  };
  return (
    <div className="container1">
      <input type="text" onChange={(e) => setName(e.target.value)} required />

      <button onClick={(e) => handleclick()}>next</button>
    </div>
  );
};

export default Home;
