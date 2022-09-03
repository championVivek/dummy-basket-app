import types from "../types";

const initialState = {
  bankDetails: {
    accountType: "Current",
    name: "",
    acc_number: "",
    sort_code: "",
    iban: "",
  },
};

const bankDetailsReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
      case types.BANK_DETAILS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default bankDetailsReducer;
