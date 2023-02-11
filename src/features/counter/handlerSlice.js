import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    login: false,
    menu: false,
    search: false,
    subMenu: false,
    registration: false,
    logout: false,
    userActive: "",
    title: "Nowości",
  },
};
export const handlerSlice = createSlice({
  name: "handler",
  initialState,

  reducers: {
    loginHandler: (state, action) => {
      state.value.login = action.payload;
    },

    logoutHandler: (state, action) => {
      state.value.logout = action.payload;
    },

    userActiveHandler: (state, action) => {
      state.value.userActive = action.payload;
    },

    registrationHandler: (state, action) => {
      state.value.registration = action.payload;
    },

    menuHandler: (state, action) => {
      state.value.menu = action.payload;
    },

    searchHandler: (state, action) => {
      state.value.search = action.payload;
    },

    subMenuHandler: (state, action) => {
      state.value.subMenu = action.payload;
    },

    titleHandler: (state, action) => {
      state.value.title = action.payload;
    },
  },
});

export const {
  menuHandler,
  loginHandler,
  userActiveHandler,
  registrationHandler,
  searchHandler,
  subMenuHandler,
  titleHandler,
  logoutHandler
} = handlerSlice.actions;

export const selectHandler = (state) => state.handler.value;

export default handlerSlice.reducer;
