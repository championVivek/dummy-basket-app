import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import { MasterCard, VisaCard, DiscoverCard } from "../../../assets/svg";
import Colors from "../../common/Colors";
import { SaveCardProps } from "../../../@types";
import { cardDetails } from "../../utils/dummyData";

const SCREEN_WIDTH = Dimensions.get("window").width;


const SavedCard = ({ noCard = false, background, fullWidth = false, data }: SaveCardProps) => {

  return (
    <View
      style={
        !noCard
          ? [
            styles.container,
            {
              backgroundColor: background
                ? background
                : Colors.progressBarColor,
              width: fullWidth ? "100%" : SCREEN_WIDTH / 1.23,
            },
          ]
          : styles.noCardContainer
      }
    >
      {!noCard ? (
        <>
          {
            CardIcon(data?.cardType)
          }
          <View style={styles.cardNumberContainer}>
            <Text style={styles.cardStarText}>**** **** **** </Text>
            <Text style={styles.cardNumberText}>{data?.lastFour}</Text>
          </View>
          <View style={styles.cardDetailsContainer}>
            <View>
              <Text style={styles.detailText1}>EXPIRY DATE</Text>
              <Text style={styles.detailText2}>
                {data?.expiryMonth}/{data?.expiryYear}
              </Text>
            </View>
            <View>
              <Text style={styles.detailText1}>CARD HOLDER NAME</Text>
              <Text style={styles.detailText2}>{data?.billing_details?.name ? data?.billing_details?.name : data?.name}</Text>
            </View>
          </View>
        </>
      ) : (
        <View>
          <Text style={styles.noCardText}>No Card Added</Text>
        </View>
      )}
    </View>
  );
};

const CardIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'visa': return <VisaCard height={50} width={50} />
    case 'mastercard': return <MasterCard height={50} width={50} />
    case 'discover': return <DiscoverCard height={50} width={50} />
    default: return <MasterCard height={50} width={50} /> //for now only
  }
};

export default SavedCard;
