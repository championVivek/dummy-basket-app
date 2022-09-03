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
import { CoordinatesProps, ProgressProps } from "../../../../@types";
import HideKeyboard from "../../HideKeyboard";
import Map from "../../Map";
import LinearGradient from "react-native-linear-gradient";
import AppContainer from "../../../common/AppContainer";
import { useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import Checkboxes from "../../Checkboxes/Checkboxes";
import Colors from "../../../common/Colors";
import Loading from "../../../screens/Loader/Loading";
import { cleanData } from "../../../utils/cleanData";
import types from "../../../redux/types";

const Wizard9: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [coordinates, setCoordinates] = useState<CoordinatesProps>({
    latitude: 23.5558,
    longitude: 46.6396,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [datas, setdata] = useState([{}]);
  const dispatch = useDispatch();

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
      <KeyboardAvoidingView
        collapsable={true}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={[AppContainer.container, { flex: 0.5 }]}>
              <Text style={commonStyles.title}>{data?.title}</Text>

              <View style={{ paddingVertical: 30 }}>
                <ScrollView
                  bounces={false}
                >
                  <Checkboxes title={data?.field} selected={handleSelect} />
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
                                handleSelect(text, item?.key)
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
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "flex-end",
              }}
            >
              <LinearGradient
                colors={["#F3F4F6", "#F3F4F600"]}
                style={{
                  zIndex: 1,
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                }}
              />
              <Animatable.View
                animation="fadeIn"
                style={{ height: 250, width: "100%", marginVertical: 20 }}
              >
                {/* <Map coordinates={coordinates} /> */}
              </Animatable.View>
              <View
                style={{
                  zIndex: 2,
                  position: "absolute",
                  bottom: 200,
                  right: 0,
                  left: 0,
                  paddingHorizontal: 30,
                }}
              >
                <Button
                  title="Next Step"
                  onPress={() => nextPage(datas, true)}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </HideKeyboard>
  );
};

export default Wizard9;
