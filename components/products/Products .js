import React from "react";
// import "./Products .css";
import Product from "./Product";
import SidebarList from "./SidebarList";
import { selectHandler } from "../../features/counter/handlerSlice";
import { useList } from "../hooks/useList";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../features/counter/fetchSlice";
import CategoryList from "./CategoryList";
import { addToSearched, selectItems } from "../../features/counter/itemsSlice";
import { useRouter } from "next/router";

function Products({fetchData}) {
  const handler = useSelector(selectHandler);
  const { searched } = useSelector(selectItems);
  const router = useRouter()

  const dispatch = useDispatch();

  // const {fetchData} = useSelector(selectPosts)


  const list = [
    { list: useList(), title: "Nowości" },
    { list: useList(), title: "Najmodniejsze teraz" },
    { list: useList(), title: "Oferty" },
    { list: useList(), title: "Prezenty" },
    { list: useList(), title: "Produkty" },
    { list: useList(), title: "Nasza odpowiedzialność" },
    { list: useList(), title: "Magazine" },
    { list: useList(), title: "Stroje okolicznościowe" },
  ];

  if (!fetchData) {
    return (
      <div className="products__loading">
        <div className="products__loading__ring"></div>
        <h2>Loading...</h2>
      </div>
    );
  }

  const showProducts = () => {
    dispatch(addToSearched([]));
    router.push('/all-products')
  }

  return (
    <main className="products">
      { !searched[0] && <section className="products__sidebar">
        {list.map((item, index) => (
          <SidebarList key={index} title={item.title} list={item.list} />
        ))}
      </section>}
      <section className="products__content">
        <h2 className={`${!searched[0] ? "products__content__title" : "products__content__title title__centered" }`}>{ !searched[0] ? handler.title : (searched[0]?.message || 'Twój wynik szukania')}</h2>
        
       { !searched[0] && <span className="products__content__description">
          Od bazy na co dzień po wyraziste kreacje - tutaj znajdziesz
          najmodniejsze trendy i nowe ubrania damskie.
        </span>}
        {!searched[0] && <section className="products__content__list">
          <CategoryList list={list} />
        </section>}
        <div className="products__content__items">
          { !searched[0] ? fetchData.map((item) => (
            <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              amount={item.amount}
              size={item.size}
              className="products__content__items__item"
            />
          )) : searched.map((item) =>{
            if(item.message){
              return <div className="no_product">
                <button onClick={showProducts} className="favourites__btn">Zacznij przeglądać</button>
              </div>
            }else {
              return <Product
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              amount={item.amount}
              size={item.size}
              className="products__content__items__item"
            />
            }
          } 
            )}
        </div>
      </section>
    </main>
  );
}

export default Products;
