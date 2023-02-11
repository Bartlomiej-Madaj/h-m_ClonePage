import React from "react";
import Collection from "./Collection";
import classes from "./Main.module.css";
import { DUMMY_DATA } from "../data/dummy_data.js";
import { DUMMY_CATEGORY } from "../data/dummy_data.js";
import { DUMMY_MAGAZINE } from "../data/dummy_data.js";
import Carousel from 'react-elastic-carousel'

import Categories from "./Categories";
import Blog from "./Blog";

function Main() {
  return (
    <main className={classes.main}>
      <span className={classes.main__info_1}>
        Bezpłatna dostawa dla Klubowiczów za zakup powyżej 120 PLN, a dla
        Klubowiczów Premium bezpłatna zawsze.
      </span>
      <header className={classes.main__info_2}>
        <h3>
          Potrzebujesz więcej czasu na decyzję? Wydłużamy termin zwrotu
          produktów do 45 dni!
        </h3>
        <p>W sklepach i online</p>
      </header>
      <div>
        {DUMMY_DATA.map((obj) => (
          <Collection
            key={obj.id}
            id={obj.id}
            title={obj.title}
            description={obj.description}
            image={obj.image}
          />
        ))}
      </div>
      <h3 className={classes.main__categoryHeader}>Najpopularniejsze kategorie</h3>
      <div className={classes.main__category1}>
      <Carousel itemsToShow={6} itemsToScroll={6}  >
      {DUMMY_CATEGORY.map(ctg => <Categories key={ctg.id} id={ctg.id} categoryTitle={ctg.categoryTitle} person={ctg.person} image={ctg.image}  /> )}
      </Carousel>
      </div>
      <div className={classes.main__category2}>
      <Carousel itemsToShow={4} itemsToScroll={4}  >
      {DUMMY_CATEGORY.map(ctg => <Categories key={ctg.id} id={ctg.id} categoryTitle={ctg.categoryTitle} person={ctg.person} image={ctg.image}  /> )}
      </Carousel>
      </div>
      <div className={classes.main__category3}>
      <Carousel itemsToShow={3} itemsToScroll={3}  >
      {DUMMY_CATEGORY.map(ctg => <Categories key={ctg.id} id={ctg.id} categoryTitle={ctg.categoryTitle} person={ctg.person} image={ctg.image}  /> )}
      </Carousel>
      </div>
      <div className={classes.main__category4}>
      <Carousel itemsToShow={2} itemsToScroll={2}  >
      {DUMMY_CATEGORY.map(ctg => <Categories key={ctg.id} id={ctg.id} categoryTitle={ctg.categoryTitle} person={ctg.person} image={ctg.image}  /> )}
      </Carousel>
      </div>
      <div className={classes.main__magazine}>
        <h1>MAGAZINE</h1>
        <h5>A WORLD OF INSPIRATION</h5>
        <h4><a href="/#">READ H&M MAGAZINE</a></h4>
        {DUMMY_MAGAZINE.map(magazine => <Blog key={magazine.id} title={magazine.title} image={magazine.image} description={magazine.description} link={magazine.link} />)}
      </div> 
    </main>
  );
}

export default Main;
