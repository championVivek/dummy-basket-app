import React, { useState } from "react";
import {
  Modal,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import EncryptedStorage from "react-native-encrypted-storage";
import { PLAID_CLIENTID, PLAID_SECRET } from "@env";

import { IdProps, ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import commonStyles from "../../../common/styles";
import Colors from "../../../common/Colors";
import store from "../../../redux/store";
import Loading from "../../../screens/Loader/Loading";
import styles from "./styles";
import ErrorHandle from "../../ErrorHandle/ErrorHandle";

const IdVerification: React.FC<ProgressProps> = ({ changePage, pageIndex }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const wizardsFormData = store.getState().wizardsFormReducer;
  const nextPage = () => {
    if (pageIndex !== undefined) {
      changePage(pageIndex + 1);
    }
  };

  const identityType = [
    {
      id: "1",
      name: "Passport",
      type: "PASSPORT",
    },
    { id: "2", name: "Driver's Licence", type: "DRIVERS_LICENSE" },
    { id: "3", name: "National Identity Card", type: "ID_CARD" },
    { id: "4", name: "Residence Permit Card", type: "RESIDENCE_PERMIT" },
  ];

  const handleScaningDocuments = async (type: string) => {
    try {
      setLoading(true);
      setLoading(false);
      verifyAddress();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const verifyAddress = async () => {
    try {
      setShowModal(true);
      const access_token = await EncryptedStorage.getItem(
        "@Plaid_access_token"
      );
      const account_id = await EncryptedStorage.getItem("@Plaid_account_id");
      const response = await axios.post(
        "https://sandbox.plaid.com/identity/get",
        {
          client_id: PLAID_CLIENTID,
          secret: PLAID_SECRET,
          access_token: access_token,
          options: {
            account_ids: [account_id],
          },
        }
      );
      const wizardsStreet = wizardsFormData.wizardsFormData.filter((e) => {
        return e.name === "street_and_address" && e.value;
      });

      if (wizardsStreet.length == 0) {
        Alert.alert("No address found! Please submit the address.");
        setShowModal(false);
      }

      const primary_address =
        response.data.accounts[0].owners[0]?.addresses.filter(
          (e) => e.primary === true
        );
      const street = primary_address[0].data?.street;

      // //Delete this
      setShowModal(false);
      nextPage();

      if (
        wizardsStreet[0].value?.toLowerCase()?.trim() ===
        street?.toLowerCase()?.trim()
      ) {
        setShowModal(false);
        nextPage();
      } else {
        setShowModal(false);
      }
    } catch (e) {
      ErrorHandle(e);
      setShowModal(false);
    }
  };

  const renderIdType = ({ id, type, name }: IdProps) => (
    <TouchableOpacity
      onPress={() => handleScaningDocuments(type)}
      style={[
        styles.container,
        { borderBottomWidth: id === identityType.length?.toString() ? 0 : 1 },
      ]}
    >
      <View style={{ flex: 0.25 }}>
        <View style={styles.leftIconContainer}>
          <FeatherIcon name="globe" size={30} color="white" />
        </View>
      </View>
      <View style={{ flex: 0.5, alignItems: "flex-start" }}>
        <Text style={styles.typeText}>{name}</Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "flex-end" }}>
        <FontAwesome5Icon
          name="chevron-circle-right"
          size={20}
          color={Colors.btnColor}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={AppContainer.container}>
          <Text style={commonStyles.title}>Select a document</Text>
          <Text style={styles.subTitle}>
            You will take a picture of it in the next step
          </Text>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={identityType}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => renderIdType(item)}
            contentContainerStyle={{ marginTop: 10 }}
          />
          {showModal && (
            <Modal
              animationType="fade"
              transparent={true}
              statusBarTranslucent={true}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 30, flex: 0.1, color: Colors.fontColor }}
                >
                  Verifiying address
                </Text>
                <View style={{ flex: 0.5 }}>
                  <Loading />
                </View>
              </View>
            </Modal>
          )}
        </View>
      )}
    </>
  );
};

export default IdVerification;
