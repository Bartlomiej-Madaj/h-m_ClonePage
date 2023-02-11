import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loginHandler,
  menuHandler,
  selectHandler,
  searchHandler,
  logoutHandler,
} from "../../features/counter/handlerSlice";
import Search from "../search/Search";
import { useNavigate } from "react-router-dom";
import { selectItems } from "../../features/counter/itemsSlice";

import Logout from "../drop/Logout";

function Header() {
  const navigate = useNavigate();

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
      dispatch(logoutHandler(true));
    }
  };

  const showSearch = () => {
    dispatch(searchHandler(true));
  };

  const showHomePage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const showFavouritesPage = () => {
    navigate("/favourites");
  };

  const showCartPage = () => {
    navigate("/cart");
  };

  function showLogout() {
    dispatch(logoutHandler(true));
  }

  return (
    <div className="header">
      {handler.search ? (
        <Search />
      ) : (
        <nav className="header__nav">
          {handler.logout && <Logout />}
          <MenuOutlinedIcon
            onClick={showMenu}
            className="header__menuIcon"
            sx={{ fontSize: 30 }}
          />
          <img
            onClick={showHomePage}
            src="/images/logo_transparent.png"
            alt="logo H&M"
          />
          <div className="header__leftIcon">
            {handler.userActive && (
              <span onClick={showLogout} className="header__user-email">
                {handler.userActive}
              </span>
            )}
            <PersonOutlineOutlinedIcon
              onClick={showLogin}
              sx={{ fontSize: 30 }}
              className={`${handler.userActive && "header__person-icon"}`}
            />
            <SearchOutlinedIcon onClick={showSearch} sx={{ fontSize: 30 }} />
            <div className="header__leftIcon_favourite">
              <FavoriteBorderOutlinedIcon
                onClick={showFavouritesPage}
                sx={{ fontSize: 30 }}
              />
              <span>{items.favourite.length}</span>
            </div>
            <div className="header__leftIcon__basket">
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
