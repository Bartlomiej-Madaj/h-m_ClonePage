import React from "react";
import "./Categories.css";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { titleHandler } from "../../features/counter/handlerSlice";

function Categories(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showProducts = (item) => {
    navigate('/all-products');
    dispatch(titleHandler(item));
  }

  return (
    <div onClick={showProducts.bind(null, props.categoryTitle)} className="categories">
      <img
        className="categories__img"
        src={props.image}
        alt={props.categoryTitle}
      />
      <p className="categories__person">{props.person}</p>
      <p className="categories__title">{props.categoryTitle}</p>
    </div>
  );
}

export default Categories;
