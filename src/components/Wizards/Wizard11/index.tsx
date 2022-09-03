import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import commonStyles from "../../../common/styles";
import Button from "../../Button/Button";
import TextInputField from "../../TextInputField/TextInputField";
import { ProgressProps } from "../../../../@types";
import HideKeyboard from "../../HideKeyboard";
import AppContainer from "../../../common/AppContainer";
import styles from "./styles";
import fontFamily from "../../../common/fontFamily";
import Colors from "../../../common/Colors";
import { useDispatch } from "react-redux";
import types from "../../../redux/types";
import Checkboxes from "../../Checkboxes/Checkboxes";
import Loading from "../../../screens/Loader/Loading";

const Wizard11: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [formField, setFormField] = useState({
    workYearsAtAddress: '',
    workMonthsAtAddress: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [error, setError] = useState<boolean>(false)
  const [allowToNextPage, setAllowToNextPage] = useState<boolean>(false)

  const dispatch = useDispatch();

  const nextPage = (datas, next = false) => {
    if (next === false) return;

    for (const [key, value] of Object.entries(formField)) {
      dispatch({
        type: types.WIZARDS_FORM_DATA,
        payload: {
          name: key,
          value: value
        }
      })
    }

    if (pageIndex) changePage(pageIndex + 1)
  };

  useEffect(() => {
    if (formField.workMonthsAtAddress !== '' && formField.workYearsAtAddress !== '')
      setAllowToNextPage(true)
    else
      setAllowToNextPage(false)
  }, [formField])

  const handleSelect = (value: any, key: string) => {
    if (key === 'workMonthsAtAddress') {
      if (Number(value) > 12) {
        setError(true)
        setErrorMessage('Months cannot be greater than 12')
      }
      else {
        setError(false)
        setErrorMessage(undefined)
        setFormField(state => ({ ...state, [key]: value }))
      }
    } else {
      setFormField(state => ({ ...state, [key]: value }))
    }
  };

  return (
    <HideKeyboard>
      <View style={[AppContainer.container, { flex: 1 }]}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text style={commonStyles.title}>{data?.title}</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View style={{ flex: 0.8 }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  <Checkboxes title={data?.field} selected={handleSelect} />
                  <View style={styles.textFieldContainer}>
                    {data?.field?.map((item) => {
                      return (
                        <>
                          {item.type === "INPUT" && (
                            <>
                              <View style={{ width: "40%" }}>
                                <Text style={styles.text}>{item?.name}</Text>
                                <TextInputField
                                  placeholder={item.placeholder}
                                  keyboardType={"decimal-pad"}
                                  placeholderColor={Colors.disableColor}
                                  fontFamily={fontFamily["Roboto-Bold"]}
                                  error={item.key === 'workMonthsAtAddress' ? error : undefined}
                                  errorMessage={item.key === 'workMonthsAtAddress' ? errorMessage : undefined}
                                  fontSize={24}
                                  customStyle={{
                                    width: "100%",
                                    borderBottomColor: "#CFCFCF",
                                  }}
                                  onChangeText={(text) =>
                                    handleSelect(text, item.key)
                                  }
                                />
                                {
                                  item.key === 'workMonthsAtAddress' && error ? null : (
                                    <Text style={styles.lowerText}>
                                      {item?.description}
                                    </Text>
                                  )
                                }

                              </View>
                            </>
                          )}
                        </>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>

              {!allowToNextPage || error ? null : (
                <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                  <Button
                    title="Next Step"
                    onPress={() => [nextPage(formField, true)]}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          </>
        )}
      </View>
    </HideKeyboard>
  );
};

export default Wizard11;
