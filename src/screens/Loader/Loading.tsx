import { View, ActivityIndicator, Text } from "react-native";
import React from "react";
import Colors from "../../common/Colors";
import * as Progress from "react-native-progress";
import fontFamily from "../../common/fontFamily";

const Loading = ({ percentage, progress = false, msg }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {!progress ? (
        <ActivityIndicator color={Colors.progressBarColor} size={50} />
      ) : (
        <>
          <Progress.Circle
            progress={percentage}
            size={100}
            showsText
            borderWidth={0}
            thickness={5}
            color={Colors.iconColor}
          />
          {msg && (
            <Text
              style={{
                color: Colors.fontColor,
                fontSize: 20,
                fontFamily: fontFamily["Roboto-Bold"],
                marginTop: 40,
              }}
            >
              {msg}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default Loading;
