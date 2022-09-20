import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Categories = () => {
  const { type } = useParams();

  return (
    <>
      <span className="searchbox__category--title">View By Catgeory</span>
      <div className="searchbox__circles">
        <div className="searchbox__circles--small">
          <Link
            to="/accommodation/hotel"
            className={`${
              type === "hotel" ? "searchbox__circle--active" : ""
            } searchbox__circle`}
          >
            Hotel
          </Link>
          <Link
            to="/accommodation/bnb"
            className={`${
              type === "bnb" ? "searchbox__circle--active" : ""
            } searchbox__circle`}
          >
            B&B
          </Link>
          <Link
            to="/accommodation/guesthouse"
            className={`${
              type === "guesthouse" ? "searchbox__circle--active" : ""
            } searchbox__circle`}
          >
            <span>Guest</span>
            <span>house</span>
          </Link>
        </div>
        <Link
          to="/accommodation"
          className={`${
            type === undefined ? "searchbox__circle--active" : ""
          } searchbox__circle--big`}
        >
          View All
        </Link>
      </div>
    </>
  );
};

export default Categories;
