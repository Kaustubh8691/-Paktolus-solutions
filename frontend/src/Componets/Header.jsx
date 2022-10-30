import React from "react";

const Header = () => {
  const name = sessionStorage.getItem("name");
  return (
    <div className="head">
      <div className="sub-div">User Name : {name}</div>
    </div>
  );
};

export default Header;
