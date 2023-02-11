
import React from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import Menu from "../../components/drop/Menu";
import OneProduct from '../../components/product/OneProduct'
import { useDispatch, useSelector } from "react-redux";
import { selectHandler, userActiveHandler } from "../../features/counter/handlerSlice";
import Login from "../../components/Login/Login";
import Registration from "../../components/Login/Registration";
import { useRouter } from 'next/router';

function OneProductPage(props) {
 
    const handler = useSelector(selectHandler);

    //WHEN REDUX IS USED
    // const router = useRouter()

    // const { id } =router.query;

  return (
    <div>
      {handler.menu && <Menu />}
      {handler.login && <Login />}
      {handler.registration && <Registration />}
      <Header />
      <OneProduct  product={props.product}  />
      <Footer />
    </div>
  )
  //product={props.product}
  //itemId={id}
  
}

async function getData() {
  const response = await fetch(`https://fakestoreapi.com/products`).then(
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

  return data;
}

export async function getStaticProps(contex) {

 const { params } = contex;

 const productId = params.id;

 const data = await getData();

 const product = data.find(item => item.id === Number(productId));

 if(!product){
  return {notFound: true}
 }

  return {
    props: {
      product
    },
    
  }
}
export async function getStaticPaths () {

  const data = await getData();

  const productPaths = data.map(item => ({params: {id: String(item.id)}}))

  return {
    paths: productPaths,
    fallback: true,
  }
}


export default OneProductPage