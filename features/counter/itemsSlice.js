import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {
    basket: [],
    favourite: [],
    searched: [],
  },
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      if (state.items.basket[0]) {
        const indexArray = [...state.items.basket].map((item) => item.id);
        if (indexArray.includes(action.payload.id)) {
          let newBasket = [...state.items.basket];
          state.items.basket = newBasket.map((item) => {
            if (  item.id === action.payload.id && item.size === action.payload.size) {
              return {
                ...item,
                amount: item.amount + 1,
              };
            } else if( item.id === action.payload.id && item.size !== action.payload.size ){
              return {
                ...item,
                id: action.payload.id,
                size: action.payload.size
              }
            }
            else {
              return item;
            }
          });
        }else {
            state.items.basket = [...state.items.basket, action.payload];
        }
      } else {
        state.items.basket = [...state.items.basket, action.payload];
      }
      
    },

    removeFromBasket: (state, action) => {
      const index = state.items.basket.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items.basket];

      state.items.basket = newBasket.filter((item, id) => id !== index);
    },

    removeAmountFromBasket: (state, action) => {
  
      let newBasket = [...state.items.basket];

      state.items.basket = newBasket.map(item => {
        if((item.id === action.payload.id) && (item.amount > 1)) {
          return {
            ...item,
            amount: item.amount - 1,
          } 
        } else if ((item.id === action.payload.id) && (item.amount = 1)) {
          return {
            ...item,
            amount: 0,
          }
        } else {
          return item;
        }
      })
    },

    addToFavourite: (state, action) => {
      if (state.items.favourite[0]) {
        const indexArray = [...state.items.favourite].map((item) => item.id);
        if (!indexArray.includes(action.payload.id)) {
          state.items.favourite = [...state.items.favourite, action.payload];
        }
      } else {
        state.items.favourite = [...state.items.favourite, action.payload];
      }
    },

    removeFromFavourite: (state, action) => {
      const index = state.items.favourite.findIndex(
        (item) => item.id === action.payload.id
      );

      let newFavourite = [...state.items.favourite];
      state.items.favourite = newFavourite.filter((item, id) => id !== index);
    },

    addAmountToBasket: (state, action) => {
      const index = state.items.basket.findIndex(
        (item) => item.id === action.payload.id
      );

      const newAmount = action.payload.newAmount;

      let newBasket = [...state.items.basket];

      state.items.basket = newBasket.map((item, id) => {
        if (id === index) {
          const newItem = {
            ...item,
            amount: newAmount,
          };
          return newItem;
        } else {
          return item;
        }
      });
    },

    addToSearched: (state, action) => {
      if(action.payload[0]){

        state.items.searched = [ ...action.payload];
      }else {
        state.items.searched = []
      }
    }
  },
});

export const {
  addToBasket,
  removeFromBasket,
  addToFavourite,
  removeFromFavourite,
  addAmountToBasket,
  removeAmountFromBasket,
  addToSearched,
} = itemsSlice.actions;

export const selectItems = (state) => state.items.items;

export const totalPrice = (state) =>
  state.items.items.basket.reduce(
    (prev, curr) => prev + curr.price * curr.amount,
    0
  );

export default itemsSlice.reducer;
