import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, selectPosts } from "../../features/counter/fetchSlice";
import WatchedItems from "./WatchedItems";
// import "./WatchedItemsList.css";

function WatchedItemsList({ name }) {
  const [watchedItems, setWatchedItems] = useState([]);

  const {fetchData} = useSelector(selectPosts)

  
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (loading === "idle") {
  //     dispatch(getPosts());
  //   }
  // }, [dispatch, loading]);

  useEffect(() => {
    const watchedItems = [...fetchData].slice(
      Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 10) + 5
    );

    setWatchedItems(watchedItems);
  }, []);

  return (
    <section className="basket__box__3">
      <h3>{name}</h3>
      <div className="basket__box__list">
        {watchedItems[0] ? (
          watchedItems.map((item) => (
            <WatchedItems
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
          <p className="basket__no_results">Brak wyników</p>
        )}
      </div>
    </section>
  );
}

export default WatchedItemsList;
