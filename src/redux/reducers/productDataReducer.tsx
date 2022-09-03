import types from "../types";

const initialState = {
  product: null,
  businessAccount: null,
};

const productDataReducer = (state = initialState, action: { type; payload }) => {
  switch (action.type) {
    case types.PRODUCTDATA: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default productDataReducer;
