import {
  TextInput,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { TextFieldProps } from "../../../@types";

const TextInputField = ({
  placeholder,
  ref,
  fontSize,
  placeholderColor,
  icon,
  defaultValue,
  rightIcon,
  fontFamily,
  customStyle,
  secureTextEntry,
  keyboardType,
  rightIcon2,
  editable = true,
  value,
  onChangeText,
  error,
  leftIconOver,
  errorMessage,
  title,
  pointerEvents = "auto",
  autoCorrect = true,
  autoCapitalize = "sentences"
}: TextFieldProps) => {
  const IOS = Platform.OS === "ios";
  const [pwdVisible, setpwdVisible] = useState<boolean>(false);
  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.inputContainer}>
        {icon && icon}
        <View
          style={[
            styles.innerView,
            {
              alignItems: IOS && !leftIconOver ? "flex-start" : "center",
              ...customStyle,
            },
          ]}
        >
          {leftIconOver && leftIconOver}
          <TextInput
            ref={ref}
            editable={editable}
            onChangeText={onChangeText}
            defaultValue={defaultValue}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            pointerEvents={pointerEvents}
            value={value}
            placeholder={placeholder}
            secureTextEntry={!pwdVisible && secureTextEntry}
            keyboardType={keyboardType}
            style={[
              styles.input,
              {
                width: rightIcon || leftIconOver ? "90%" : "100%",
                fontSize: fontSize ? fontSize : 17,
                fontFamily: fontFamily ? fontFamily : "Roboto-Regular",
                paddingBottom: leftIconOver ? 5 : 10,
              },
            ]}
            placeholderTextColor={placeholderColor}
          />
          {rightIcon && !pwdVisible && (
            <TouchableOpacity onPress={() => setpwdVisible(true)}>
              {rightIcon && rightIcon}
            </TouchableOpacity>
          )}
          {rightIcon2 && pwdVisible ? (
            <TouchableOpacity onPress={() => setpwdVisible(false)}>
              {rightIcon2}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {error && !value?.trim() ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </>
  );
};

export default TextInputField;
