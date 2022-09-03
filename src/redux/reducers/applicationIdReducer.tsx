import types from "../types";

const initialState = {
  applicationId: null,
};

export const ApplicationIdReducer = (state = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case types.XAPPLICATIONID: {
      return { ...state, applicationId: action.payload };
    }
    default:
      return state;
  }
};
