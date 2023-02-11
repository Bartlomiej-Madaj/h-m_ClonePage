import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components//main/Main";
import Menu from "./components/drop/Menu";
import { useDispatch, useSelector } from "react-redux";
import { selectHandler, userActiveHandler } from "./features/counter/handlerSlice";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Favourites from "./components/favourites/Favourites";
import Basket from "./components/basket/Basket";
import Products from "./components/products/Products ";
import Registration from "./components/Login/Registration";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import { useEffect } from "react";
import OneProduct from "./components/product/OneProduct";

function App() {

  const handler = useSelector(selectHandler);
  const dispatch = useDispatch()

  if(!handler.registration){
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
     dispatch(userActiveHandler(currentUser.email));
   }else {
      dispatch(userActiveHandler(''));
   }
  });
  }
 
  const bodyStyle = document.body.style;

  useEffect(() => {
    if (handler.menu || handler.login || handler.registration ) {
      bodyStyle.overflowY = "hidden";
    } else {
      bodyStyle.overflowY = "scroll";
    }
  }, [handler, bodyStyle])

  return (
    <div>
      {handler.menu && <Menu />}
      {handler.login && <Login />}
      {handler.registration && <Registration />}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route  path="/favourites" element={<Favourites />} />
        <Route  path="/cart" element={<Basket />} />
        <Route path="/all-products" element={<Products />} />
        <Route path="/:itemId" element={<OneProduct />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
