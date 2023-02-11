import "../styles/globals.css";
import '../styles/CategoryList.css';
import '../styles/Favourites.css';
import '../styles/Footer.css';
import '../styles/Item.css';
import '../styles/OneProduct.css';
import '../styles/Product.css';
import '../styles/Products .css';
import '../styles/Search.css';
import '../styles/SidebarList.css';
import '../styles/Basket.css';
import '../styles/CartItem.css';
import '../styles/Login.css';
import '../styles/Menu.css';
import '../styles/WatchedItemsList.css';
import '../styles/WatchedItems.css';
import '../styles/SubMenu.css';
import '../styles/Registration.css';
import '../styles/Main.css';
import '../styles/Logout.css';
import { store } from "../store";
import { Provider } from "react-redux";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>H&M</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/HMicon.ico"/>
        <link rel="icon" type="image/ico" sizes="32x32" href="/HMicon.ico"/>
      </Head>
      <Component className='scroll' {...pageProps} />
    </Provider>
  );
}
