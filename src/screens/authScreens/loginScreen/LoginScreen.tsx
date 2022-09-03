import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image } from "react-native";
import { showMessage } from "react-native-flash-message";
import EncryptedStorage from "react-native-encrypted-storage";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import * as Animatable from "react-native-animatable";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../components/Header/Header";
import AppContainer from "../../../common/AppContainer";
import Button from "../../../components/Button/Button";
import TextInputField from "../../../components/TextInputField/TextInputField";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../common/Colors";
import { routename } from "../../../navigation/Routes";
import commonStyles from "../../../common/styles";
import { Props } from "../../../../@types";
import { loginWithPassword, webLogin, userInfo } from "../../../utils/authoService";
import Loading from "../../Loader/Loading";
import styles from "./styles";
import types from "../../../redux/types";


const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userToken = useSelector((state) => state.userTokenReducer.token);

  useEffect(() => {

    if (userToken) {
      navigation.replace(routename.PaymentMethodScreen);
      setLoading(false);
    }
  }, [userToken]);

  const googleIcon = () => <Icon name="google" size={25} color="white" />;
  const emailIcon = () => <EntypoIcon name="email" size={22} color={Colors.lineColor} />;
  const lockIcon = () => <MaterialCommunityIcon name="lock" size={22} color={Colors.lineColor} />;
  const eyeSlashIcon = () => <FontAwesomeIcon name="eye-slash" size={20} color={Colors.lineColor} style={{ paddingLeft: 2 }} />;

  const eyeOpenIcon = () => <FontAwesomeIcon name="eye" size={22} color={Colors.lineColor} />;

  const googleSignin = async () => {
    try {
      setLoading(true);
      const credentials = await webLogin();

      const userProfile = await userInfo({
        token: credentials.accessToken,
      });

      await EncryptedStorage.setItem("@user_profile", JSON.stringify(userProfile));
      await EncryptedStorage.setItem("@access_token", credentials.accessToken);
      dispatch({
        type: types.USER_TOKEN,
        payload: credentials.accessToken,
      });
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const credentials = await loginWithPassword(email, password);
      const refreshToken = credentials.refreshToken ? credentials.refreshToken : "null" // because encrypted storage only accepts string and referesh token was of type string|undefined
      const userProfile = await userInfo(credentials.accessToken);

      await EncryptedStorage.setItem("@user_profile", JSON.stringify(userProfile));
      await EncryptedStorage.setItem("@access_token", credentials.accessToken);
      await EncryptedStorage.setItem("@refresh_token", refreshToken);

      dispatch({
        type: types.USER_TOKEN,
        payload: credentials.accessToken,
      });


    } catch (error: any) {
      setLoading(false);
      console.log(error);

      showMessage({
        message: error.message,
        type: "danger",
      });
    }
  };

  const renderForm = () => (
    <>
      <Text style={commonStyles.authTitle}>Login</Text>
      <TextInputField
        placeholderColor={Colors.lineColor}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email ID"
        onChangeText={(text: string) => setEmail(text)}
        icon={emailIcon()}
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
        onChangeText={(text: string) => setPassword(text)}
        icon={lockIcon()}
        rightIcon={eyeSlashIcon()}
        customStyle={{
          width: "90%",
          borderBottomColor: Colors.lineColor,
        }}
        rightIcon2={eyeOpenIcon()}
      />
      <TouchableOpacity style={styles.forgotPassContainer} onPress={() => navigation.navigate(routename.ForgotPasswordScreen)}>
        <Text style={styles.forgotPass}>Forgot Password?</Text>
      </TouchableOpacity>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.orStyles}>
        <View style={styles.hrLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.hrLine} />
      </View>
      <Button title="Login with Google" logo={googleIcon()} onPress={googleSignin} />
    </>
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Animatable.View style={{ flex: 1 }} animation="fadeIn" duration={2000}>
          <SafeAreaView>
            <StatusBar hidden={false} barStyle="dark-content" backgroundColor={Colors.appBackground} />
            <ScrollView showsVerticalScrollIndicator={false} style={AppContainer.container} bounces={false} contentContainerStyle={{ paddingBottom: 50 }}>
              <Header title={"Login Details"} navigation={navigation} />

              {/* Svg icon */}
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../../assets/sign_in.png")}
                  style={styles.image}
                />
              </View>

              {renderForm()}

              <View style={styles.registerContainer}>
                <Text style={styles.registerLinkText}>New to bsktPay?</Text>
                <TouchableOpacity onPress={() => navigation.navigate(routename.SignupScreen)}>
                  <Text style={styles.registerLink}> Register</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Animatable.View>
      )}
    </>
  );
};

export default LoginScreen;
