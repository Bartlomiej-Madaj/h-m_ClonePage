import React, { useState } from "react";
import "./CartItem.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import {
  addToFavourite,
  removeFromBasket,
  addToBasket,
  removeAmountFromBasket,
  removeFromFavourite,
} from "../../features/counter/itemsSlice";

function CartItem({
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
  const [chosen, setChosen] = useState(false);

  const currencyPrice = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

  const removeItem = () => {
    dispatch(
      removeFromBasket({
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

  const addFavourite = () => {
    if (chosen) {
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
      setChosen(false);
    } else {
      dispatch(
        addToFavourite({
          id: Number.parseFloat(id),
          title,
          price,
          description,
          category,
          image,
          amount,
          size: `${size !== "" ? size : "lack"}`,
        })
      );
      setChosen(true);
    }
  };

  const addPiece = () => {
    dispatch(
      addToBasket({
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
  const removePiece = () => {
    dispatch(
      removeAmountFromBasket({
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

  return (
    <div className="cart-item">
      <div
        className="cart-item__img"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="cart-item__title__wrap">
        <p className="cart-item__title">{title}</p>
        <p className="cart-item__price">{currencyPrice}</p>
      </div>
      <DeleteOutlinedIcon
        onClick={removeItem}
        className="cart_item__delete"
        fontSize="small"
      />
      <div className="cart-item__description1">
        <div className="cart-item__nr">
          <span>Nr prod.: </span>
          <span>111333444</span>
        </div>
        <div className="cart-item__color">
          <span>Kolor:</span>
          <span>Srebrzysty</span>
        </div>
      </div>
      <div className="cart-item__description2">
        <div className="cart-item__size">
          <span>{size !== "lack" && "Rozmiar:"}</span>
          <span>{size !== "lack" && size}</span>
        </div>
        <div className="cart-item__amount">
          <span>Suma: </span>
          <span> {currencyPrice} </span>
        </div>
      </div>
      <div className="cart-item__select">
        <div className="cart-item__favourite">
          <FavoriteIcon
            onClick={addFavourite}
            className={`cart-item__favourite1 ${
              chosen && "cart-item__favourite__chosen"
            }`}
            sx={chosen ? { fontSize: 25 } : { fontSize: 20 }}
          />
        </div>
        <div className="cart-item__piece">
          <span className="cart-item__piece_title">Wybierz ilość:</span>
          <span className="cart-item__piece__window">{amount}</span>
          <button onClick={addPiece} className="cart-item__piece_btn1">
            +
          </button>
          <button onClick={removePiece} className="cart-item__piece_btn1">
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
