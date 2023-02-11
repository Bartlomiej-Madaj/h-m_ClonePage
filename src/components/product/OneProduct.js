import React, { useEffect, useState } from "react";
import "./OneProduct.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  addToFavourite,
  removeFromFavourite,
} from "../../features/counter/itemsSlice";
import { getPosts } from "../../features/counter/fetchSlice";
import { useNavigate, useParams } from "react-router-dom";
import { accessibility } from '../../data/dummy_data';


function OneProduct() {
  const dispatch = useDispatch();
  const [newSize, setSize] = useState("");
  const [chosen, setChosen] = useState(false);
  const { fetchData, loading } = useSelector((state) => state.fetchData);
  const [item, setItem] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    amount: "",
    size: "",
  });
  const navigate = useNavigate();
  const [star, setStar] = useState();

  let { itemId } = useParams();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  useEffect(() => {
    if (loading === "idle") {
      dispatch(getPosts());
    }
  }, [dispatch, loading]);

  useEffect(() => {
    if ((loading === "succeeded" || loading === "loading") && !isNaN(itemId)) {
      setItem(fetchData.find((item) => item.id === Number(itemId)));
    } else {
      navigate("/");
    }
  }, [itemId, loading, fetchData, navigate]);

  useEffect(() => {
    setStar(
      Array(Math.ceil(Math.random() * 5))
        .fill("")
        .map((item, index) => <StarIcon key={index} sx={{ fontSize: 20 }} />)
    );
  }, []);

  if (loading === "loading" || isNaN(itemId)) {
    return (
      <div className="products__loading">
        <div className="products__loading__ring"></div>
        <h2>Loading...</h2>
      </div>
    );
  }

  const { id, title, price, description, category, image, amount, size } = item;

  const currencyPrice = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price);

  const addBasket = () => {
    dispatch(
      addToBasket({
        id: id + newSize,
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

  return (
    <main className="one-product">
      <div className="one-products__wrap-image">
        <img className="one-products__image" src={image} alt={title} />
      </div>

      <div className="one-product__wrap-content">
        <h4 className="one-product__title">{title}</h4>
        <FavoriteIcon
          onClick={addFavourite}
          className={`one-product__favourite ${
            chosen && "one-product__favourite__chosen"
          }`}
          sx={chosen ? { fontSize: 25 } : { fontSize: 20 }}
        />
        <h3 className="one-product__price">{currencyPrice}</h3>
        <h5 className="one-product__color">black</h5>
        <div className="one-product__icon-image_wrap">
          <img className="one-products__icon-image" src={image} alt={title} />
        </div>
        <div className="one-product__review">
          <span>Recenzje</span>
          {star}
        </div>
        {!(size === undefined) && (
          <form className="one-product__form">
            <select onChange={chooseSize} name="size" id="one-product__size">
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
          disabled={size === undefined || newSize !== "" || size === 'lack' ? false : true}
          onClick={addBasket}
          className="one-product__btn"
        >
          Dodaj
        </button>
        <span className="one-product__discount">
          Do -50% na wybrane produkty - online i stacjonarnie. Sprawdź teraz!
        </span>
        <div className="one-product__access">
          <StoreOutlinedIcon fontSize="small" />
          <h5>{accessibility[Math.round(Math.random())]} </h5>
        </div>
      </div>
    </main>
  );
}

export default OneProduct;
