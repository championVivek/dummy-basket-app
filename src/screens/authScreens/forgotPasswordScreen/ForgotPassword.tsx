import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "../../../components/Header/Header";
import AppContainer from "../../../common/AppContainer";
import { AuthScreenIcon } from "../../../../assets/svg";
import EntypoIcon from "react-native-vector-icons/Entypo";
import TextInputField from "../../../components/TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import Button from "../../../components/Button/Button";
import commonStyles from "../../../common/styles";
import { Props } from "../../../../@types";
import { showMessage } from "react-native-flash-message";
import { validate } from "validate.js";
import { resetPassword } from "../../../utils/authoService";

const ForgotPassword = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const emailIcon = () => (
    <EntypoIcon name="email" size={22} color={Colors.lineColor} />
  );

  var constraints = {
    isValidEmail: {
      email: true,
    },
  };

  const handleForgotPwd = async () => {
    try {
      const isValid = await validate({ isValidEmail: email }, constraints);
      if (isValid) {
        setEmailError(true);
        throw new Error();
      } else {
        setEmailError(false);
      }

      await resetPassword(
        email
      );
      showMessage({
        message: "Please check your email address",
        type: "info",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => (
    <View>
      <Text style={commonStyles.authTitle}>Forgot {"\n"}Password?</Text>
      <View>
        <Text style={styles.text}>
          Don&#39;t worry! It happens. Please enter the address associated with
          your account.
        </Text>
      </View>
      <TextInputField
        keyboardType="email-address"
        placeholder={"Email Address"}
        onChangeText={(text: string) => setEmail(text)}
        placeholderColor={Colors.fontColor}
        error={emailError}
        autoCapitalize="none"
        autoCorrect={false}
        errorMessage="Invalid email address"
        icon={emailIcon()}
        customStyle={{
          width: "90%",
          borderBottomColor: emailError ? Colors.errorColor : Colors.lineColor,
        }}
      />
      <View style={styles.btnContainer}>
        <Button title="Submit" onPress={handleForgotPwd} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={AppContainer.container}
        >
          <Header title="Confirm Code" navigation={navigation} />
          <View style={{ alignSelf: "center" }}>
            <AuthScreenIcon />
          </View>
          {renderForm()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
