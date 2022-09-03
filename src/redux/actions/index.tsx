import types from "../types";

export const wizardsFormData = (data: any) => {
  return {
    type: types.WIZARDS_FORM_DATA,
    payload: data,
  };
};

export const personalDetails = (data: any) => {
  return {
    type: types.PERSONAL_DETAILS,
    payload: data,
  };
};

export const bankDetails = (data: any) => {
  return {
    type: types.BANK_DETAILS,
    payload: data,
  };
};

export const lendersDetails = (data: any) => {
  return {
    type: types.LENDERS_DETAILS,
    payload: data,
  };
};

export const productId = (data: any) => {
  return {
    type: types.PRODUCT_ID,
    payload: data,
  };
};

export const userToken = (data: any) => {
  return {
    type: types.USER_TOKEN,
    payload: data,
  };
};

export const xapplicationid = (data: any) => {
  return {
    type: types.XAPPLICATIONID,
    payload: data,
  };
};

export const productData = (data: any) => {
  return {
    type: types.PRODUCTDATA,
    payload: data,
  };
};
