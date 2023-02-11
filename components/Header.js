import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginHandler,
  menuHandler,
  selectHandler,
  searchHandler,
  logoutHandler,
} from "../features/counter/handlerSlice";
import Search from "./search/Search";
import { selectItems } from "../features/counter/itemsSlice";
import { useRouter } from "next/router";
import Logout from "./Login/Logout";

function Header() {
  const router = useRouter()

  const handler = useSelector(selectHandler);
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  const showMenu = () => {
    if (!handler.menu) {
      dispatch(menuHandler(true));
    } else {
      dispatch(menuHandler(false));
    }
  };

  const showLogin = () => {
    if (!handler.userActive) {
      dispatch(loginHandler(true));
    } else {
      dispatch(logoutHandler(true))
    }
  };

  const showSearch = () => {
    dispatch(searchHandler(true));
  };

  const showHomePage = () => {
    router.push("/");
  };

  const showFavouritesPage = () => {
    router.push("/favourites");
  };

  const showCartPage = () => {
    router.push("/cart");
  };

  function showLogout() {
    dispatch(logoutHandler(true))
  }

  if(typeof window !== 'undefined' ) {
    (handler.menu || handler.login || handler.registration || handler.logout ) ? document.body.style.overflowY='hidden' : document.body.style.overflowY='scroll'
  }

  return (
    <div className={classes.header}>
      {handler.search ? (
        <Search />
      ) : (
        <nav className={classes.header__nav}>
          {handler.logout && <Logout/>}
          <MenuOutlinedIcon
            onClick={showMenu}
            className={classes.header__menuIcon}
            sx={{ fontSize: 30 }}
          />
          <img
            onClick={showHomePage}
            src="/images/logo_transparent.png"
            alt="logo H&M"
          />
          <div className={classes.header__leftIcon}>
            {handler.userActive && (
              <span onClick={showLogout} className={classes.header__user_email}>
                {handler.userActive}
              </span>
            )}
            <PersonOutlineOutlinedIcon
              onClick={showLogin}
              sx={{ fontSize: 30 }}
              className={`${handler.userActive && classes.header__person_icon}`}
            />
            <SearchOutlinedIcon onClick={showSearch} sx={{ fontSize: 30 }} />
            <div className={classes.header__leftIcon_favourite}>
              <FavoriteBorderOutlinedIcon
                onClick={showFavouritesPage}
                sx={{ fontSize: 30 }}
              />
              <span>{items.favourite.length}</span>
            </div>
            <div className={classes.header__leftIcon__basket}>
              <ShoppingBagOutlinedIcon
                onClick={showCartPage}
                sx={{ fontSize: 30 }}
              />
              <span>{items.basket.length}</span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Header;
