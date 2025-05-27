import HomeScreen from "@/app/homescreen";
import React, { Alert } from "react";
import { act, create } from "react-test-renderer";

// Mock MapView and Marker from react-native-maps
jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: (props: any) => <View {...props} testID="mapview" />,
    Marker: (props: any) => <View {...props} testID="marker" />,
    PROVIDER_GOOGLE: "google",
  };
});

// Mock expo-location
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(() =>
    Promise.resolve({ status: "granted" })
  ),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    })
  ),
}));

// Mock getAddressFromCoords
jest.mock("@/utils/location", () => ({
  getAddressFromCoords: jest.fn(() => Promise.resolve("Mocked Address")),
}));

// Mock Alert
jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("HomeScreen", () => {
  it("should match the snapshot", async () => {
    let tree;
    await act(async () => {
      tree = create(<HomeScreen />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders without crashing", async () => {
    let tree;
    await act(async () => {
      tree = create(<HomeScreen />);
    });
    expect(tree!.toJSON()).toBeTruthy();
  });

  it("renders MapView after location permission granted", async () => {
    let tree;
    await act(async () => {
      tree = create(<HomeScreen />);
    });

    const mapView = tree!.root.findAll((el) => el.props.testID === "mapview");
    expect(mapView.length).toBeGreaterThan(0);
  });

  it("toggles theme on right header icon press", async () => {
    let tree;
    await act(async () => {
      tree = create(<HomeScreen />);
    });

    const icons = tree.root.findAll(
      (el) => el.props.onPress && el.props.name === "sunny"
    );

    expect(icons.length).toBeGreaterThan(0);

    await act(async () => {
      icons[0].props.onPress();
    });

    // Icon should now switch to moon (dark mode)
    const newIcons = tree.root.findAll(
      (el) => el.props.onPress && el.props.name === "moon"
    );
    expect(newIcons.length).toBeGreaterThan(0);
  });
});
