import types from "../types";

const initialState = {
  financeApplication: {
    distanceSale: true,
    loanTerm: 48,
    deposit: 1000,
    estimatedAnnualMileage: 8000,
  },
};

const financeApplicationReducer = (state = initialState, action: { type; payload }) => {
  switch (action.type) {
    case types.FINANCE_APPLICATION: {
      return {...state, financeApplication : action.payload};
    }
    default:
      return state;
  }
};

export default financeApplicationReducer;
