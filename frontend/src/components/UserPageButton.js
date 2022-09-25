import React from "react";
import { Link } from "react-router-dom";

export default function UserPageButton() {
  return (
    <Link to="/Mypage">
      <div className="flex flex-column items-center float-right mr-5 mt-3">
        <img src="images/userpage.svg" alt="userpagebutton" />
        <p style={{ color: "RGB(253, 221, 200)", fontWeight: "500" }}>MYPAGE</p>
      </div>
    </Link>
  );
}
