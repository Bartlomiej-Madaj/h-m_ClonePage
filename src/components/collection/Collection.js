import React from "react";
import "./Collection.css";

function Collection(props) {
  return (
    <div className="collection">
      <div
        className="collection__list"
        style={{
          backgroundImage: `url(${props.image})`,
        }}
      >
        <div className="collection__header">
          <h3 className="collection__title">{props.title}</h3>
          <h4 className="collection__description">{props.description}</h4>
        </div>
        <div className="collection__fadeBottom"></div>
      </div>
    </div>
  );
}

export default Collection;
