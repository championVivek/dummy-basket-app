import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Checkboxes from "../../Checkboxes/Checkboxes";
import commonStyles from "../../../common/styles";
import Button from "../../Button/Button";
import styles from "./styles";
import { ProgressProps } from "../../../../@types";
import AppContainer from "../../../common/AppContainer";
import { useDispatch }  "react-redux";
import types from "../../../redux/types";
import TextInputField from "../../TextInputField/TextInputField";
import Loading from "../../../screens/Loader/Loading";

interface selectedProps {
  name: string;
  value: string;
}

const Wizard1: React.FC<ProgressProps> = ({
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

  const nextPage = () => {
    if (!data.skipable && !selected) return;
    if (pageIndex !== undefined) {
      changePage(pageIndex + 1);
    }
    dispatch({
      type: types.WIZARDS_FORM_DATA,
      payload: {
        name: selected.name,
        value: selected.value,
      },
    });
  };

  const handleSelect = (item: any, key: string) => {
    setSelected({
      name: key,
      value: item,
    });
  };

  return (
    <>
      <View style={[AppContainer.container, { flex: 1 }]}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Text style={commonStyles.title}>{data?.title}</Text>
            <Text style={commonStyles.selectOneText}>Select one option</Text>
            <View style={{ flex: 1 }}>
              <View style={styles.middleView}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  <Checkboxes
                    title={data?.field}
                    selected={(e, key) => handleSelect(e, key)}
                  />
                  {data?.field?.map((item: any, index: number) => {
                    return (
                      <>
                        {item.type === "INPUT" && (
                          <TextInputField
                            key={index}
                            onChangeText={(text) =>
                              handleSelect(text, item.key)
                            }
                          />
                        )}
                      </>
                    );
                  })}
                </ScrollView>
              </View>
              {selected.name !== "" ? (
                <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                  <Button title="Next Step" onPress={() => nextPage()} />
                </View>
              ) : null}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default Wizard1;
