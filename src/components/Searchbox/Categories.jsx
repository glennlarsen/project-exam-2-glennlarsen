import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {

    return (
    <>
      <span className="searchbox__category--title">View By Catgeory</span>
      <div className="searchbox__circles">
        <div className="searchbox__circles--small">
          <Link to="/accommodation/hotel" className="searchbox__circle">
            Hotel
          </Link>
          <Link to="/accommodation/bnb" className="searchbox__circle">
            B&B
          </Link>
          <Link to="/accommodation/guesthouse" className="searchbox__circle">
            <span>Guest</span>
            <span>house</span>
          </Link>
        </div>
        <Link to="/accommodation/viewAll" className="searchbox__circle--filled">
          View All
        </Link>
      </div>
    </>
    );
};

  export default Categories;