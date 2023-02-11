import "./Menu.css";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import {
  loginHandler,
  logoutHandler,
  menuHandler,
  selectHandler,
  subMenuHandler,
} from "../../features/counter/handlerSlice";
import SubMenu from "./SubMenu";
import { useState } from "react";
import {
  menuArray,
  menuSubarray,
  herMenuArray,
  herSubMenuArray,
} from "../../data/dummy_data";

function Menu() {
  const [person, setPerson] = useState("");

  const handler = useSelector(selectHandler);
  const dispatch = useDispatch();

  const removeBackdrop = () => {
    if (!handler.menu) {
      dispatch(menuHandler(true));
    } else {
      dispatch(subMenuHandler(false));
      dispatch(menuHandler(false));
    }
  };

  const showLogin = () => {
    if (!handler.userActive) {
      dispatch(menuHandler(false));
      dispatch(loginHandler(true));
    } else {
      dispatch(logoutHandler(true));
      dispatch(menuHandler(false));
    }
  };

  const showSubMenu = (e) => {
    dispatch(subMenuHandler(true));
    setPerson(e.target.innerText);
  };

  const backSubmenu = () => {
    dispatch(subMenuHandler(false));
  };

  return (
    <div className="menu">
      {handler.subMenu ? (
        <SubMenu
          backSubmenu={backSubmenu}
          person={person}
          onClick={removeBackdrop}
          items={[herMenuArray, herSubMenuArray]}
        />
      ) : (
        <div>
          <div className="menu__all">
            <div className="menu__top">
              <PersonOutlineOutlinedIcon
                onClick={showLogin}
                sx={{ fontSize: 30 }}
              />
              <span onClick={showLogin}>
                {handler.userActive ? handler.userActive : "Zaloguj się"}
              </span>
            </div>
            <div className="menu__main">
              {menuArray.map((item, index) => (
                <p key={index} onClick={showSubMenu}>
                  {item}
                </p>
              ))}
              <ul>
                {menuSubarray.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="menu__x_background">
            <CloseIcon
              onClick={removeBackdrop}
              className="menu__x"
              fontSize="large"
            />
          </div>
          <div onClick={removeBackdrop} className="menu__drop"></div>
        </div>
      )}
    </div>
  );
}

export default Menu;
