import { useRouter } from "expo-router";
import React from "react";
import renderer from "react-test-renderer";

import { onboarding_screens } from "@/constants/constants";
import { NavigationContainer } from "@react-navigation/native";
import Index from "../index";

jest.useFakeTimers();

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
}));

const mockNavigate = jest.fn();
beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ navigate: mockNavigate });
});

const renderWithProviders = () =>
  renderer.create(
    <NavigationContainer>
      <Index />
    </NavigationContainer>
  );

describe("Index (Onboarding) Screen with react-test-renderer", () => {
  it("should match the snapshot", () => {
    const tree = renderWithProviders();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("renders first onboarding screen", async () => {
    const tree = renderWithProviders();

    const title = tree.root.findAll(
      (node) =>
        typeof node.type === "string" &&
        node.props.children === onboarding_screens[0].title
    );

    expect(title.length).toBeGreaterThan(0);

    const desc = tree.root.findAll(
      (node) =>
        typeof node.type === "string" &&
        node.props.children === onboarding_screens[0].desc
    );
    expect(desc.length).toBeGreaterThan(0);

    const nextButton = tree.root.findAll(
      (node) => typeof node.type === "string" && node.props.children === "Next"
    );
    expect(nextButton.length).toBeGreaterThan(0);
  });

  it("renders second onboarding screen", () => {
    const tree = renderWithProviders();
    const button = tree.root.find(
      (node) => node.props.accessibilityLabel === "onboardingTextButton"
    );
    button.props.onPress();

    const title = tree.root.find(
      (node) =>
        typeof node.type === "string" &&
        node.props.children === onboarding_screens[1].title
    );
    expect(title).toBeDefined();

    const desc = tree.root.findAll(
      (node) =>
        typeof node.type === "string" &&
        node.props.children === onboarding_screens[1].desc
    );
    expect(desc.length).toBeGreaterThan(0);
  });

  it("renders third onboarding screen and navigates on last press", () => {
    const tree = renderWithProviders();
    const button = tree.root.find(
      (node) => node.props.accessibilityLabel === "onboardingTextButton"
    );

    // simulate presses for each onboarding screen
    for (let i = 1; i <= onboarding_screens.length; i++) {
      button.props.onPress();
    }

    const finalTitle = tree.root.find(
      (node) =>
        typeof node.type === "string" &&
        node.props.children === onboarding_screens[2].title
    );
    expect(finalTitle).toBeDefined();

    const finalDesc = tree.root.findAll(
      (node) =>
        typeof node.type === "string" &&
        node.props.children === onboarding_screens[2].desc
    );
    expect(finalDesc.length).toBeGreaterThan(0);

    const letsGo = tree.root.find(
      (node) =>
        typeof node.type === "string" && node.props.children === "Let's Go"
    );
    expect(letsGo).toBeDefined();

    expect(mockNavigate).toHaveBeenCalledWith("/homescreen");
  });
});
