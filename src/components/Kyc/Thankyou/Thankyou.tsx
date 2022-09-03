import { View, Text } from "react-native";
import React from "react";
import IoniIcon from "react-native-vector-icons/Ionicons";
import AppContainer from "../../../common/AppContainer";
import commonStyles from "../../../common/styles";
import styles from "./styles";
import Colors from "../../../common/Colors";
import Button from "../../Button/Button";
import { ProgressProps } from "../../../../@types";

const Thankyou: React.FC<ProgressProps> = ({ pageIndex, changePage }) => {
  const checkedProgress = [
    { id: "1", value: "Uploading your photos" },
    { id: "2", value: "Checking for errors" },
    { id: "3", value: "Sending your data for verification" },
    { id: "4", value: "Verifying you" },
  ];

  const nextPage = () => {
    if (pageIndex !== undefined) {
      changePage(pageIndex + 1);
    }
  };

  return (
    <View style={[AppContainer.container, { flex: 1 }]}>
      <View style={styles.container1}>
        <Text style={commonStyles.title}>Thank you!</Text>
        <Text style={styles.text}>
          Verification is complete. You'll be notified about the decision soon.
        </Text>
        <View style={styles.checkdContainer}>
          {checkedProgress.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={{ flex: 0.1 }}>
                <IoniIcon
                  name="checkmark-circle"
                  size={20}
                  color={Colors.progressBarColor}
                />
              </View>
              <View style={{ flex: 0.9 }}>
                <Text style={styles.text}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.container2}>
        <Button title="Continue" onPress={nextPage} />
      </View>
    </View>
  );
};

export default Thankyou;
