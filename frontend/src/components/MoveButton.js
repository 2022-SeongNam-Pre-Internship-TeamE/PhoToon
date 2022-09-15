import React from "react";
import { Link } from "react-router-dom";

export default function MoveButton({ url1, url2, style1, style2 }) {
  return (
    <div className="fixed flex px-5 bottom-16 justify-between w-full">
      <Link to={url1}>
        <button>
          <img
            src="images/previousbutton.svg"
            alt="previous"
            className={style1}
          />
        </button>
      </Link>
      <Link to={url2}>
        <button>
          <img src="images/nextbutton.svg" alt="next" className={style2} />
        </button>
      </Link>
    </div>
  );
}
