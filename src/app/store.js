import {configureStore} from "@reduxjs/toolkit";
import locationSliceReducer from "../feature/locationSlice";
import restaurantsSliceReducer from "../feature/restaurantsSlice";
import collectionSliceReducer from "../feature/collectionSlice";
import menuSliceReducer from "../feature/menuSlice";
import cartSliceReducer from "../feature/cartSlice";
export const store = configureStore({
    reducer:{
      location : locationSliceReducer,
      restaurants : restaurantsSliceReducer,
      collection : collectionSliceReducer,
      menu : menuSliceReducer,
      cart : cartSliceReducer
    }
});