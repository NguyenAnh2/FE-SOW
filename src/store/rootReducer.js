import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import languageReducer from "../features/language/languageSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  products: productsReducer,
  language: languageReducer,
});

export default rootReducer;
