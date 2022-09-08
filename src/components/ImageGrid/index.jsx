import React, { useState } from "react";
import "./imageGrid.scss";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "utils/useApi";
import { BASE_URL, ESTABLISHMENTS, POPULATE_ALL } from "../../utils/api";
import MyLoader from "../../components/layout/MyLoader";
import One from "./1.jpg";
import Two from "./2.jpg";
import Three from "./3.png";




function MyImageGrid() {
  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/");
  }

  const url = BASE_URL + ESTABLISHMENTS + "/" + id + POPULATE_ALL;
  const { establishment, loading, error } = useApi(url);


  if (loading)
    return (
      <div className="loader-container">
        <MyLoader />
      </div>
    );

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="image-grid">
          <div className="image-grid__featured">
              <img src={One} alt="" />
          </div>
          <div className="image-grid__gallery">
          <img src={One} alt="" />
          <img src={Two} alt="" />
          <img src={Three} alt="" />
          <img src={One} alt="" />
          </div>
      </div>
  );
}

export default MyImageGrid;
