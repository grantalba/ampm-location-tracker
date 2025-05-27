import Container from "@/components/Container";
import { STRINGS } from "@/constants/constants";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export default function HomeScreen() {
  // State to store user's current location
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  // State to store region (used to control the map's visible area)
  const [region, setRegion] = useState<Region | null>(null);

  // Fetch user's current location when the component mounts
  useEffect(() => {
    handleCurrentLocation();
  }, []);

  // Function to request permission and get current GPS location
  const handleCurrentLocation = async () => {
    // Request permission to access location
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Show alert if permission is denied
      Alert.alert(
        STRINGS.PERMISSION_DENIED_TITLE,
        STRINGS.PERMISSION_DENIED_CONTENT
      );
      return;
    }

    // Get the current position
    const currentLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currentLocation.coords;

    // Set state with location and region to update the map
    setLocation(currentLocation);
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
  };

  // Placeholder for menu icon action
  const handleLeftIconPress = () => {
    // TODO: handleLeftIconPress
  };

  // Placeholder for profile icon action
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
        {/* Only render the map when region is available */}
        {region && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={region}
          >
            {/* Render a marker at the user's current location */}
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
