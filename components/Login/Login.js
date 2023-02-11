// import "./Login.css";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  loginHandler,
  registrationHandler,
  selectHandler,
  userActiveHandler,
} from "../../features/counter/handlerSlice";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

function Login() {
  const handler = useSelector(selectHandler);
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [validUser, setValidUser] = useState(false);

  const wrongPassword = (
    <span className="login__wrong-user">
      Podane hasło lub e-mail jest nieprawidlowe!!!
    </span>
  );

  const login = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user.uid) {
          dispatch(userActiveHandler(user.email));
          dispatch(loginHandler(false));
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValidUser(true);
      });
  };

  const removeBackdrop = () => {
    if (!handler.login) {
      dispatch(loginHandler(true));
    } else {
      dispatch(loginHandler(false));
    }
  };

  const showRegistration = () => {
    dispatch(registrationHandler(true));
    dispatch(loginHandler(false));
  };


  return (
    <div className="login">
      <div className="login__all">
        <div className="login__block">
          <p>Zaloguj się </p>
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
        <form onSubmit={login} className="login__form">
          <div className="login__email">
            {validUser && wrongPassword}
            <label htmlFor="email">E-mail</label>
            <input
              required
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
              placeholder="Wpisz E-mail"
              type="email"
              id="email"
            />
          </div>
          <div className="login__password">
            <label htmlFor="password">Hasło</label>
            <input
              required
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
              placeholder="Wpisz hasło"
              type="password"
              id="password"
            />
          </div>
          <div className="login__checkbox__wraper">
            <div className="login__checkbox">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Pamiętaj mnie</label>
            </div>
            <span className="login__form__span">Nie pamiętasz hasła?</span>
          </div>
          <button type="submit" className="login__btn1">
            Zaloguj się
          </button>
        </form>
        <button onClick={showRegistration} className="login__btn2">
          Dołącz do nas
        </button>
        <span className="login__info">Informacje o członkostwie</span>
      </div>
      <div onClick={removeBackdrop} className="login__drop"></div>
    </div>
  );
}

export default Login;
