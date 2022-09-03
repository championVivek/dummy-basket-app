import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonicIcon from "react-native-vector-icons/Ionicons";
import Carousel from "react-native-snap-carousel";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Dots from "react-native-dots-pagination";

import Header from "../../components/Header/Header";
import AppContainer from "../../common/AppContainer";
import Colors from "../../common/Colors";
import SavedCard from "../../components/SavedCard/SavedCard";
import Button from "../../components/Button/Button";
import { routename } from "../../navigation/Routes";
import Loading from "../Loader/Loading";
import { DiscoverCard, MasterCard, VisaCard } from "../../../assets/svg";
import styles from "./styles";
import { cardDetails } from "../../utils/dummyData";


const PaymentMethodScreen = ({ navigation }: any) => {

  const [index, setIndex] = useState<number>(0);
  const [cards, setCards] = useState(cardDetails);
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Dimensions.get("window").width - 80;
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const paymentOptions = [
    { title: "Google Pay", icon: GoogleIcon() },
    { title: "Apple Pay", icon: AppleIcon() },
    { title: "Finance", icon: FinanceIcon() },
    { title: "Bank Transfer", icon: BankTransferIcon() },
  ];




  const renderOtherPayments = (title: any, icon: JSX.Element) => (
    <TouchableOpacity style={styles.otherPaymentContainer} onPress={() => [setSelectedPaymentOption(title), setIsSelected(true)]}>
      <View style={styles.otherPaymentCol1}>
        <View style={{ flex: 0.19 }}>{icon && icon}</View>
        <View style={{ flex: 0.71 }}>
          <Text style={styles.otherPaymentTitle}>{title}</Text>
        </View>
      </View>
      <View style={styles.otherPaymentCol2}>
        {isSelected && selectedPaymentOption === title ? (
          <IonicIcon name="md-radio-button-on" size={18} color={Colors.iconColor} />
        ) : (
          <FontAwesomeIcon name="circle-thin" size={18} color={Colors.disableColor} />
        )}
      </View>
    </TouchableOpacity>

  );

  const handleCheckout = async () => {
    try {
      if (selectedPaymentOption === "Finance") {
        navigation.navigate(routename.ProgressScreens, {
          Veriff: false,
        });
      }
      if (selectedPaymentOption === "Bank Transfer") {
        navigation.navigate(routename.CheckoutScreen, {
          paymentType: "Finance",
        });
      }
      if (selectedPaymentOption === "Google Pay") {
        navigation.navigate(routename.CheckoutScreen, {
          paymentType: "Google Pay",
          icon: GoogleIcon(),
        });
      }
      if (selectedPaymentOption === "Apple Pay") {
        navigation.navigate(routename.CheckoutScreen, {
          paymentType: "Apple Pay",
          icon: AppleIcon(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} hidden={false} backgroundColor="#fff" />
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={[AppContainer.container, { paddingBottom: 0 }]}>
            <Header title="Payment Method" navigation={navigation} pymt={true} />
            <View style={styles.addCardContainer}>
              <Text style={styles.addCardText1}>Saved Cards</Text>
              <TouchableOpacity
                style={styles.addCardText2Container}
                onPress={() => {
                  navigation.navigate(routename.AddCardScreen);
                }}
              >
                <FontAwesomeIcon name="plus-square-o" size={20} color={Colors.progressBarColor} />
                <Text style={styles.addCardText2}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View>
              {cards.length === 0 ? (
                <View style={{ alignItems: "center" }}>
                  <SavedCard noCard={true} />
                </View>
              ) : (
                <>
                  <Carousel
                    decelerationRate={1000}
                    layout={"default"}
                    data={cards}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    inactiveSlideScale={0.83}
                    inactiveSlideOpacity={1}
                    containerCustomStyle={{
                      marginLeft: 30,
                    }}
                    activeSlideAlignment={"start"}
                    renderItem={({ item, index }: any) => (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          navigation.navigate(routename.CheckoutScreen, {
                            paymentType: "Card",
                            icon: CardIcon(item.cardType),
                            cardDetails: item,
                          });
                        }}
                      >
                        <SavedCard data={item} />
                      </TouchableOpacity>
                    )}
                    onSnapToItem={(index: any) => setIndex(index)}
                  />
                </>
              )}
              <Dots
                length={cards.length == 0 ? 1 : cards.length}
                activeDotHeight={5}
                passiveDotHeight={5}
                activeDotWidth={50}
                passiveDotWidth={15}
                marginHorizontal={4}
                alignDotsOnXAxis
                paddingVertical={20}
                activeColor={Colors.iconColor}
                active={index}
              />
            </View>
            <View style={[AppContainer.container, { paddingVertical: 0 }]}>
              <Text style={styles.otherPaymentsHeaderText}>Other ways to pay</Text>
              {paymentOptions.map((item, index) => {
                return <View key={index}>{item.title === "Apple Pay" && Platform.OS !== "ios" ? null : item.title === "Google Pay" && Platform.OS != 'android' ? null : renderOtherPayments(item.title, item.icon)}</View>;
              })}
            </View>
            <View style={[AppContainer.container, { paddingTop: 0 }]}>
              <View style={styles.amtContainer}>
                <Text style={styles.amtText}>Amount to pay:</Text>
                <Text style={styles.amtPrice}> £45,500.00</Text>
              </View>
              <Button
                disable={isSelected ? false : true}
                title="Proceed to Checkout"
                onPress={handleCheckout}
                customStyle={{
                  backgroundColor: !isSelected ? "rgba(57, 73, 81, 0.5)" : Colors.btnColor,
                }}
              />
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;

const GoogleIcon = () => <FontAwesomeIcon name="google" size={22} color={Colors.iconColor} />;

const AppleIcon = () => <FontAwesomeIcon name="apple" size={22} color={Colors.iconColor} />;

const FinanceIcon = () => <FontAwesome5Icon name="pound-sign" size={22} color={Colors.iconColor} />;

const CardIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "visa":
      return <VisaCard height={50} width={50} />;
    case "mastercard":
      return <MasterCard height={50} width={50} />;
    case "discover":
      return <DiscoverCard height={50} width={50} />;
    default:
      return <MasterCard height={50} width={50} />; //for now only
  }
};

const BankTransferIcon = () => <FontAwesome5Icon name="money-bill-wave-alt" size={15} color={Colors.iconColor} />;

