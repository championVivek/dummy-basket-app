import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  initGooglePay,
  isGooglePaySupported,
  presentGooglePay,
} from "@stripe/stripe-react-native";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
import AppContainer from "../../common/AppContainer";
import Header from "../../components/Header/Header";
import Colors from "../../common/Colors";
import Button from "../../components/Button/Button";
import Loading from "../Loader/Loading";
import store from "../../redux/store";
import Accepted from "../../components/Accepted/Accepted";
import ErrorHandle from "../../components/ErrorHandle/ErrorHandle";
import styles from "./styles";
import { routename } from "../../navigation/Routes";
import { sectionProps } from "../../../@types";

const CheckoutScreen = ({ route, navigation }: any) => {
  const { paymentType, icon, cardDetails } = route.params;
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [financeAccepted, setFinanceAccepted] = useState<boolean>(false);

  const yourBasketData = [
    {
      id: "1",
      quantity: "1",
      name: "2018 White Tesla Model S 100D",
      value: "£48,998",
    },
    { id: "2", quantity: "1", name: "365days Car Care", value: "FREE" },
  ];

  const financeInfoData = [
    { id: "1", product: { name: "Borrower" }, value: "Credit Company Name" },
    { id: "2", product: { name: "Approved Finance Amount" }, value: "£38,998" },
    { id: "3", product: { name: "Approval Date" }, value: "May 20, 2022" },
    { id: "4", product: { name: "Agreement Term" }, value: "61 Months" },
    { id: "5", product: { name: "Finance Type" }, value: "Hire Purchase" },
    { id: "6", product: { name: "Deposit" }, value: "£1000" },
  ];

  const additionalInfo = [
    { id: "1", name: "Dealership / Salesman Discount", value: `£ 1000` },
    { id: "2", name: "sub Total", value: `£2000` },
    { id: "3", name: "Tax", value: `£ 215` },
    { id: "4", name: "Estimated Shipping", value: 12 },
  ];

  const handleAcceptedScreen = (e: boolean) => {
    setFinanceAccepted(e);
    const state = store.getState().productIdReducer;
    if (e === false) {
      navigation.navigate(routename.ProgressScreens, {
        Veriff: false,
      });
    }
    navigation.navigate(routename.ScanSuccessScreen, {
      qrCodeData: 1,
    });
  };


  const renderSections: React.FC<sectionProps> = (item, finance) => (
    <View key={item.id} style={styles.sectionRow}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 0.8 }}>
        {item.quantity ? (
          <Text style={styles.listBoldTxt}>{item.quantity} x </Text>
        ) : null}
        <Text style={finance ? styles.listBoldTxt : styles.listNameText}>
          Car``
        </Text>
      </View>
      <Text style={!finance ? styles.listBoldTxt : styles.listNameText}>
        £2000
      </Text>
    </View>
  );

  const renderAdditionalInfo = (item: any) => (
    <View key={item.id} style={styles.additionalInfoRow}>
      <Text style={styles.additionalInfoName}>{item.name}</Text>
      <Text style={styles.additionalInfoValue}>{item.value}</Text>
    </View>
  );

  const handlePayment = async () => {
    if (paymentType === "Google Pay") {
      GooglePay();
    }
    if (paymentType === "Card") {
      cardPay();
    }
    if (paymentType === "Finance") {
      handleFinancePay();
    }
  };

  // Finance pay
  const handleFinancePay = async () => {
    try {
      setLoading(true);
    } catch (err) {
      console.log(err);
      ErrorHandle(err);
      setLoading(false);
    }
  };

  // Check for google pay support
  useEffect(() => {
    (async () => {
      try {
        if (paymentType !== "Google Pay") return;
        if (!(await isGooglePaySupported({ testEnv: true }))) {
          Alert.alert("Google Pay is not supported");
          return;
        }
        const { error } = await initGooglePay({
          testEnv: true,
          merchantName: "Bskt",
          countryCode: "US",
          billingAddressConfig: {
            format: "FULL",
            isPhoneNumberRequired: true,
            isRequired: false,
          },
          existingPaymentMethodRequired: false,
          isEmailRequired: true,
        });
        if (error) throw error;
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // get google pay payment intent
  const fetchPaymentIntentClientSecret = async () => {
    try {
      return {
        clientSecret: '45464'
      }
    } catch (err) {
      ErrorHandle(err);
    }
  };

  // Pay with google pay
  const GooglePay = async () => {
    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      const { error } = await presentGooglePay({
        clientSecret,
        forSetupIntent: false,
      });
      if (error) throw error;
    } catch (err: any) {
      if (err.code === "Failed") {
        showMessage({
          message: "Something went wrong.",
          type: "danger",
        });
      }
    }
  };

  // Card payment
  const cardPay = async () => {
    try {
      setLoading(true);
    } catch (err) {
      console.log("error", err);
      ErrorHandle(err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Colors.appBackground} />
      {loading ||
        (dataLoading && (
          <View style={styles.error}>
            <Loading />
          </View>
        ))}
      <View style={AppContainer.container}>
        <Header title="Checkout" navigation={navigation} />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ marginBottom: 70 }}
      >
        <View style={styles.upperContainer} />
        <View style={[AppContainer.container, styles.container]}>
          {/* Upper Image */}
          <Image
            source={require("../../../assets/tesla-1.png")}
            style={styles.upperImgStyle}
          />

          {/* Checked box */}
          <View style={styles.checkedBoxContainer}>
            <View style={{ flex: 0.2 }}>{icon}</View>
            <View style={{ flex: 0.72 }}>
              <Text style={styles.payTypeTitle}>{paymentType}</Text>
              {paymentType === "Google Pay" ||
                paymentType === "Apple Pay" ? null : paymentType === "Card" ? (
                  <Text style={styles.payTypeDesc}>
                    **** **** **** {cardDetails.lastFour}
                  </Text>
                ) : (
                <Text style={styles.payTypeDesc}>Credit Company Name</Text>
              )}
            </View>
            <View style={{ flex: 0.08 }}>
              <IonicIcon
                name="md-radio-button-on"
                size={20}
                color={Colors.iconColor}
              />
            </View>
          </View>

          <View>
            <Text style={styles.listHeader}>Your basket</Text>
            {yourBasketData?.map((item, index) => renderSections(item, ""))}
          </View>
          {paymentType === "Finance" ? (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.listHeader}>Finance Information</Text>
              {financeInfoData?.map((item, index) =>
                renderSections(item, "finance")
              )}
            </View>
          ) : null}

          <View style={{ marginTop: 20 }}>
            <Text style={styles.listHeader}>Additional Information</Text>
            {additionalInfo.map((item, index) => renderAdditionalInfo(item))}
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button title="Make Payment" onPress={handlePayment} />
          </View>
        </View>
      </ScrollView>
      {financeAccepted && (
        <Accepted
          show={handleAcceptedScreen}
          msg={paymentType !== "Finance" ? "Payment successful!" : "Accepted"}
          description={
            paymentType !== "Finance"
              ? "Horray! You have completed your payment."
              : "Your finance loan has been accepted for the next 7 days using bsktpay"
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;
