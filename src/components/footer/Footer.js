import React, { useState } from "react";
import "./Footer.css";
import EastIcon from "@mui/icons-material/East";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { buyArray, infoArray, helpArray } from "../../data/dummy_data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { titleHandler } from "../../features/counter/handlerSlice";

function Footer() {
  const [footerList, setFooterList] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showProducts = (item) => {
    navigate('/all-products');
    dispatch(titleHandler(item));
  }

  const showList = () => {
    if (!footerList) {
      setFooterList(true);
    } else {
      setFooterList(false);
    }
  };

  return (
    <div className="footer">
      <section className="footer__information">
        <div className="footer__column1">
          <div
            onClick={showList}
            className={`footer__column__wrap ${
              !footerList && "footer__list__red"
            }`}
          >
            <h3>KUPUJ</h3>
            <div className="footer__arrow">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>
          <ul
            className={`footer__list__buy ${
              footerList && "footer__list__visible"
            } `}
          >
            {buyArray.map((item, index) => (
              <li onClick={showProducts.bind(null, item)} key={index}> {item} </li>
            ))}
          </ul>
        </div>
        <div className="footer__column2">
          <div
            onClick={showList}
            className={`footer__column__wrap ${
              !footerList && "footer__list__red"
            }`}
          >
            <h3>INFORMACJE O FIRMIE</h3>
            <div className="footer__arrow">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>
          <ul
            className={`footer__list__info ${
              footerList && "footer__list__visible"
            } `}
          >
            {infoArray.map((item, index) => (
              <li key={index}> {item} </li>
            ))}
          </ul>
        </div>
        <div className="footer__column3">
          <div
            onClick={showList}
            className={`footer__column__wrap ${
              !footerList && "footer__list__red"
            }`}
          >
            <h3>POMOC</h3>
            <div className="footer__arrow">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>
          <ul
            className={`footer__list__help ${
              footerList && "footer__list__visible"
            } `}
          >
            {helpArray.map((item, index) => (
              <li key={index}> {item} </li>
            ))}
          </ul>
        </div>
        <div className="footer__column4">
          <h3>DO????CZ TERAZ</h3>
          <p>
            Do????cz do programu lojalno??ciowego i otrzymaj 10% rabatu + bezp??atn??
            standardow?? dostaw?? na kolejne zakupy.
          </p>
          <div className="footer__read">
            <a href="/#">Przeczytaj wi??cej</a>
            <EastIcon sx={{ fontSize: 19 }} className="footer__arrow__east" />
          </div>
        </div>
      </section>
      <section className="footer__icon">
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href="https://www.instagram.com/"
        >
          <InstagramIcon fontSize="medium" />
        </a>
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href="https://pl-pl.facebook.com/"
        >
          <FacebookIcon fontSize="medium" />
        </a>
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href="https://twitter.com/?lang=pl"
        >
          <TwitterIcon fontSize="medium" />
        </a>
        <a target={"_blank"} rel={"noreferrer"} href="https://www.youtube.com/">
          <YouTubeIcon fontSize="medium" />
        </a>
        <a
          target={"_blank"}
          rel={"noreferrer"}
          href="https://pl.pinterest.com/"
        >
          <PinterestIcon fontSize="medium" />
        </a>
      </section>
      <section className="footer__copyright">
        <p>
          Zawarto???? tej strony jest chroniona prawem autorskim i nale??y do
          sp????ki H & M Hennes & Mauritz AB. H&M oferuje mod?? najwy??szej jako??ci,
          kt??ra jest przyjazna dla ludzi, ??rodowiska i portfela. Od momentu
          za??o??enia w 1947 roku nieustannie si?? rozwijamy - dzi?? H&M jest jedn??
          z najwi??kszych na ??wiecie firm odzie??owych.
        </p>
      </section>
      <a href="/#">
        <img
          className="footer__logo"
          src="/images/logo_transparent.png"
          alt=""
        />
      </a>
      <p className="footer__poland">Polska | PLN</p>
    </div>
  );
}

export default Footer;
