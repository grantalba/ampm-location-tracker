export type OnboardingScreensType = {
  id: number;
  image: any;
  title: string;
  desc: string;
};

export const onboarding_screens: OnboardingScreensType[] = [
  {
    id: 1,
    image: require("@/assets/images/favicon.png"),
    title: "Track Your Location",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.",
  },
  {
    id: 2,
    image: require("@/assets/images/favicon.png"),
    title: "Search Location",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.",
  },
  {
    id: 3,
    image: require("@/assets/images/favicon.png"),
    title: "Light/Dark Theme",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dapibus varius nulla, quis dictum augue.",
  },
];
