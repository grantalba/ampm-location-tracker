import Container from "@/components/Container";
import { STRINGS } from "@/constants/constants";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const handleCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); // Handles Permission
    if (status !== "granted") {
      Alert.alert(
        STRINGS.PERMISSION_DENIED_TITLE,
        STRINGS.PERMISSION_DENIED_CONTENT
      );
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    setLocation(currentLocation);
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  const handleLeftIconPress = () => {
    // TODO: handleLeftIconPress
  };

  const handleRightIconPress = () => {
    // TODO: handleRightIconPress
  };

  return (
    <Container
      hasLinearGradient={false}
      header={{
        shouldDisplayBack: false,
        pageTitle: "Location Tracker",
        left: (
          <Ionicons
            name="menu"
            size={Platform.OS === "ios" ? 30 : 40}
            color={COLORS.primary500}
            onPress={handleLeftIconPress}
          />
        ),
        right: (
          <Ionicons
            name="person-circle"
            size={Platform.OS === "ios" ? 30 : 40}
            color={COLORS.primary500}
            onPress={handleRightIconPress}
          />
        ),
      }}
      backgroundColor={COLORS.backgroundTertiary}
    >
      <View style={styles.container}>
        {region && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={region}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="You are here"
              />
            )}
          </MapView>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: "#000",
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  details: {
    padding: 10,
    backgroundColor: "#fff",
  },
  text: {
    marginBottom: 5,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
