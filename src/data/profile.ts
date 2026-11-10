export const profile = {
  name: "Gil Teixeira",
  handle: "bearkillerPT",
  github: "https://github.com/bearkillerPT",
  linkedin: "https://www.linkedin.com/in/gil-teixeira-ba5036135/",
  youtube: "https://www.youtube.com/@amanofculture9440",
  cv: "/Curriculo.pdf",
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
  },
  {
    role: "Software Engineer",
    company: "Morphotech",
    href: "https://www.morphotech.com",
    start: "2024-02",
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
