import types from "../types";

const initialState = {
  firstName: "",
  lastName: "",
  email_address: "",
  phone_number: "",
};

const personalDetailsReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  
  switch (action.type) {
    case types.PERSONAL_DETAILS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default personalDetailsReducer;
