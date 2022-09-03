import types from "../types";
import EncryptedStorage from "react-native-encrypted-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};


export const userTokenReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.USER_TOKEN: {
      return {...state, token : action.payload};
    }
    default:
      return state;
  }
};

