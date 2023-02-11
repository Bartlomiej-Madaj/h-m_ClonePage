import React from "react";
import classes from "./Categories.module.css";
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { titleHandler } from "../features/counter/handlerSlice";
import { useRouter } from "next/router";

function Categories(props) {

  // const navigate = useNavigate();
  const router = useRouter()
  const dispatch = useDispatch();

  const showProducts = (item) => {
    router.push('/all-products');
    dispatch(titleHandler(item));
  }

  return (
    <div onClick={showProducts.bind(null, props.categoryTitle)} className={classes.categories}>
      <img
        className={classes.categories__img}
        src={props.image}
        alt={props.categoryTitle}
      />
      <p className={classes.categories__person}>{props.person}</p>
      <p className={classes.categories__title}>{props.categoryTitle}</p>
    </div>
  );
}

export default Categories;
