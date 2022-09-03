import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import Button from "../Button/Button";
import { OfferCardProps } from "../../../@types";
import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";

const OfferCard: React.FC<OfferCardProps> = ({
  btn = true,
  btnTitle,
  onPress,
  children,
  data,
}) => {

  const handleOnPress = () => {
    onPress(data)
  }

  return (
    <View style={{ paddingTop: 25 }}>
      <View style={styles.upperView}>
        <Text style={styles.upperText1}>{data?.lender?.name}</Text>
        <Text style={styles.upperText2}>£640.49</Text>
        <Text style={styles.upperText3}>Monthly Payments</Text>
      </View>
      <FlatList
        bounces={false}
        data={data?.products}
        renderItem={({ item }) => (
          <View style={styles.middleView}>
            <View>
              <View style={styles.box}>
                <Text style={styles.middleText1}>Total Payable</Text>
                <Text style={styles.middleText2}>
                  {item?.calculation?.totalChargePayable}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.middleText1}>Product</Text>
                <Text style={styles.middleText2}>{item?.productName}</Text>
              </View>
            </View>
            <View>
              <View style={styles.box}>
                <Text style={styles.middleText1}>Agreement Term</Text>
                <Text style={styles.middleText2}>
                  {item?.calculation?.term}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.middleText1}>APR</Text>
                <Text style={styles.middleText2}>
                  {item?.calculation?.representativeApr}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
      {children}
      {btn ? (
        <View style={{ marginTop: 20 }}>
          <Button title={btnTitle} onPress={handleOnPress} />
        </View>
      ) : null}
    </View>
  );
};

export default OfferCard;
