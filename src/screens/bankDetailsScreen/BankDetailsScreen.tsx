import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";

import AppContainer from "../../common/AppContainer";
import commonStyles from "../../common/styles";
import TextInputField from "../../components/TextInputField/TextInputField";
import Colors from "../../common/Colors";
import fontFamily from "../../common/fontFamily";
import HideKeyboard from "../../components/HideKeyboard";
import Button from "../../components/Button/Button";
import styles from "./styles";
import { ProgressProps } from "../../../@types";
import Loading from "../Loader/Loading";
import Header from "../../components/Header/Header";
import { routename } from "../../navigation/Routes";
import { useDispatch } from "react-redux";
import types from "../../redux/types";

const BankDetailsScreen: React.FC<ProgressProps> = ({ navigation }) => {
  const [selected, setSelected] = useState({
    type: "Current",
    focused: false,
  });
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    acc_number: "",
    sort_code: "",
    iban: "",
  });
  const [loading, setLoading] = useState(false);
  const [name_error, setNameError] = useState({
    error: false,
    msg: "",
  });
  const [acc_nunmber_error, setAcc_number_error] = useState({
    error: false,
    msg: "",
  });
  const [sort_code_error, setSort_code_error] = useState({
    error: false,
    msg: "",
  });
  const [iban_error, setIban_error] = useState({
    error: false,
    msg: "",
  });

  const handleSubmit = async () => {
    try {
      // Start: Check for field values
      const isValid = await checkFormFields();
      if (!isValid) return;
      //  End: Check for field values
      const bankDetails = {
        accountType: selected.type,
        name: formData.name,
        acc_number: formData.acc_number,
        sort_code: formData.sort_code,
        iban: formData.iban,
      };
      dispatch({
        type: types.BANK_DETAILS,
        payload: bankDetails,
      });
      navigation.navigate(routename.CheckoutScreen, {
        paymentType: "Finance",
      });
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        if (error.response.data?.message?.includes("Iban")) {
          setIban_error({
            error: true,
            msg: error.response.data?.message,
          });
        }
        if (error.response.data?.message?.includes("name")) {
          setNameError({
            error: true,
            msg: error.response.data?.message,
          });
        }
        if (error.response.data?.message?.includes("Account")) {
          setAcc_number_error({
            error: true,
            msg: error.response.data?.message,
          });
        }
        if (error.response.data?.message?.includes("Sort")) {
          setSort_code_error({
            error: true,
            msg: error.response.data?.message,
          });
        }
      }
    }
  };

  const checkFormFields = () => {
    if (!formData.name?.trim()) {
      setNameError({
        error: true,
        msg: "Please fill this required field.",
      });
      return false;
    }
    if (
      (formData.acc_number?.trim() && !formData.sort_code?.trim()) ||
      (!formData.acc_number?.trim() && formData.sort_code?.trim()) ||
      (!formData.acc_number?.trim() &&
        !formData.sort_code?.trim() &&
        !formData.iban?.trim())
    ) {
      setAcc_number_error({
        error: true,
        msg: "Please fill this required field.",
      });
      setSort_code_error({
        error: true,
        msg: "Please fill this required field.",
      });
      return false;
    }
    if (formData.iban?.trim()) {
      setAcc_number_error({
        error: false,
        msg: "",
      });
      setSort_code_error({
        error: false,
        msg: "",
      });
      return true;
    }
    return true;
  };

  useEffect(() => {
    if (formData.name.trim()) {
      setNameError({
        error: false,
        msg: "",
      });
    }
    if (formData.acc_number.trim()) {
      setAcc_number_error({
        error: false,
        msg: "",
      });
    }
    if (formData.sort_code.trim()) {
      setSort_code_error({
        error: false,
        msg: "",
      });
    }
    if (formData.iban.trim()) {
      setIban_error({
        error: false,
        msg: "",
      });
    }
  }, [formData.acc_number, formData.sort_code, formData.name, formData.iban]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.kycBackground }}>
      <HideKeyboard>
        <View style={[AppContainer.container, { flex: 1 }]}>
          <View style={{  }}>
            <Header title="Bank Details" navigation={navigation} />
          </View>
          <KeyboardAvoidingView
            collapsable={true}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <StatusBar backgroundColor={"white"} />
            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              // contentContainerStyle={{ flexGrow: 1 }}
            >
              {loading ? (
                <Loading />
              ) : (
                <>
                  <Text style={commonStyles.title}>Enter Account Details</Text>
                  <View style={styles.accTypeRow}>
                    <Text style={styles.accTypeTitle}>Account Type</Text>
                    <View style={styles.toggleBtnContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          setSelected({
                            type: "Current",
                            focused: !selected.focused,
                          })
                        }
                        style={[
                          styles.accTypeContainer,
                          {
                            backgroundColor: selected.focused
                              ? "#F3F4F6"
                              : Colors.iconColor,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.accTypeText,
                            {
                              color: selected.focused
                                ? Colors.fontColor
                                : "white",
                            },
                          ]}
                        >
                          Current
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          setSelected({
                            type: "Savings",
                            focused: !selected.focused,
                          })
                        }
                        style={[
                          styles.accTypeContainer,
                          {
                            backgroundColor: selected.focused
                              ? Colors.iconColor
                              : "#F3F4F6",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.accTypeText,
                            {
                              color: !selected.focused
                                ? Colors.fontColor
                                : "white",
                            },
                          ]}
                        >
                          Savings
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 0.7 }}>
                    <TextInputField
                      title="Name on Account"
                      value={formData.name}
                      onChangeText={(text: string) =>
                        setFormData({
                          ...formData,
                          name: text,
                        })
                      }
                      fontFamily={fontFamily["Roboto-Medium"]}
                      fontSize={24}
                      customStyle={{
                        paddingBottom: 5,
                        borderColor: name_error.error
                          ? Colors.errorColor
                          : Colors[85858580],
                      }}
                    />
                    <Text style={commonStyles.errorText}>{name_error.msg}</Text>
                    <TextInputField
                      title="Account Number"
                      keyboardType="number-pad"
                      placeholderColor={Colors.fontColor}
                      error={acc_nunmber_error.error}
                      value={formData.acc_number}
                      onChangeText={(text: string) =>
                        setFormData({
                          ...formData,
                          acc_number: text,
                        })
                      }
                      fontFamily={fontFamily["Roboto-Medium"]}
                      fontSize={24}
                      customStyle={{
                        paddingBottom: 5,
                        borderColor: acc_nunmber_error.error
                          ? Colors.errorColor
                          : Colors[85858580],
                      }}
                    />
                    <Text style={commonStyles.errorText}>
                      {acc_nunmber_error.msg}
                    </Text>
                    <TextInputField
                      title="Sort Code"
                      keyboardType="number-pad"
                      placeholderColor={Colors.fontColor}
                      error={sort_code_error.error}
                      value={formData.sort_code}
                      onChangeText={(text: string) =>
                        setFormData({
                          ...formData,
                          sort_code: text,
                        })
                      }
                      fontFamily={fontFamily["Roboto-Medium"]}
                      fontSize={24}
                      customStyle={{
                        paddingBottom: 5,
                        borderColor: sort_code_error.error
                          ? Colors.errorColor
                          : Colors[85858580],
                      }}
                    />
                    <Text style={commonStyles.errorText}>
                      {sort_code_error.msg}
                    </Text>
                    <TextInputField
                      title="IBAN Account Number"
                      placeholderColor={Colors.fontColor}
                      error={iban_error.error}
                      value={formData.iban}
                      onChangeText={(text: string) =>
                        setFormData({
                          ...formData,
                          iban: text,
                        })
                      }
                      fontFamily={fontFamily["Roboto-Medium"]}
                      fontSize={24}
                      customStyle={{
                        paddingBottom: 5,
                        borderColor: iban_error.error
                          ? Colors.errorColor
                          : Colors[85858580],
                      }}
                    />
                  </View>
                  <Text style={commonStyles.errorText}>{iban_error.msg}</Text>
                  <View style={styles.btnContainer}>
                    <Button title="Submit" onPress={handleSubmit} />
                  </View>
                </>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </HideKeyboard>
    </SafeAreaView>
  );
};

export default BankDetailsScreen;
