import types from "../types";

const initialState = {
  productId: null,
};

const productIdReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {

  switch (action.type) {
    case types.PRODUCT_ID: {
      return {...state, productId : action.payload};

    }
    default:
      return state;
  }
};

export default productIdReducer;
