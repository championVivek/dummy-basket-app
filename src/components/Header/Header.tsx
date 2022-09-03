import { Text, View, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../../common/Colors";
import { HeaderProps } from "../../../@types";
import { routename } from "../../navigation/Routes";
import styles from "./styles";

const Header: React.FC<HeaderProps> = ({
  navigation,
  title,
  wizards = false,
  onPress,
  color,
  pymt = false,
  rightIcon = true,
}) => {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBack);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", handleBack);
  }, [wizards]);

  const handleBack = () => {
    if (!wizards) return;
    onPress(true);
    return true;
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        hitSlop={{
          top: 20,
          left: 20,
          right: 20,
        }}
        onPress={() => {
          wizards
            ? handleBack()
            : pymt
            ? navigation.navigate(routename.ScanSuccessScreen)
            : navigation.goBack();
        }}
      >
        <Icon
          name="chevron-left"
          size={20}
          color={color ? color : Colors.iconColor}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={[
            styles.centerText,
            { color: color ? color : Colors.fontColor },
          ]}
        >
          {title}
        </Text>
      </View>
      <View />
      {/* here removed a right icon so to maintain design adding this extra view */}
    </View>
  );
};

export default Header;
