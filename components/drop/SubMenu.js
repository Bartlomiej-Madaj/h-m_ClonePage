import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./SubMenu.css";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useDispatch } from "react-redux";
import {
  menuHandler,
  subMenuHandler,
  titleHandler,
} from "../../features/counter/handlerSlice";
import { addToSearched } from "../../features/counter/itemsSlice";
import { useRouter } from "next/router";

function SubMenu(props) {
  // const navigate = useNavigate();
  const router = useRouter()
  const dispatch = useDispatch();

  const showProducts = (item) => {
    router.push("/all-products");
    dispatch(addToSearched([]));
    dispatch(subMenuHandler(false));
    dispatch(menuHandler(false));
    dispatch(titleHandler(item));
  };

  return (
    <div className="menu submenu">
      <div className="menu__all submenu__all">
        <div className="menu__top submenu__top">
          <ArrowBackOutlinedIcon
            onClick={props.backSubmenu}
            sx={{ fontSize: 30 }}
            className="footer__arrow__east"
          />
          <span>{props.person}</span>
        </div>
        <div className="menu__main submenu__main ">
          {props.items[0].slice(0, 3).map((item, index) => (
            <p onClick={showProducts.bind(null, item)} key={index}>
              {item}
            </p>
          ))}
          <h4>Produkty</h4>
          <ul>
            {props.items[1].map((item, index) => (
              <li onClick={showProducts.bind(null, item)} key={index}>
                {item}
              </li>
            ))}
          </ul>
          {props.items[0].slice(4).map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
        <div className="submenu__top__btn">
          <button onClick={showProducts.bind(null, props.person)}>{props.person}</button>
        </div>
      </div>
      <div className="menu__x_background">
        <CloseIcon
          onClick={props.onClick}
          className="menu__x"
          fontSize="large"
        />
      </div>
      <div onClick={props.onClick} className="menu__drop"></div>
    </div>
  );
}

export default SubMenu;
