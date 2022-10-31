import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Header from "./Header";

const Blogpost = ({ blogid }) => {
  const [comment, setComment] = useState("");

  const [data, setData] = useState();
  const navigate = useNavigate();

  const onhomebtn = () => {
    navigate("/posts");
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/api/blogs");
    console.log(response.data);
    setData(response.data);
  };
  const handlecommet = async (obj) => {
    console.log(obj);
    if (comment.length < 1) {
      alert("please write in comment");
    } else {
      let name = sessionStorage.getItem("name");
      console.log(comment + "=" + name);
      let data = { comment: comment, name: name };
      let url = "http://localhost:5000/api/blog/" + obj._id;
      const response = await axios.put(url, data);
      console.log(response.data.data);
      // setComment(" ")
      navigate("/posts");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <div className="container-blog">
        <button onClick={onhomebtn}>Back</button>
        <div className="data-sub-conatiner">
          <div className="blogname">{blogid.userName}</div>
          <div className="message">{blogid.message}</div>
          <div className="commnets-conatinersa">
          {blogid.comment ? (
            Object.values(blogid.comment)?.map((ele, idcs) =>
              ele.length > 0 ? (
                <div key={idcs} className="comments-container1">
                  <div className="comments">{ele[0]}</div>
                  <div className="nsme">{ele[1]}</div>
                </div>
              ) : (
                <div>no comment</div>
              )
            )
          ) : (
            <div>no comment</div>
          )}
          </div>
          <input
          className="comment-input"
            type="text"
            placeholder="comments"
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="comment-btn" onClick={() => handlecommet(blogid)}>add</button>
        </div>
      </div>
    </>
  );
};

export default Blogpost;
