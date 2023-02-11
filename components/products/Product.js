// import "./Product.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  addToFavourite,
  removeFromFavourite,
} from "../../features/counter/itemsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useColor } from "../hooks/useColor";
import { useRouter } from "next/router";

function Product({
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

  const [newSize, setSize] = useState('');

  const router = useRouter()

  const colorFirst = useColor();
  const colorSecond = useColor();
  const colorThird = useColor();

  const currencyPrice = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

  const addBasket = () => {
    dispatch(
      addToBasket({
        id:  id + newSize,
        title,
        price,
        description,
        category,
        image,
        amount,
        size: `${newSize !== '' ? newSize : 'lack'}`,
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
      setChosen(true);
    }
  };

  const chooseSize = (e) => {
    setSize(e.target.value);
  };

  const showProduct = () => {
    router.push(`/${id}`)
  }

 

  return (
    <div className="product">
      <div className="product__wrap1">
        <img onClick={showProduct} className="product__image" src={image} alt={title} />
        <FavoriteIcon
          onClick={addFavourite}
          className={`product__favourite ${
            chosen && "product__favourite__chosen"
          }`}
          sx={chosen ? { fontSize: 25 } : { fontSize: 20 }}
        />
      </div>
      <div
        className="product__wrap2"
        style={{
         paddingBottom: `${size !== undefined ? "0" : "1rem"}`,
        }}
      >
        <h6 className="product__title">{title}</h6>
        <h6 className="product__price">{currencyPrice}</h6>
        <div>
          <span
            style={{
              backgroundColor: `#${colorFirst}`,
            }}
            className="product__color"
          ></span>
          <span
            style={{
              backgroundColor: `#${colorSecond}`,
            }}
            className="product__color"
          ></span>
          <span
            style={{
              backgroundColor: `#${colorThird}`,
            }}
            className="product__color"
          ></span>
        </div>
        <span className="product__new">Nowość</span>
      </div>
      {!(size === undefined) && (
        <form className="product__form">
          <select onChange={chooseSize} name="size" id="product__size">
            <option  value="">Wybierz rozmiar</option>
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
      <button  disabled={(size === undefined || newSize !== '' || size ==='lack') ? false : true} onClick={addBasket} className="product__btn">
        Dodaj
      </button>
    </div>
  );
}

export default Product;
