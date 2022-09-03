import types from "../types";

const initialState = {
  wizardsFormData: [
    {
      name: "",
      value: "",
    },
  ],
};

const wizardsFormReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.WIZARDS_FORM_DATA: {
      return {
        wizardsFormData: [...state.wizardsFormData, action.payload],
      };
    }
    default:
      return state;
  }
};

export default wizardsFormReducer;
