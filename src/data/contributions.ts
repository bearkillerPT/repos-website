export interface Contribution {
  repo: string;
  title: string;
  href: string;
  status: "merged" | "open";
  year: number;
  /** The repository's stars when this was written; the live count replaces it when GitHub answers */
  stars: number;
  /** What came of it, when there's more to say than the title */
  note?: string;
}

export const contributions: Contribution[] = [
  {
    repo: "expo/expo",
    stars: 53453,
    title: "Add the Android light sensor to expo-sensors",
    href: "https://github.com/expo/expo/pull/18225",
    status: "merged",
    year: 2022,
    note: "Released in Expo SDK 47. Written for the C-ITS app in my dissertation.",
  },
  {
    repo: "Milkdown/milkdown",
    stars: 12061,
    title: "Fix the submit button on Crepe's inline edit confirm",
    href: "https://github.com/Milkdown/milkdown/pull/2163",
    status: "merged",
    year: 2025,
  },
  {
    repo: "summerfed/rn-tri-toggle-switch",
    stars: 4,
    title: "Fix the range of positions of the toggle's circle",
    href: "https://github.com/summerfed/rn-tri-toggle-switch/pull/5",
    status: "merged",
    year: 2022,
  },
  {
    repo: "summerfed/rn-tri-toggle-switch",
    stars: 4,
    title: "Comply with React Native 0.62's useNativeDriver",
    href: "https://github.com/summerfed/rn-tri-toggle-switch/pull/2",
    status: "merged",
    year: 2022,
  },
  {
    repo: "mapbox/timespace",
    stars: 72,
    title: "Move from Moment to Luxon",
    href: "https://github.com/mapbox/timespace/pull/15",
    status: "open",
    year: 2024,
    note: "Published as a fork in the meantime: bearkillerPT/timespace-luxon.",
  },
  {
    repo: "dgreasi/react-native-time-slot-picker",
    stars: 18,
    title: "Multiple selection",
    href: "https://github.com/dgreasi/react-native-time-slot-picker/pull/9",
    status: "open",
    year: 2023,
  },
];
