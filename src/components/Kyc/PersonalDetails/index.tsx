import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";


import styles from "./styles";
import { ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import commonStyles from "../../../common/styles";
import TextInputField from "../../TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import fontFamily from "../../../common/fontFamily";
import Button from "../../Button/Button";
import HideKeyboard from "../../HideKeyboard";
import { useDispatch } from "react-redux";
import types from "../../../redux/types";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../../screens/Loader/Loading";
import { validate } from "validate.js";

var constraints = {
  isValidEmail: {
    email: true,
  },
};

const PersonalDetails: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState({
    titleError: false,
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
  });
  const [emailCorrectEmail, setEmailCorrectError] = useState<boolean>(false);
  const isfocused = useIsFocused()

  const titleValues = [
    { label: 'Mr', value: 'Mr' },
    { label: 'Mrs', value: 'Mrs' },
    { label: 'Miss', value: 'Miss' },
    { label: 'Ms', value: 'Ms' },
    { label: 'Dr', value: 'Dr' },
    { label: 'Other', value: 'Other' }
  ]

  const dispatch = useDispatch();





  useEffect(() => {
    if (firstName.trim()) setError({ ...error, firstNameError: false });
    if (lastName.trim()) setError({ ...error, lastNameError: false });
  }, [firstName, lastName]);

  const nextPage = async () => {
    if (!firstName?.trim()) {
      setError({ ...error, firstNameError: true });
      return;
    }
    if (!lastName?.trim()) {
      setError({ ...error, lastNameError: true });
      return;
    }
    const isValid = await validate({ isValidEmail: email }, constraints);

    if (isValid) {
      setEmailCorrectError(true);
      throw new Error();
    } else {
      setEmailCorrectError(false);
    }
    dispatch({
      type: types.PERSONAL_DETAILS,
      payload: {
        firstName,
        lastName,
        email_address: email,
        phone_number: phoneNumber,
      },
    });
    if (pageIndex !== undefined) {
      changePage(pageIndex + 1);
    }
  };

  return (
    <HideKeyboard>
      <KeyboardAvoidingView
        collapsable={true}
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[AppContainer.container, { flex: 1 }]}
      >
        {loading ? <Loading /> :
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={{ flex: 0.7 }}>
              <Text style={commonStyles.title}>Enter Your Details</Text>
              <TextInputField
                title="First Name"
                placeholder="First Name"
                defaultValue={firstName}
                placeholderColor={Colors.disableColor}
                error={error.firstNameError}
                value={firstName}
                onChangeText={(text: string) => setFirstName(text)}
                fontFamily={fontFamily["Roboto-Medium"]}
                fontSize={24}
                errorMessage="Please fill this required field."
                customStyle={{
                  paddingBottom: 5,
                  borderColor: error.firstNameError
                    ? Colors.errorColor
                    : Colors[85858580],
                }}
              />
              <TextInputField
                title="Last Name"
                defaultValue={lastName}
                placeholder="Last name"
                placeholderColor={Colors.disableColor}
                error={error.lastNameError}
                value={lastName}
                onChangeText={(text: string) => setLastName(text)}
                errorMessage="Please fill this required field."
                fontFamily={fontFamily["Roboto-Medium"]}
                fontSize={24}
                customStyle={{
                  paddingBottom: 5,
                  borderColor: error.lastNameError
                    ? Colors.errorColor
                    : Colors[85858580],
                }}
              />
              <TextInputField
                title="Email Address"
                defaultValue={email}
                error={error.emailError || emailCorrectEmail}
                value={emailCorrectEmail ? null : email}
                placeholder="email address"
                keyboardType="email-address"
                placeholderColor={Colors.disableColor}
                onChangeText={(text: string) => setEmail(text)}
                errorMessage={
                  emailCorrectEmail
                    ? "Please enter a valid email address."
                    : "Please fill this required field."
                }
                fontFamily={fontFamily["Roboto-Medium"]}
                fontSize={24}
                customStyle={{
                  paddingBottom: 5,
                  borderColor:
                    error.emailError || emailCorrectEmail
                      ? Colors.errorColor
                      : Colors[85858580],
                }}
              />
              <TextInputField
                title="Phone Number"
                defaultValue={phoneNumber}
                error={error.phoneNumberError}
                placeholder="phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                placeholderColor={Colors.disableColor}
                onChangeText={(text: string) => setPhoneNumber(text)}
                errorMessage="Please fill this required field."
                fontFamily={fontFamily["Roboto-Medium"]}
                fontSize={24}
                customStyle={{
                  paddingBottom: 5,
                  borderColor: error.phoneNumberError
                    ? Colors.errorColor
                    : Colors[85858580],
                }}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button title="Next" onPress={nextPage} />
            </View>
          </ScrollView>}
      </KeyboardAvoidingView>
    </HideKeyboard>
  );
};

export default PersonalDetails;
