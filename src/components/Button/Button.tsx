import { TouchableOpacity, Text, View } from "react-native";
import React from "react";
import styles from "./styles";
import { ButtonProps } from "../../../@types";
import fontFamily from "../../common/fontFamily";

const Button: React.FC<ButtonProps> = ({
  title,
  logo,
  onPress,
  disable = false,
  customStyle,
  fontColor,
  font_family,
}) => {
  return (
    <TouchableOpacity
      disabled={disable}
      onPress={onPress}
      style={[
        styles.btnContainer,
        { flexDirection: logo ? "row" : "column", ...customStyle },
      ]}
    >
      {logo && <View style={{ flex: 0.3, alignItems: "center" }}>{logo}</View>}
      <Text
        style={[
          styles.title,
          {
            flex: logo && 0.7,
            color: fontColor ? fontColor : 'white',
            fontFamily: font_family
              ? font_family
              : fontFamily["Roboto-Regular"],
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
