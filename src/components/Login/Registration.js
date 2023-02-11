import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  loginHandler,
  registrationHandler,
  selectHandler,
} from "../../features/counter/handlerSlice";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

import "./Registration.css";

function Registration() {
  const handler = useSelector(selectHandler);
  const dispatch = useDispatch();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const errorEmail = (
    <span className="error__email">Podaj prawidłowy email</span>
  );
  const errorPassword = (
    <span className="error__password">Minimalna długość hasła to 6 znaków</span>
  );
  const errorUser = (
    <span className="registration__wrong-user">
      Użytkownik o podanym adresie email już istnieje!!!
    </span>
  );

  const register = async (e) => {
    e.preventDefault();

    const pattern = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (!pattern.test(registerEmail)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }

    if (registerPassword.length < 6 || registerPassword.trim() === "") {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }

    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          setRegisterEmail("");
          setRegisterPassword("");
          dispatch(registrationHandler(false));
          dispatch(loginHandler(true));
        }
      })
      .catch((error) => {
        setValidUser(true);
      });
  };

  const removeBackdrop = () => {
    if (!handler.registration) {
      dispatch(registrationHandler(true));
    } else {
      dispatch(registrationHandler(false));
    }
  };

  const showLogin = () => {
    dispatch(loginHandler(true));
    dispatch(registrationHandler(false));
  };

  return (
    <div className="login">
      <div className="login__all">
        <div className="login__block">
          <p>Zarejestruj się </p>
          <CloseIcon
            onClick={removeBackdrop}
            className="login__x"
            fontSize="large"
          />
        </div>
        <p className="login__bargain">
          Zostań uczestnikiem — nie przegap okazji, ofert, rabatów i bonusy
          rabatowe.
        </p>
        <form onSubmit={register} className="login__form">
          <div className="login__email">
            {validUser && !validPassword && !validEmail && errorUser}
            <label htmlFor="email">E-mail</label>
            <input
              required
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
              placeholder="Wpisz E-mail"
              type="email"
              id="email"
            />
            {validEmail && errorEmail}
          </div>
          <div className="login__password">
            <label htmlFor="password">Hasło</label>
            <input
              required
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
              placeholder="Wpisz hasło"
              type="password"
              id="password"
            />
            {validPassword && errorPassword}
          </div>
          <div className="login__checkbox__wraper">
            <div className="login__checkbox">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Pamiętaj mnie</label>
            </div>
            <span className="login__form__span">Nie pamiętasz hasła?</span>
          </div>
          <button type="submit" className="login__btn1">
            Zarejestruj się
          </button>
        </form>
        <button onClick={showLogin} className="login__btn2">
          Zaloguj się
        </button>
        <span className="login__info">Informacje o członkostwie</span>
      </div>
      <div onClick={removeBackdrop} className="login__drop"></div>
    </div>
  );
}

export default Registration;
