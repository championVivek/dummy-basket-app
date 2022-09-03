import { View, Text, Modal, Image } from "react-native";
import React from "react";
import styles from "./styles";

interface Iprops {
    show: boolean | null;
}

const CheckNetwork = ({ show }: Iprops) => {

  return (
    <>
      {!show && (
        <Modal animationType="slide">
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Image
                source={require("../../../assets/5356680.jpg")}
                resizeMode="contain"
                style={styles.img}
              />
              <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text style={styles.text1}>Connect to the internet</Text>
                <Text style={styles.text2}>
                  You're offline. Check your connection.
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default CheckNetwork;
