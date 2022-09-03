import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  CardField,
} from "@stripe/stripe-react-native";

import AppContainer from "../../common/AppContainer";
import Header from "../../components/Header/Header";
import SavedCard from "../../components/SavedCard/SavedCard";
import Colors from "../../common/Colors";
import styles from "./styles";
import HideKeyboard from "../../components/HideKeyboard";
import Button from "../../components/Button/Button";
import Loading from "../Loader/Loading";
import fontFamily from "../../common/fontFamily";
import { CardProps } from "../../../@types";
import { routename } from "../../navigation/Routes";

const AddCardScreen = ({ navigation, route }: any) => {
  const [cardDetails, setCardDetails] = useState<any>();
  const [cardHolderName, setCardHolderName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);


  const handlePayPress = async () => {
    console.log('handlepay');
    navigation.navigate(routename.PaymentMethodScreen)
  }

  const data: CardProps = {
    lastFour: cardDetails?.last4,
    expiryMonth: cardDetails?.expiryMonth,
    expiryYear: cardDetails?.expiryYear,
    name: cardHolderName,
    cardType: cardDetails?.brand,
  };

  return (
    <SafeAreaView style={styles.container}>
      <HideKeyboard>
        <>
          {loading && (
            <View
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 898,
                backgroundColor: "rgba(0,0,0,0.3)",
              }}
            >
              <Loading />
            </View>
          )}
          <View style={[AppContainer.container, { paddingBottom: 0 }]}>
            <Header title="Add New Card" navigation={navigation} />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={20}
            style={{ flex: 1 }}
          >
            <ScrollView
              bounces={false}
              style={[AppContainer.container, { paddingTop: 0 }]}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View>
                <View style={{ marginVertical: 30 }}>
                  <SavedCard
                    background={Colors.cardGray}
                    fullWidth={true}
                    data={data}
                  />
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.textInputTitle}>Card Holder Name</Text>
                  <TextInput
                    style={styles.textInputStyle}
                    onChangeText={(text: string) => setCardHolderName(text)}
                  />
                </View>
                <CardField
                  postalCodeEnabled={true}
                  placeholders={{
                    number: "Card Number",
                  }}
                  cardStyle={{
                    backgroundColor: "#FFFFFF",
                    textColor: Colors.fontColor,
                    borderColor: Colors.disableColor,
                    borderRadius: 5,
                    borderWidth: 1,
                    fontSize: 20,
                    placeholderColor: Colors.disableColor,
                    fontFamily: fontFamily["Roboto-Medium"],
                  }}
                  style={{
                    width: "100%",
                    height: 50,
                    marginVertical: 30,
                  }}
                  onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                  }}
                  onFocus={(focusedField) => { }}
                />
              </View>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <Button title="Add Card" onPress={handlePayPress} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      </HideKeyboard>
    </SafeAreaView>
  );
};

export default AddCardScreen;
