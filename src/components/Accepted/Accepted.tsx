import { Text, View, Modal } from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import styles from "./styles";
import AppContainer from "../../common/AppContainer";
import Button from "../Button/Button";
import { CheckGroup } from "../../../assets/svg";

const Accepted = ({ show, msg, description }: any) => {
  const handleModalView = () => {
    show(false);
  };

  return (
    <Modal animationType="fade" transparent={true} statusBarTranslucent={true}>
      <View style={[AppContainer.container, styles.container]}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={12}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.upperView}>
          <CheckGroup />
          <Text style={styles.text1}>{msg}</Text>
          <Text style={styles.text2}>{description}</Text>
        </View>
        <View style={styles.lowerView}>
          <Button
            title="Continue"
            onPress={handleModalView}
            customStyle={{
              backgroundColor: "transparent",
              borderColor: "white",
              borderWidth: 2,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Accepted;
