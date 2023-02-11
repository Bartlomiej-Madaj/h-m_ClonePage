import React from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import Menu from "../../components/drop/Menu";
import Products from '../../components/products/Products '
import { useDispatch, useSelector } from "react-redux";
import { selectHandler, userActiveHandler } from "../../features/counter/handlerSlice";
import Login from "../../components/Login/Login";
import Registration from "../../components/Login/Registration";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import { getPosts } from '../../features/counter/fetchSlice';

function ProductsPage(props) {

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

    // dispatch(getPosts(props.data));

  return (
    <div>
      {handler.menu && <Menu />}
      {handler.login && <Login />}
      {handler.registration && <Registration />}
      <Header />
      <Products fetchData={props.data} />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {

  const response = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  const data = response.map((item) => {
    if (
      ((!item.title.includes("Fjallraven") &&
        item.category === "men's clothing") ||
        item.category === "women's clothing") &&
      (item.category === "men's clothing" ||
        item.category === "women's clothing")
    ) {
      return {
        ...item,
        amount: 1,
        size: "size",
      };
    } else {
      return {
        ...item,
        amount: 1,
      };
    }
  });

  return {
    props: {data}
  }
}

export default ProductsPage