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
import fontFamily from "../../../common/fontFamily";
import { useDispatch } from "react-redux";
import types from "../../../redux/types";
import Checkboxes from "../../Checkboxes/Checkboxes";
import { cleanData } from "../../../utils/cleanData";
import FontIcon5 from "react-native-vector-icons/FontAwesome5";
import Loading from "../../../screens/Loader/Loading";
import { useIsFocused } from "@react-navigation/native";

const Wizard8: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [fieldData, setFieldData] = useState([{}]);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [defaultSelected, setDefaultSelected] = useState([{}])

  const nextPage = (formData, next = false) => {
    if (next === false) return;

    const formFieldFieldData = cleanData(formData);

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
    setFieldData([...fieldData, { value, key }]);
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
                  <Checkboxes
                    title={data?.field}
                    defaultValue={defaultSelected}
                    selected={(e, key) => handleSelect(e, key)}
                  />
                  {data?.field?.map((item) => {
                    return (
                      <>
                        {item.type === "INPUT" && (
                          <TextInputField
                            leftIconOver={
                              <FontIcon5
                                name="pound-sign"
                                size={22}
                                color="gray"
                                style={{ paddingRight: 5, alignSelf: 'center' }}
                              />
                            }
                            keyboardType="numeric"
                            placeholderColor="#394951"
                            fontFamily={fontFamily["Roboto-Bold"]}
                            fontSize={23}
                            onChangeText={(text) =>
                              handleSelect(text, item.key)
                            }
                          />
                        )}
                        <View>
                          <Text style={styles.text}>{item.description}</Text>
                        </View>
                      </>
                    );
                  })}
                </ScrollView>
              </View>
              {fieldData?.length <= 1 && !defaultSelected ? null : (
                <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                  <Button
                    title="Next Step"
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

export default Wizard8;
