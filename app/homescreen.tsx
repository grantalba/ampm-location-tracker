import Container from "@/components/Container";
import { STRINGS } from "@/constants/constants";
import { COLORS } from "@/constants/theme";
import { getAddressFromCoords } from "@/utils/location";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

export default function HomeScreen() {
  // State to store user's current location
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string>("You are here");
  // State to store region (used to control the map's visible area)
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView | null>(null);
  const [fabVisible, setFabVisible] = useState(true);
  const [isFabExpanded, setIsFabExpanded] = useState(true);
  const widthAnim = useRef(new Animated.Value(140)).current; // Initial width for text + icon

  // Fetch user's current location when the component mounts
  useEffect(() => {
    handleCurrentLocation();
  }, []);

  const handleFabToggle = () => {
    const toValue = isFabExpanded ? 56 : 140;

    Animated.timing(widthAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setFabVisible(!isFabExpanded);
      setIsFabExpanded(!isFabExpanded);
    });

    // Optionally, recenter map as before:
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        1000
      );
    }
  };

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

    // Get address
    const address = await getAddressFromCoords(latitude, longitude);

    // Set state with location and region to update the map
    setLocation(currentLocation);
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
    setAddress(address);
  };

  // Example function to get address from coords

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
            ref={mapRef}
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
                title={address}
              />
            )}
          </MapView>
        )}
      </View>

      {/* Sticky button */}
      <Animated.View style={[styles.fabContainer, { width: widthAnim }]}>
        <TouchableOpacity
          style={styles.fab}
          onPress={handleFabToggle}
          activeOpacity={0.8}
        >
          <Ionicons name="locate" size={24} color="#fff" />
          {fabVisible && (
            <Animated.Text style={styles.fabText}>My Location</Animated.Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  fabContainer: {
    position: "absolute",
    bottom: 65,
    right: 25,
    zIndex: 10,
  },
  fab: {
    backgroundColor: COLORS.primary500,
    borderRadius: 30,
    padding: 12,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
});
