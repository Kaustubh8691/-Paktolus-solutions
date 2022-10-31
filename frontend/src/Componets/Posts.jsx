import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import axios from "axios";
import "./post.css"
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Posts = ({ setBlogid, blogid }) => {
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  let name1 = sessionStorage.getItem("name");
  // console.log(name1)
  const [data, setData] = useState();
  const handleadd = () => {
    navigate("/addBlog");
  };
  
  const handleSearch = async () => {
    const response = await axios.get("http://localhost:5000/api/allBlogs");
    console.log(response.data.data);
    let data1 = response.data.data;
    const dataone = data1.filter((Element) => Element.userName.includes(search) );
    console.log(dataone)
    setData(dataone)
    
  };
  const handleclick = (obj) => {
    console.log(obj);
    setBlogid(obj);
    navigate("/post");
  };
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/api/blogs");
    console.log(response.data.data);
    setData(response.data.data);
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
      getData();
    }
  };
  
  useEffect(() => {
    getData();
  }, []);
  const data1 = data?.filter((Element) => Element.userName.includes(search));
  console.log(data1)
  return (
    <div className="container1-posts">
      <Header />
      <button id="create-btn" onClick={handleadd}>Create post</button>
      <input
      id="search-input"
        type="text"
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button id="search-btn" onClick={() => handleSearch()}>search</button>
      <Row xs={2} md={3} className="g-4">
        {data1?.map((obj, idx) => (
          <div className="cards" key={idx}>
            <Col>
              <Card onClick={() => handleclick(obj)}>
                <Card.Body>
                  <Card.Title>{obj.userName}</Card.Title>
                  <div className="message">{obj.message}</div>
                  <div className="comment-main-conatiner">
                  {obj.comment ? (
                    Object.values(obj.comment)?.map((ele, idcs) =>
                      ele.length > 0 ? (
                        <div className="comments-container" key={idcs}>
                          <div className="comments">{ele[0]}</div>
                          <div className="nsme">{ele[1]}</div>
                        </div>
                      ) : (
                        <div className="no-comment">no comment</div>
                      )
                    )
                  ) : (
                    <div className="no-comment">no comment</div>
                  )}
                  </div>
                </Card.Body>
              </Card>

              <input
              className="comment-input"
                type="text"
                placeholder="comments"
                onChange={(e) => setComment(e.target.value)}
              />
              <button  className="comment-btn" onClick={() => handlecommet(obj)}>Add</button>
            </Col>
            
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Posts;
