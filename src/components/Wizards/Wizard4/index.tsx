import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./styles";
import commonStyles from "../../../common/styles";
import TextInputField from "../../TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import Button from "../../Button/Button";
import { ProgressProps } from "../../../../@types";
import HideKeyboard from "../../HideKeyboard";
import AppContainer from "../../../common/AppContainer";
import types from "../../../redux/types";
import { useDispatch } from "react-redux";
import Loading from "../../../screens/Loader/Loading";
import { useIsFocused } from "@react-navigation/native";

const Wizard4: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const dispatch = useDispatch();
  const isFocused = useIsFocused()


  const nextPage = () => {
    Dispatch(selectedDate)
    if (pageIndex) changePage(pageIndex + 1);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(moment(date).format("YYYY-MM-DD"));
    hideDatePicker();
  };

  function Dispatch(date) {
    dispatch({
      type: types.WIZARDS_FORM_DATA,
      payload: {
        name: data?.field[0].key,
        value: moment(date).format("DD"),
      },
    });
    dispatch({
      type: types.WIZARDS_FORM_DATA,
      payload: {
        name: data?.field[1].key,
        value: moment(date).format("MM"),
      },
    });
    dispatch({
      type: types.WIZARDS_FORM_DATA,
      payload: {
        name: data?.field[2].key,
        value: moment(date).format("YYYY"),
      },
    });
  }



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
              <View style={styles.middleView}>
                <TouchableOpacity onPress={showDatePicker}>
                  <TextInputField
                    defaultValue={selectedDate}
                    editable={false}
                    pointerEvents="none"
                    value={selectedDate}
                    placeholder="YYYY-MM-DD"
                    placeholderColor="#CFCFCF"
                    fontSize={18}
                    customStyle={{
                      borderBottomColor: Colors[85858580],
                    }}
                  />
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={new Date(selectedDate)}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date(data?.field[2]?.inputMin, 0, 1)}
                  maximumDate={new Date(data?.field[2]?.inputMax, 11, 31)}
                />

                <Text style={styles.bottomTextStyle}>
                  Date of birth example: 26th June, 1985
                </Text>
              </View>
              {selectedDate !== "" ? (
                <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                  <Button title="Next Step" onPress={nextPage} />
                </View>
              ) : null}
            </KeyboardAvoidingView>
          </>
        )}
      </View>
    </HideKeyboard>
  );
};

export default Wizard4;
