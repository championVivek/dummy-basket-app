import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import commonStyles from "../../../common/styles";
import TextInputField from "../../TextInputField/TextInputField";
import styles from "./styles";
import Button from "../../Button/Button";
import { ProgressProps } from "../../../../@types";
import HideKeyboard from "../../HideKeyboard";
import AppContainer from "../../../common/AppContainer";
import { useDispatch } from "react-redux";
import types from "../../../redux/types";
import Checkboxes from "../../Checkboxes/Checkboxes";
import { cleanData } from "../../../utils/cleanData";
import Colors from "../../../common/Colors";
import Loading from "../../../screens/Loader/Loading";
import { useIsFocused } from "@react-navigation/native";

const Wizard6: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [datas, setdata] = useState([{}]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [defaultSelected, setDefaultSelected] = useState([{}])


  const nextPage = (datas, next = false) => {
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
    if (pageIndex) changePage(pageIndex + 1);
  };

  const handleSelect = (value: any, key: string) => {
    setdata([...datas, { value, key }]);
  };


  return (
    <HideKeyboard>
      <View style={[AppContainer.container, { flex: 1 }]}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text style={commonStyles.title}>{data?.title}</Text>
            <View style={{ flex: 0.8 }}>
              <KeyboardAvoidingView
                keyboardVerticalOffset={140}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <Checkboxes
                    title={data?.field}
                    selected={(e, key) => handleSelect(e, key)}
                  />
                  {data?.field?.map((item) => {
                    return (
                      <>
                        {item.type === "INPUT" && (
                          <View style={styles.fieldContainer}>
                            <Text style={styles.text}>{item?.name}</Text>
                            <TextInputField
                              placeholder={item.placeholder}
                              placeholderColor="#394951"
                              onChangeText={(text) =>
                                [handleSelect(text, item.key)]
                              }
                              customStyle={{
                                borderBottomColor: Colors.fontColor,
                                borderBottomWidth: 0.5,
                              }}
                              fontSize={18}
                            />
                          </View>
                        )}
                      </>
                    );
                  })}
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
            {datas?.length <= 1 && !defaultSelected ? null : (
              <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                <Button
                  title="Next Step"
                  onPress={() => nextPage(datas, true)}
                />
              </View>
            )}
          </>
        )}
      </View>
    </HideKeyboard>
  );
};

export default Wizard6;
