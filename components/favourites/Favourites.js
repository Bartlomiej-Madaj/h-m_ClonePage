import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { addToSearched, selectItems } from "../../features/counter/itemsSlice";
// import "./Favourites.css";
import Item from "./Item";

function Favourites() {
  const { favourite } = useSelector(selectItems);
  // const navigate = useNavigate();
  const router = useRouter()
  const dispatch = useDispatch();

  const showProducts = () => {
    dispatch(addToSearched([]));
    router.push("/all-products");
  };

  return (
    <main className="favourites">
      <span className="favourites__info__1">
        Bezpłatna dostawa dla Klubowiczów za zakup powyżej 120 PLN, a dla
        Klubowiczów Premium bezpłatna zawsze.
      </span>
      <h2 className="favourites__title">Ulubione</h2>
      <div className={`${favourite[0] && "favourites__items"}`}>
        {favourite[0] ? (
          favourite.map((item) => (
            <Item
              className="favourites__item"
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              amount={item.amount}
              size={item.size}
            />
          ))
        ) : (
          <div className="favourites__box">
            <span className="favourites__save">ZAPISUJ ULUBIONE PRODUKTY</span>
            <span className="favourites__description">
              Chcesz dodawać produkty do Ulubionych? To proste – wystarczy
              kliknąć widoczny na produkcie symbol serca.
            </span>
            <button onClick={showProducts} className="favourites__btn">
              Zacznij przeglądać
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Favourites;
