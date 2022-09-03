import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routename } from "./Routes";
import QrScannerScreen from "../screens/qrScannerScreen/QrScannerScreen";
import ScanSuccessScreen from "../screens/scanSuccessScreen/ScanSuccessScreen";
import GetStartedScreen from "../screens/getStartedScreen/GetStartedScreen";
import EncryptedStorage from "react-native-encrypted-storage";
import PaymentMethodScreen from "../screens/paymentMethodScreen/PaymentMethodScreen";
import AddCardScreen from "../screens/addCardScreen/AddCardScreen";
import ProgressScreens from "../screens/progressScreens/ProgressScreens";
import LoginScreen from "../screens/authScreens/loginScreen/LoginScreen";
import SignupScreen from "../screens/authScreens/signupScreen/SignupScreen";
import ForgotPassword from "../screens/authScreens/forgotPasswordScreen/ForgotPassword";
import OtpScreen from "../screens/authScreens/otpScreen/OtpScreen";
import DrawSignatureScreen from "../screens/drawSignatureScreen/DrawSignatureScreen";
import CheckoutScreen from "../screens/checkoutScreen/CheckoutScreen";
import BankDetailsScreen from "../screens/bankDetailsScreen/BankDetailsScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={routename.QrScannerScreen}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={routename.QrScannerScreen}
          component={QrScannerScreen}
        />
        <Stack.Screen
          name={routename.ScanSuccessScreen}
          component={ScanSuccessScreen}
          initialParams={{ qrCodeData: {}, businessAccount: {} }}
        />
        <Stack.Screen
          name={routename.GetStartedScreen}
          component={GetStartedScreen}
        />
        <Stack.Group>
          <Stack.Screen
            name={routename.AddCardScreen}
            component={AddCardScreen}
          />
          <Stack.Screen
            name={routename.ProgressScreens}
            component={ProgressScreens}
          />
          <Stack.Screen
            name={routename.PaymentMethodScreen}
            component={PaymentMethodScreen}
          />
          <Stack.Screen
            name={routename.DrawSignatureScreen}
            component={DrawSignatureScreen}
          />
          <Stack.Screen
            name={routename.CheckoutScreen}
            component={CheckoutScreen}
          />
          <Stack.Screen
            name={routename.BankDetailsScreen}
            component={BankDetailsScreen}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen name={routename.LoginScreen} component={LoginScreen} />
          <Stack.Screen
            name={routename.SignupScreen}
            component={SignupScreen}
          />
          <Stack.Screen
            name={routename.ForgotPasswordScreen}
            component={ForgotPassword}
          />
          <Stack.Screen name={routename.OtpScreen} component={OtpScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </>
  );
};

export default AppNavigation;
