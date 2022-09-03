import types from "../types";

const initialState = {
  lenderProduct: {
    id: 0,
  },
};

const lendersReducer = (state = initialState, action: { type; payload }) => {
  switch (action.type) {
    case types.LENDERS_DETAILS: {
      return {...state, lenderProduct : action.payload};
    }
    default:
      return state;
  }
};

export default lendersReducer;
