import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Image, StyleSheet, View } from "react-native";
import { MapProps } from "../../../@types";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 270,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});



const Map: React.FC<MapProps> = ({ coordinates }) => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: coordinates.latitudeDelta,
          longitudeDelta: coordinates.longitudeDelta,
        }}
      >
        <Marker
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
        >
          <Image
            source={require("../../../assets/locationMarker.png")}
            style={{ height: 40, width: 40 }}
          />
        </Marker>
      </MapView>
    </View>
  );
};

export default Map;
