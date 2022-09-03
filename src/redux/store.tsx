import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import wizardsFormReducer from "./reducers/wizardsFormReducer";
import personalDetailsReducer from "./reducers/personalDetails";
import bankDetailsReducer from "./reducers/bankDetailsReducer";
import lendersReducer from "./reducers/lendersReducers";
import financeApplicationReducer from "./reducers/financeApplicationReducer";
import productIdReducer from "./reducers/productIdReducer";
import { userTokenReducer } from "./reducers/userTokenReducer";
import { ApplicationIdReducer } from "./reducers/applicationIdReducer";
import productDataReducer from "./reducers/productDataReducer";

const rootReducer = combineReducers({
  wizardsFormReducer,
  personalDetailsReducer,
  bankDetailsReducer,
  lendersReducer,
  productIdReducer,
  userTokenReducer,
  ApplicationIdReducer,
  productDataReducer,
  financeApplicationReducer,
});

export default configureStore({ reducer: rootReducer });
