import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import commonStyles from "../../../common/styles";
import Checkboxes from "../../Checkboxes/Checkboxes";
import { ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import { useDispatch } from "react-redux";
import types from "../../../redux/types";
import TextInputField from "../../TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import Loading from "../../../screens/Loader/Loading";
import { useIsFocused } from "@react-navigation/native";

interface selectedProps {
  name: string;
  value: string;
}

const Wizard5: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [selected, setSelected] = useState<selectedProps>({
    name: "",
    value: "",
  });
  const dispatch = useDispatch();
  const isFocused = useIsFocused()
  const [defaultSelected, setDefaultSelected] = useState(null)

  // move to next page when value is selected
  useEffect(() => {
    try {
      if (!data?.skipable && !selected) return;
      dispatch({
        type: types.WIZARDS_FORM_DATA,
        payload: {
          name: selected.name,
          value: selected.value
        }
      })
      if (pageIndex != undefined) changePage(pageIndex + 1)
    } catch (e) {
      console.log(e)
    }
  }, [selected])

  const handleSelect = (item: any, key: string) => {
    if (item) {
      setDefaultSelected(null)
    }
    setSelected({
      name: key,
      value: item,
    });
  };

  return (
    <View style={[AppContainer.container, { flex: 1 }]}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <Text style={commonStyles.title}>{data?.title}</Text>
            <Text style={commonStyles.selectOneText}>Select one option</Text>
            <View style={{ flex: 1 }}>
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
                        placeholder={item.name}
                        placeholderColor={Colors.fontColor}
                        onChangeText={(text) => handleSelect(text, item.key)}
                      />
                    )}
                  </>
                );
              })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Wizard5;
