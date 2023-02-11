import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import Menu from "../../components/drop/Menu";
import Basket from '../../components/basket/Basket'
import { useDispatch, useSelector } from "react-redux";
import { selectHandler, userActiveHandler } from "../../features/counter/handlerSlice";
import Login from "../../components/Login/Login";
import Registration from "../../components/Login/Registration";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

function BasketPage() {
  const handler = useSelector(selectHandler);
  const dispatch = useDispatch();

  if (!handler.registration) {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(userActiveHandler(currentUser.email));
      } else {
        dispatch(userActiveHandler(""));
      }
    });
  } else {
    dispatch(userActiveHandler(""));
  }

  return (
    <div>
      {handler.menu && <Menu />}
      {handler.login && <Login />}
      {handler.registration && <Registration />}
      <Header />
      <Basket />
      <Footer />
    </div>
  );
}

export default BasketPage;