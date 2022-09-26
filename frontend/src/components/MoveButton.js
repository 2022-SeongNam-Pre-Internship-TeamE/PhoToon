import React from "react";
import { Link } from "react-router-dom";

export default function MoveButton({ url1, url2, style1, style2, saveFuc }) {
  return (
    <div className="sticky flex px-5 bottom-10 justify-between w-full">
      <Link to={url1}>
        <button>
          <img
            src="images/previousbutton.svg"
            alt="previous"
            className={style1}
          />
        </button>
      </Link>
      <Link to={url2} onClick={saveFuc}>
        <button>
          <img src="images/nextbutton.svg" alt="next" className={style2} />
        </button>
      </Link>
    </div>
  );
}
