export const profile = {
  name: "Gil Teixeira",
  handle: "bearkillerPT",
  github: "https://github.com/bearkillerPT",
  linkedin: "https://www.linkedin.com/in/gil-teixeira-ba5036135/",
  email: "gilteixeira@ua.pt",
  youtube: "https://www.youtube.com/@amanofculture9440",
  // Built from cv/cv.typ by `bun run cv` (and by the Nix build)
  cv: "/cv.pdf",
  source: "https://github.com/bearkillerPT/repos-website",
  server: "https://github.com/bearkillerPT/raspberryConfs",
};

/** A month, as "YYYY-MM" */
type Month = `${number}-${number}`;

export interface Job {
  role: string;
  company: string;
  href: string;
  start: Month;
  /** Leave out while it's the current job */
  end?: Month;
  summary?: string;
}

// Newest first
export const experience: Job[] = [
  {
    role: "Software Engineer",
    company: "A-to-Be",
    href: "https://www.a-to-be.com",
    start: "2026-02",
    summary:
      "Front end for MODALSHIFT, a Horizon Europe project on multimodal transport and traffic management: a React and TypeScript app with maps, live data and dashboards.",
  },
  {
    role: "Software Engineer",
    company: "Morphotech",
    href: "https://www.morphotech.com",
    start: "2024-02",
    summary:
      "Full-stack work, currently on Verassay: a React and TypeScript front end, and a Python (FastAPI) back end on PostgreSQL and AWS.",
  },
  {
    // First and last commit of bearkillerPT/park2Charge; nearly every commit is mine
    role: "Lead developer",
    company: "Plug Here",
    href: "https://plughere.app",
    start: "2023-09",
    end: "2026-10",
    summary:
      "A startup's EV-charging system for apartment buildings, built almost entirely by me: the React Native app, the Node.js API on PostgreSQL, the ESP32 charger firmware and the MQTT link between them. It reached a working prototype, not production.",
  },
  {
    role: "Researcher",
    company: "Instituto de Telecomunicações",
    href: "https://www.it.pt",
    start: "2021-07",
    end: "2024-07",
    summary:
      "A research grant on cooperative intelligent transport systems, which became my master's dissertation: a React Native app for V2X messages, an ETSI-layered C++ stack for on-board and roadside units, a journal paper, and the Android light sensor in Expo.",
  },
];

export const education = [
  {
    years: "2021 – 2024",
    title: "MSc in Informatics Engineering",
    place: "University of Aveiro",
    note: "Dissertation at Instituto de Telecomunicações, graded 18/20.",
  },
  {
    years: "2018 – 2021",
    title: "BSc in Computer and Telematics Engineering",
    place: "University of Aveiro",
  },
  {
    years: "2017 – 2025",
    title: "Violin, 8th grade",
    place: "Conservatório de Música de Águeda",
    note: "The last grade of the conservatory course.",
  },
];

export const music = [
  {
    title: "Violin: 8th grade exam",
    detail: "Kreutzer, Rode, Bach, Kreisler and Mozart's 5th concerto",
    year: "2025",
    href: "https://www.youtube.com/watch?v=N07N1D8f1F8",
    image: "/media/violin-exam.webp",
  },
  {
    title: "Guitar: Carillon, by Benvenuto Terzi",
    detail: "Classical guitar at home",
    year: "2026",
    href: "https://www.youtube.com/watch?v=3XpMxU5XauU",
    image: "/media/guitar-carillon.webp",
  },
];
