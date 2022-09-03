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
import Button from "../../Button/Button";
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

const Wizard7: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [formField, setFormField] = useState({
    bstkWorkExperienceYear:'',
    bstkWorkExperienceMonths:''
  });
  const [errorMessage,setErrorMessage] = useState<string|undefined>(undefined)
  const [error,setError] = useState<boolean>(false)
  const [allowToNextPage,setAllowToNextPage] = useState<boolean>(false)
  const dispatch = useDispatch();

  const nextPage = (formField, next = false) => {
    if (next === false) return;

    for (const [key, value] of Object.entries(formField)) {
      dispatch({
        type:types.WIZARDS_FORM_DATA,
        payload:{
          name:key,
          value:value
        }
      })

      if(pageIndex) changePage(pageIndex+1)
    }
  };
  
  useEffect(()=>{
    if(formField.bstkWorkExperienceMonths !== '' && formField.bstkWorkExperienceYear !== '')
      setAllowToNextPage(true)
    else
      setAllowToNextPage(false)
  },[formField])

  const handleSelect = (value: string, key: 'bstkWorkExperienceYear'|'bstkWorkExperienceMonths') => {
    // if months get greater than or equal to 12 throw error
    if(key === 'bstkWorkExperienceMonths'){
      if(Number(value)>12){
        setError(true)
        setErrorMessage('Months cannot be greater than 12')
      }
      else{
        setError(false)
        setErrorMessage(undefined)
        setFormField(state => ({ ...state, [key]: value }))
      }
    }else{
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
              <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Checkboxes
                  title={data?.field}
                  selected={(e, key) => handleSelect(e, key)}
                />
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingTop: 20,
                  }}
                >
                  {data?.field?.map((item) => {
                    return (
                      <>
                        {item.type === "INPUT" && (
                          <>
                            <View style={{ width: "40%" }}>
                              <Text style={styles.text}>{item.name}</Text>
                              <TextInputField
                                placeholder={item.placeholder}
                                keyboardType={
                                  item.inputType === "number"
                                    ? "decimal-pad"
                                    : "default"
                                }
                                onChangeText={(text) =>
                                  handleSelect(text, item.key)
                                }
                                placeholderColor={Colors.disableColor}
                                error={item.key === 'bstkWorkExperienceMonths'?error:undefined}
                                errorMessage={item.key === 'bstkWorkExperienceMonths'?errorMessage:undefined}
                                fontFamily={fontFamily["Roboto-Bold"]}
                                fontSize={24}
                                customStyle={{
                                  width: "100%",
                                  borderBottomColor: "#CFCFCF",
                                }}
                              />
                            </View>
                          </>
                        )}
                      </>
                    );
                  })}
                </View>
              </ScrollView>
              {!allowToNextPage || error? null : (
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

export default Wizard7;
