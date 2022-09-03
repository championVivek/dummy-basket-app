import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { createRef, useRef, useState } from "react";
import styles from "./styles";
import SignatureCapture from 'react-native-signature-capture';
import AppContainer from "../../common/AppContainer";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Colors from "../../common/Colors";
import { current } from "@reduxjs/toolkit";

const DrawSignatureScreen = ({ navigation }: any) => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const [signature,setSignature] = useState<string|null>(null);
  const sign = useRef()
  const clearCanvas = () => sign.current.resetImage()

  const saveSignature=()=>sign.current.saveImage()

  const _onSaveEvent=(result)=>setSignature(result.encoded)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={AppContainer.container}>
        <Header title="Draw your Signature" navigation={navigation} />
        <View style={{ height: SCREEN_HEIGHT / 1.5 }}>
          <SignatureCapture
            style={{flex:1,marginTop:20}}
            ref={sign}
            showBorder={false}
            saveImageFileInExtStorage={false}
            showNativeButtons={false}
            showTitleLabel={false}
            onSaveEvent={_onSaveEvent}
            // backgroundColor="#ff00ff"
            strokeColor="#000000"
            minStrokeWidth={1}
            // maxStrokeWidth={4}
          />
        </View>
        <View>
          <Button
            title="Clear Screen"
            fontColor={Colors.iconColor}
            onPress={clearCanvas}
            customStyle={{
              backgroundColor: "transparent",
              borderWidth: 1.5,
              borderColor: Colors.iconColor,
              marginVertical: 10,
              height: 60,
            }}
          />
          <Button
            title="Done"
            onPress={saveSignature}
            customStyle={{
              height: 60,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );

};

export default DrawSignatureScreen;
