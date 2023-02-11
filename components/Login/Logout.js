import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutHandler, selectHandler, userActiveHandler } from '../../features/counter/handlerSlice';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

function Logout() {
    const handler = useSelector(selectHandler);
    const dispatch = useDispatch();

    const logout = () => {
        signOut(auth);
        dispatch(logoutHandler(false))
        dispatch(userActiveHandler(""));
      };

      const removeBackdrop = () => {
        if (handler.logout) {
            dispatch(logoutHandler(false));
        } else {
            dispatch(logoutHandler(true))
        }
      };

  return (
    <div className="logoutPanel">
    <span className="logoutPanel__question">
      Czy na pewno chcesz się wylogować?
    </span>
    <span className="logoutPanel__email">{handler.userActive}</span>
    <button onClick={logout} className="logoutPanel__btn">
      Wyloguj
    </button>
    <div onClick={removeBackdrop}  className="logoutPanel__drop"></div>
  </div>
  )
}

export default Logout