import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Linking,
  Image,
} from "react-native";
import React, { useState } from "react";
import { showMessage } from "react-native-flash-message";
import validate from "validate.js";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import Header from "../../../components/Header/Header";
import AppContainer from "../../../common/AppContainer";
import Button from "../../../components/Button/Button";
import TextInputField from "../../../components/TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import { routename } from "../../../navigation/Routes";
import commonStyles from "../../../common/styles";
import { Props } from "../../../../@types";
import styles from "./styles";
import { createUser } from "../../../utils/authoService";

interface pwdErrorProps {
  error: boolean;
  message?: string;
}

const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [username, setUserName] = useState<string>('')
  const [passwordError, setPasswordError] = useState<pwdErrorProps>({
    error: false,
    message: "",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const emailIcon = () => (
    <EntypoIcon name="email" size={20} color={Colors.lineColor} />
  );

  const faceIcon = () => (
    <MaterialCommunityIcon name="face-man" size={20} color={Colors.lineColor} />
  );

  const phoneIcon = () => (
    <FontAwesomeIcon name="phone" size={20} color={Colors.lineColor} />
  );

  const lockIcon = () => (
    <MaterialCommunityIcon name="lock" size={22} color={Colors.lineColor} />
  );

  const eyeSlashIcon = () => (
    <FontAwesomeIcon
      name="eye-slash"
      size={20}
      color={Colors.lineColor}
      style={{ paddingLeft: 2 }}
    />
  );

  const eyeOpenIcon = () => (
    <FontAwesomeIcon name="eye" size={22} color={Colors.lineColor} />
  );

  var constraints = {
    isValidEmail: {
      email: true,
    },
  };
  var passwordContraints = {
    key2: {
      length: { minimum: 8 },
    },
  };
  const handleContinue = async () => {
    try {
      const isValid = await validate({ isValidEmail: email }, constraints);
      isValid ? setEmailError(true) : setEmailError(false);
      const isValidLength = await validate(
        { key2: password },
        passwordContraints
      );
      const reg = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))"
      );
      const isValidPassword = reg.test(password);

      isValidPassword === false || isValidLength !== undefined
        ? setPasswordError({
          error: true,
          message: isValidLength
            ? "Password must be at least 8 characters."
            : "Password should at least contains 1 digit, 1 lowercase, 1 uppercase and 1 symbol.",
        })
        : setPasswordError({ error: false });
      await createUser(email, phoneNumber, password)

      showMessage({
        message: "Success",
        type: "success",
      });
      navigation.navigate(routename.LoginScreen);
    } catch (error: any) {
      !email.trim() && !password.trim()
        ? null
        : error.message?.includes("Invalid sign up")
          ? showMessage({
            message: "User already exist.",
            type: "danger",
          })
          : showMessage({
            message: error.response.data.description,
            type: "danger",
          });
    }
  };

  const renderForm = () => (
    <>
      <Text style={commonStyles.authTitle}>Sign up</Text>
      <TextInputField
        keyboardType="email-address"
        placeholderColor={Colors.lineColor}
        placeholder={"Email Address"}
        onChangeText={(text: string) => setEmail(text)}
        icon={emailIcon()}
        autoCapitalize="none"
        autoCorrect={false}
        error={emailError}
        errorMessage={"Invalid Email Address!"}
        customStyle={{
          width: "90%",
          borderBottomColor: emailError ? Colors.errorColor : Colors.lineColor,
        }}
      />
      <TextInputField
        placeholderColor={Colors.lineColor}
        placeholder={"Full Name"}
        onChangeText={(text: string) => setUserName(text)}
        icon={faceIcon()}
        customStyle={{
          width: "90%",
          borderBottomColor: Colors.lineColor,
        }}
      />
      <TextInputField
        placeholderColor={Colors.lineColor}
        placeholder={"Phone Number"}
        onChangeText={(text: string) => setPhoneNumber(text)}
        keyboardType="number-pad"
        icon={phoneIcon()}
        customStyle={{
          width: "90%",
          borderBottomColor: Colors.lineColor,
        }}
      />
      <TextInputField
        placeholderColor={Colors.lineColor}
        secureTextEntry
        keyboardType="default"
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        icon={lockIcon()}
        error={passwordError.error}
        errorMessage={passwordError.message}
        rightIcon={eyeSlashIcon()}
        customStyle={{
          width: "90%",
          borderBottomColor: passwordError.error
            ? Colors.errorColor
            : Colors.lineColor,
        }}
        rightIcon2={eyeOpenIcon()}
      />
      <View style={styles.conditionContainer}>
        <Text style={styles.conditionText}>
          By creating an account, you confirm that you agree to you
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("www.google.com")
            }
          >
            <Text style={styles.conditionLink}>terms & conditions</Text>
          </TouchableOpacity>{" "}
          and have read our{" "}
          <TouchableOpacity
            onPress={() => Linking.openURL("www.google.com")}
          >
            <Text style={styles.conditionLink}>privacy policy</Text>
          </TouchableOpacity>
          .
        </Text>
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[AppContainer.container]}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <Header title={"Sign up"} navigation={navigation} />

          {/* Svg icon */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../../assets/sign_in.png")}
              style={styles.image}
            />
          </View>

          {renderForm()}

          <View style={styles.registerContainer}>
            <Text style={styles.registerLinkText}>Joined us before?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routename.LoginScreen)}
            >
              <Text style={styles.registerLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
