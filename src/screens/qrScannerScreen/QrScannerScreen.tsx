import "react-native-reanimated";
import React, { useEffect, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";

import { RNCamera } from "react-native-camera";
import { Svg, Defs, Rect, Mask } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import fontFamily from "../../common/fontFamily";
import { routename } from "../../navigation/Routes";
import types from "../../redux/types";
import Loading from "../Loader/Loading";
import { dummyQrdata } from "../../utils/dummyData";

const QrScannerScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { product = '' } = useSelector((state) => state.productDataReducer);

  const [qrData, setQrData] = useState({
    "product-id": "",
    "x-application-id": "",
  });
  const [hasScanned, setScanned] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);




  useEffect(() => {
    // Call only when screen open or when back on screen
    if (isFocused) {
      dispatch({ type: types.PRODUCT_ID, payload: null });
      dispatch({ type: types.XAPPLICATIONID, payload: null });
      setScanned(false);
    }
  }, [isFocused]);


  useEffect(() => {
    if (!hasScanned) {
      dispatch({ type: types.PRODUCT_ID, payload: null });
      dispatch({ type: types.XAPPLICATIONID, payload: null });
    }
  }, [hasScanned]);

  useEffect(() => {
    // Call only when screen open or when back on screen
    if (product && !loading) {
      navigation.navigate(routename.ScanSuccessScreen);
      setError(false);
      setLoading(false);
    }
  }, [product, loading]);


  // run when qr scans
  const handleBarCode = async ({ data }: any) => {
    if (hasScanned) {
      return;
    }
    setScanned(true);
    setQrData(dummyQrdata);
  };

  useEffect(() => {
    dispatch({ type: types.PRODUCT_ID, payload: qrData["product-id"] });

    dispatch({
      type: types.XAPPLICATIONID,
      payload: qrData["x-application-id"],
    });
  }, [qrData]);

  const { height, width } = Dimensions.get("window");
  const COL_HEIGHT = 350;
  const COL_WIDTH = 330;

  const RectMask = () => {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="white" opacity={0.8} />
            <Rect x={width / 2 - COL_WIDTH / 2} y={height / 2 - COL_HEIGHT / 1.6} rx="30" ry="30" width={COL_WIDTH} height={COL_HEIGHT} stroke="white" fill="black" />
          </Mask>
        </Defs>
        <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.8)" mask="url(#mask)" fill-opacity="0" />
      </Svg>
    );
  };

  return (
    <>
      <StatusBar hidden={true} />
      {loading ? (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "white",
          }}
        >
          <Loading />
        </View>
      ) : (
        <RNCamera
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={RNCamera.Constants.FlashMode.on}
          style={StyleSheet.absoluteFill}
          onBarCodeRead={handleBarCode}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          captureAudio={false}
        >
          <RectMask />
          <View style={styles.textContainer}>
            <Text style={styles.scanText}>Scan</Text>
          </View>
        </RNCamera>
      )}
    </>
  );
};

export default QrScannerScreen;

const styles = StyleSheet.create({
  scanText: {
    color: "#fff",
    fontFamily: fontFamily["Roboto-Regular"],
    fontSize: 18,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
