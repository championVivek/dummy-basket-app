import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import FontIcon5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";

import commonStyles from "../../../common/styles";
import TextInputField from "../../TextInputField/TextInputField";
import Button from "../../Button/Button";
import HideKeyboard from "../../HideKeyboard";
import AppContainer from "../../../common/AppContainer";
import fontFamily from "../../../common/fontFamily";
import { ProgressProps } from "../../../../@types";
import types from "../../../redux/types";
import Checkboxes from "../../Checkboxes/Checkboxes";
import { cleanData } from "../../../utils/cleanData";
import Loading from "../../../screens/Loader/Loading";
import styles from "./styles";
import { useIsFocused } from "@react-navigation/native";

const Wizard12: React.FC<ProgressProps> = ({
  data,
  loading,
  submit
}) => {
  const [fieldData, setFieldData] = useState({});
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [defaultSelected, setDefaultSelected] = useState([{}])

  const nextPage = async (datas: any, next = false) => {
    if (next === false) return;

    const formFieldFieldData = cleanData(datas);

    for (let i of formFieldFieldData) {
      dispatch({
        type: types.WIZARDS_FORM_DATA,
        payload: {
          name: i.key,
          value: i.value,
        },
      });
    }

    submit(true)
  };

  const handleSelect = (value: any, key: string) => {
    setFieldData({ value, key });
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
                  {data?.field?.map((item: any) => {
                    return (
                      <>
                        {item.type === "INPUT" && (
                          <>
                            <TextInputField
                              leftIconOver={
                                <FontIcon5
                                  name="pound-sign"
                                  size={22}
                                  color="gray"
                                  style={{
                                    paddingRight: 5,
                                    alignSelf: "center",
                                  }}
                                />
                              }
                              keyboardType="numeric"
                              defaultValue={defaultSelected?.toString()}
                              fontFamily={fontFamily["Roboto-Bold"]}
                              fontSize={23}
                              placeholderColor="#394951"
                              onChangeText={(text) =>
                                handleSelect(text, item.key)

                              }
                            />
                          </>
                        )}
                        <Text style={styles.text}>
                          {data.field[0]?.description}
                        </Text>
                      </>
                    );
                  })}
                </ScrollView>
              </View>
              {fieldData?.length <= 1 && !defaultSelected ? null : (
                <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                  <Button
                    title="Submit"
                    onPress={() => [nextPage(fieldData, true)]}
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

export default Wizard12;
