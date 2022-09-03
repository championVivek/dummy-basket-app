import { Text, TouchableOpacity, FlatList, View } from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";
import Colors from "../../common/Colors";
import { ScrollView } from "react-native-gesture-handler";

interface props {
  selected: (title: string, key: string) => void;
  title: Array<Object>;
  defaultValue?: any
}

const Checkboxes: React.FC<props> = ({ selected, title, defaultValue }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const handleSelected = (item, key) => {
    setSelectedTitle(item);
    setIsSelected(true);
    selected(item, key);
  };

  return (
    <>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {title?.map((item, index) => {
            return (
              <>
                {item.type === "BUTTON" && (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.chkContainer,
                      {
                        borderColor:
                          (isSelected && selectedTitle === item.name) || defaultValue === item.name
                            ? Colors.btnColor
                            : Colors.disableColor,
                      },
                    ]}
                    onPress={() => handleSelected(item.name, item.key)}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          color:
                            (isSelected && selectedTitle === item.name) || defaultValue === item.name
                              ? Colors.btnColor
                              : Colors.disableColor,
                        },
                      ]}
                    >
                      {item?.name}
                    </Text>
                    {(isSelected && selectedTitle === item.name) || defaultValue === item.name ? (
                      <MaterialIcons
                        name="checkbox-marked-circle"
                        size={22}
                        color={Colors.btnColor}
                      />
                    ) : (
                      <MaterialIcons
                        name="checkbox-blank-circle-outline"
                        size={22}
                        color={Colors.disableColor}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default Checkboxes;
