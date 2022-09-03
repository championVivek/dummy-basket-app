import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import commonStyles from "../../../common/styles";
import Checkboxes from "../../Checkboxes/Checkboxes";
import { ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import { useDispatch } from "react-redux";
import types from "../../../redux/types";
import TextInputField from "../../TextInputField/TextInputField";
import Colors from "../../../common/Colors";
import Loading from "../../../screens/Loader/Loading";

interface selectedProps {
  name: string;
  value: string;
}

const Wizard10: React.FC<ProgressProps> = ({
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
  // move to next page when a value is selected

  useEffect(() => {
    if (!data?.skipable && !selected) return;

    dispatch({
      type: types.WIZARDS_FORM_DATA,
      payload: {
        name: selected.name,
        value: selected.value
      }
    })

    if (pageIndex !== undefined) changePage(pageIndex + 1)
  }, [selected])

  const handleSelect = (item: any, key: string) => {
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
          <View style={{ flex: 0.8 }}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <Checkboxes
                title={data?.field}
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

export default Wizard10;
