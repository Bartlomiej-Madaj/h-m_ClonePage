import React, { useState } from "react";
// import "./WatchedItems.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../features/counter/itemsSlice";

function WatchedItems({
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
  return (
    <div className="watched-items">
      <div
        className="watched-items__image"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div onClick={addFavourite} className="watched-items__favourite">
          <FavoriteIcon
            className={`watched-items__favourite1 ${
              chosen && "watched-items__favourite__chosen"
            }`}
            sx={chosen ? { fontSize: 25 } : { fontSize: 20 }}
          />
        </div>
      </div>
      <p className="watched-items__title">{title}</p>
      <p className="watched-items__price">{currencyPrice}</p>
    </div>
  );
}

export default WatchedItems;
