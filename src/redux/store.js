import { configureStore } from "@reduxjs/toolkit";
import authedUser from "./slices/authedUser";
import language from "./slices/language";
import cart from "./slices/cart";

export const store = configureStore({
  reducer: {
    authedUser,
    language,
    cart,
  }
});
