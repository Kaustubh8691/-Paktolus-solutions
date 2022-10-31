import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Header from './Header';
import "./add.css"
const intialState = {
  userName: sessionStorage.getItem("name"),
  message: "",
};

const AddForm = () => {
  const navigate = useNavigate();

  const [formValue, setFormvalue] = useState(intialState);

  const { userName, message } = formValue;

  const handlesubmit = async (e) => {
    e.preventDefault();
    let name1 = sessionStorage.getItem("name");
    console.log(name1);

    setFormvalue({ ...formValue, ["userName"]: name1 });
    if (!message) {
      alert("you have to add name or message");
    } else {
      console.log("jdgasvgasv", formValue);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/blog/addblog",
          formValue
        );
        console.log(response);
        if (response.data.status === "success") {
          navigate("/posts");
        } else {
          alert("something is wrong check backend");
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  const onhomebtn = () => {
    navigate("/posts");
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;

    setFormvalue({ ...formValue, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="sub-container">
        <div className="btn">
          <button onClick={onhomebtn}>Back</button>
        </div>
        <div className="form my-2">
          <form onSubmit={handlesubmit} className="submitPost">
            <div className="mb-3"></div>
            <div className="mb-3">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  onChange={onInputChange}
                  type="text"
                  className="form-control"
                  name="message"
                  rows={12}
                  placeholder="message"
                />
              </Form.Group>
            </div>
          </form>
          <button className="publish btns" onClick={handlesubmit}>
            create
          </button>
        </div>
      </div>
    </>
  );
};

export default AddForm;
