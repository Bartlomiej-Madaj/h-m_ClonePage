import React from "react";
// import "./Basket.css";
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  loginHandler,
  selectHandler,
} from "../../features/counter/handlerSlice";
import CartItem from "./CartItem";
import WatchedItemsList from "./WatchedItemsList";
import { selectItems, totalPrice } from "../../features/counter/itemsSlice";

function Basket() {
  const { userActive } = useSelector(selectHandler);

  const dispatch = useDispatch();

  const { basket } = useSelector(selectItems);
  const amount = useSelector(totalPrice);

  const showLogin = () => {
    dispatch(loginHandler(true));
  };

  const currencyPrice = new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount);

  return (
    <main className="basket">
      <section className="basket__box__1">
        <span className="basket__info__1">
          Bezpłatna dostawa dla Klubowiczów za zakup powyżej 120 PLN, a dla
          Klubowiczów Premium bezpłatna zawsze.
        </span>
        <h2 className="basket__title">Zobacz koszyk</h2>
      </section>
      <section className="basket__box__2">
        <div
          className="basket__cart1"
          style={
            basket
              ? { backgroundColor: "rgb(250, 248, 244)" }
              : { backgroundColor: "white" }
          }
        >
          {basket[0] ? (
            basket.map((item) => (
              <CartItem
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
            <div className={"basket__cart2"}>
              <h1 className="basket__cart__title">TWÓJ KOSZYK JEST PUSTY!</h1>
              <span className="basket__cart__login1">
                Zaloguj się lub przejdź do produktów zapisanych w Twoim koszyku.
              </span>
              <span onClick={showLogin} className="basket__cart__login2">
                Zaloguj się
              </span>
            </div>
          )}
        </div>
        <div className="basket__payment">
          <div className="basket__payment__wrap">
            <div className="basket__payment__discount">
              <div className="basket__payment__discount__wrap">
                <span className="basket__payment__discount1">Rabaty</span>
                <span className="basket__payment__discount2">
                  Zastosuj zniżkę
                </span>
              </div>
              {!userActive && (
                <span className="basket__payment__discount3">
                  Zaloguj się, aby skorzystać ze spersonalizowanych ofert!
                </span>
              )}
              {!userActive && <button onClick={showLogin}>Zaloguj się</button>}
              {!userActive && <div className="basket__payment__border"></div>}
            </div>
            <div className="basket__payment__amount">
              <span className="basket__payment__amount1">Suma</span>
              <span className="basket__payment__amount2">{currencyPrice}</span>
            </div>
            <button
              className={`${
                userActive && amount !== 0
                  ? "basket__payment__btn basket__payment__btn__active"
                  : "basket__payment__btn"
              }`}
            >
              Przejdź do finalizacji zamówienia
            </button>
            <span className="basket__payment__description">
              Kup teraz, zapłać za 30 dni. Dla Klubowiczów H&M korzystających z
              H&M
            </span>
            <span className="basket__payment__accept">Akceptujemy</span>
            <img
              className="basket__payment__img"
              src="/images/debetCard.PNG"
              alt="debetcard"
            />
            <p className="basket__payment__smallprint1">
              Ceny i koszty dostawy zostaną potwierdzone po przejściu do etapu
              finalizacji zamówienia.
            </p>
            <p className="basket__payment__smallprint2">
              30 dni na zmianę decyzji. Dowiedz się więcej o <br />
              <u>Zasadach zwrotu produktów i pieniędzy.</u>
            </p>
          </div>
          <div className="basket__shipment">
            <ViewInArOutlinedIcon
              className="basket__shipment__cube"
              fontSize="small"
            />
            <span className="basket__shipment__text">
              Opcje dostawy i zwrotu
            </span>
            <ArrowForwardIosOutlinedIcon
              className="basket__shipment__arrow"
              fontSize="small"
            />
          </div>
        </div>
      </section>

      <WatchedItemsList name="Może Ci się też spodobać" />
      <WatchedItemsList name="Oglądane ostatnio" />
    </main>
  );
}

export default Basket;
