import React from "react";
import classes from "./Collection.module.css";

function Collection(props) {
  return (
    <div className={classes.collection}>
      <div
        className={classes.collection__list}
        style={{
          backgroundImage: `url(${props.image})`,
        }}
      >
        <div className={classes.collection__header}>
          <h3 className={classes.collection__title}>{props.title}</h3>
          <h4 className={classes.collection__description}>{props.description}</h4>
        </div>
        <div className={classes.collection__fadeBottom}></div>
      </div>
    </div>
  );
}

export default Collection;
