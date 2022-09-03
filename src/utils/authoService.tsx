import Auth0 from "react-native-auth0";
import { AUTHO_DOMAIN, AUTHO_CLIENTID, AUTHO_CONNECTION, AUTHO_AUDIENCE } from "@env";
import jwtDecode from "jwt-decode";

const auth0 = new Auth0({
  domain: AUTHO_DOMAIN,
  clientId: AUTHO_CLIENTID,
});


const scope = "openid profile email offline_access";

export const webLogin = async () => {

return auth0.webAuth.authorize({
  scope: scope,
  audience: AUTHO_AUDIENCE
});
}

export const loginWithPassword = async (phoneNumber: string, password: string) => {
  return auth0.auth.passwordRealm({
    username: phoneNumber.trim(),
    password: password.trim(),
    audience: AUTHO_AUDIENCE,
    scope: scope,
    realm: AUTHO_CONNECTION,
  });
};

export const loginWithSMS = async (primaryPhone: string, code: string) => {
  return auth0.auth.loginWithSMS({
    phoneNumber: primaryPhone,
    code: code,
    audience: AUTHO_AUDIENCE,
    scope: scope,
  });
};

export const passwordlessWithSMS = async (primaryPhone: string) => {
  return auth0.auth.passwordlessWithSMS({
    phoneNumber: primaryPhone.trim(),
  });
};

export const createUser = async (email: string, primaryPhone: string, password: string) => {
  return auth0.auth.createUser({
    email: email.trim(),
    username: primaryPhone.trim(),
    password: password.trim(),
    connection: AUTHO_CONNECTION,
  });
};

export const resetPassword = async (emailAddress: string) => {
  return auth0.auth.resetPassword({
    email: emailAddress.trim(),
    connection: AUTHO_CONNECTION,
  });
};

export const isTokenValid = (token: any) => {
  if (!token) {
    return false;
  }

  let decodedToken: any = jwtDecode(token);
  let currentDate = new Date();

  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return false;
  } else {
    console.log("Valid token");
    return true;
  }
};

export const refreshToken = async (token: any) => {
  return auth0.auth.refreshToken({ refreshToken: token });
};

export const userInfo = async (token: any) => {
  return auth0.auth.userInfo({
    token: token,
  });
};
