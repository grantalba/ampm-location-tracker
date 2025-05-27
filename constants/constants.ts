export type OnboardingScreensType = {
  id: number;
  image: any;
  title: string;
  desc: string;
};

export const onboarding_screens: OnboardingScreensType[] = [
  {
    id: 1,
    image: require("@/assets/images/splash_screen1.png"),
    title: "Track Your Location",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.",
  },
  {
    id: 2,
    image: require("@/assets/images/splash_screen2.png"),
    title: "Recenter Your Location",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.",
  },
  {
    id: 3,
    image: require("@/assets/images/splash_screen3.png"),
    title: "Light/Dark Theme",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.",
  },
];

export const STRINGS = {
  PERMISSION_DENIED_TITLE: "Permission Denied",
  PERMISSION_DENIED_CONTENT: "Location permission is required.",
};
