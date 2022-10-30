import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import axios from "axios";
// import "./home.css"
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
    let data = response.data.data;
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

  return (
    <div className="container1">
      <Header />
      <button onClick={handleadd}>Create post</button>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => handleSearch()}>search</button>
      <Row xs={2} md={3} className="g-4">
        {data?.map((obj, idx) => (
          <div className="cards" key={idx}>
            <Col>
              <Card onClick={() => handleclick(obj)}>
                <Card.Body>
                  <Card.Title>{obj.userName}</Card.Title>
                  <div>{obj.message}</div>

                  {obj.comment ? (
                    Object.values(obj.comment)?.map((ele, idcs) =>
                      ele.length > 0 ? (
                        <div key={idcs}>
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
                </Card.Body>
              </Card>
              <input
                type="text"
                placeholder="comments"
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={() => handlecommet(obj)}>add</button>
            </Col>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Posts;
