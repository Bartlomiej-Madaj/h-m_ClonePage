import React from "react";
import { useDispatch } from "react-redux";
import { titleHandler } from "../../features/counter/handlerSlice";
// import "./CategoryList.css";

function CategoryList(props) {
  const dispatch = useDispatch();

  const showTitle = (e) => {
    dispatch(titleHandler(e.target.innerText));
  };

  return props.list[0].list.map((item, index) => (
    <button key={index} onClick={showTitle} className={`category-list`}>
      {item}
    </button>
  ));
}

export default CategoryList;
