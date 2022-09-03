import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import commonStyles from "../../../common/styles";
import styles from "./styles";
import Button from "../../Button/Button";
import Colors from "../../../common/Colors";
import { routename } from "../../../navigation/Routes";

const Signature: React.FC<ProgressProps> = ({ navigation }) => {

  const aggreementCard = (text1: string, text2: string) => (
    <View style={styles.agreementCardContainer}>
      <View style={{ flex: 0.2 }}>
        <MaterialCommunityIcon name="file-document" size={40} />
      </View>
      <View style={{ flex: 0.8 }}>
        <Text style={styles.text1Style}>{text1}</Text>
        <Text style={styles.text2Style}>{text2}</Text>
      </View>
    </View>
  );

  const tapDigitalSign = () => (
    <View style={styles.tapDigitalSignContainer}>
      <Text style={styles.tapDigitalSignText1}>Digital Signature</Text>
      <TouchableOpacity
        style={styles.tapDigitalSignText2Container}
        onPress={() => navigation.navigate(routename.DrawSignatureScreen)}
      >
        <Text style={styles.tapDigitalSignText2}>Tap to sign</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={AppContainer.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <Text style={commonStyles.title}>Signature Required</Text>
          <Text style={styles.aggrementText}>
            To accept your finance agreement you have been requested to read and
            sign the legal documents.
          </Text>
        </View>
        {aggreementCard("28/04/2022", "Creditas Financial Solutions Agreement")}
        {aggreementCard(
          "Creditas Financial Solutions",
          "Agreement date starts once signed"
        )}
        {tapDigitalSign()}
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.infoText}>
            If you experience any issues, please call us
          </Text>
          <View style={styles.infoContainer}>
            <TouchableOpacity>
              <Text style={styles.infoText2}>0123-456-7890 </Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>or email:</Text>
            <TouchableOpacity>
              <Text style={styles.infoText2}>support@bsktpay.co</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button
            title="Sign documents to continue"
            disable
            customStyle={{
              backgroundColor: Colors.disableColor,
              marginTop: 15,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Signature;
