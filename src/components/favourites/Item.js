import React, { useEffect, useState } from "react";
import "./Item.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromFavourite,
} from "../../features/counter/itemsSlice";
import { accessibility } from "../../data/dummy_data";

function Item({
  id,
  title,
  price,
  description,
  category,
  image,
  amount,
  size,
}) {
  const dispatch = useDispatch();
  const [newSize, setSize] = useState("");

  const currencyPrice = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

  const removeFavourite = () => {
    dispatch(
      removeFromFavourite({
        id,
        title,
        price,
        description,
        category,
        image,
        amount,
        size,
      })
    );
  };

  const addItem = () => {
    dispatch(
      addToBasket({
        id: id + newSize,
        title,
        price,
        description,
        category,
        image,
        amount,
        size: newSize,
      })
    );
  };

  const chooseSize = (e) => {
    setSize(e.target.value);
  };

  const [randomNew, setRandomNew] = useState();
  const [randomNumber, setRandomNumber] = useState();

  useEffect(() => {
    const random = Math.round(Math.random());
    if (random === 0) {
      setRandomNew("Nowości");
      setRandomNumber(0);
    } else {
      setRandomNew("Kup juz teraz");
      setRandomNumber(1);
    }
  }, []);

  return (
    <div className="item">
      <div
        className="item__image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <DeleteOutlinedIcon
          onClick={removeFavourite}
          className="item__delete"
          fontSize="small"
        />
      </div>
      <div className="item__all">
        <h5 className="item__title">{title}</h5>
        <h5 className="item__price">{currencyPrice}</h5>
        <span className="item__new">{randomNew}</span>
        {size !== undefined && <span className="item__new">Kolor: Black</span>}
        <div className="item__access">
          <StoreOutlinedIcon fontSize="small" />
          <h5>{accessibility[randomNumber]} </h5>
        </div>
      </div>
      {!(size === undefined || size === "lack" || size === "") && (
        <form className="item__form">
          <select onChange={chooseSize} name="size" id="size">
            <option value="">Wybierz rozmiar</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XLL">XXL</option>
            <option value="3XL">3XL</option>
          </select>
        </form>
      )}
      <button
        disabled={
          size === undefined || newSize !== "" || size === "lack" ? false : true
        }
        onClick={addItem}
        type="submit"
        className="item__btn"
      >
        <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} /> <span>Dodaj</span>
      </button>
    </div>
  );
}

export default Item;
