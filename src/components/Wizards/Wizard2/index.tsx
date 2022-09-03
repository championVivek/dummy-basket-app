import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import commonStyles from "../../../common/styles";
import Checkboxes from "../../Checkboxes/Checkboxes";
import { ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import types from "../../../redux/types";
import TextInputField from "../../TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import Loading from "../../../screens/Loader/Loading";
import { useIsFocused } from "@react-navigation/native";

interface selectedProps {
  name: string;
  value: string;
}

const Wizard2: React.FC<ProgressProps> = ({
  pageIndex,
  changePage,
  data,
  loading,
}) => {
  const [selected, setSelected] = useState<selectedProps>({
    name: "",
    value: "",
  });
  const [defaultSelected, setDefaultSelected] = useState(null)
  const dispatch = useDispatch();
  const isFocused = useIsFocused()

  // move to next page when value is selected
  useEffect(() => {
    if (!data?.skipable && !selected) return
    dispatch({
      type: types.WIZARDS_FORM_DATA,
      payload: {
        name: selected.name,
        value: selected.value
      }
    })

    if (pageIndex == 1) changePage(pageIndex + 1)
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
          <Text style={commonStyles.title}>{data?.title}</Text>
          <Text style={commonStyles.selectOneText}>Select one option</Text>
          <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <Checkboxes
                title={data?.field}
                defaultValue={defaultSelected === true ? 'Yes' : defaultSelected === null ? null : 'No'}
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
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default Wizard2;
