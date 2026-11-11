// What only the CV needs. Everything else (experience, education, projects, pull requests) comes
// from the same data as the site, through scripts/cv-data.ts, so the two can't drift apart.

export const cv = {
  headline: "Full-stack Software Engineer",
  location: "Portugal",
  site: "bearkillerpt.xyz",
  summary:
    "I've built web apps professionally since 2021, mostly React and TypeScript up front with Python (FastAPI) or Node.js behind them. Outside work I automate whatever is repetitive, with Playwright and OpenCV bots and browser extensions like Accessible Find in Page, published on the Chrome and Firefox stores. I've also worked closer to the hardware, from a startup's ESP32 EV chargers to a pipelined MIPS CPU on an FPGA.",

  /** Projects from projects.ts to list, in this order (Plug Here and C-ITS are under experience) */
  projects: ["accessible-find", "auditwaiting", "pokemmo-bot", "nordic-thingy", "metin2-bot", "raspberry-pi"],

  /** The tools each job used, keyed by company in profile.ts */
  jobTech: {
    "A-to-Be": ["React", "TypeScript", "TanStack", "MapLibre", "SignalR"],
    Morphotech: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "AWS"],
    "Plug Here": ["React Native", "Expo", "Node.js", "PostgreSQL", "MQTT", "ESP32"],
    "Instituto de Telecomunicações": ["React Native", "C++", "C", "MQTT", "ASN.1"],
  } as Record<string, string[]>,

  /** Pull requests from contributions.ts worth a line on the CV */
  contributions: ["expo/expo", "Milkdown/milkdown"],

  publications: [
    {
      title:
        "A Modular In-Vehicle C-ITS Architecture for Sensor Data Collection, Vehicular Communications and Cloud Connectivity",
      authors: "D. Rocha, G. Teixeira, E. Vieira, J. Almeida, J. Ferreira",
      venue: "Sensors 23(3), 1724 (MDPI), Editor's Choice",
      year: "2023",
      url: "https://doi.org/10.3390/s23031724",
    },
  ],

  skills: [
    { type: "Front end", items: ["React", "TypeScript", "React Native", "Expo", "TanStack", "Tailwind CSS"] },
    { type: "Back end", items: ["Python", "FastAPI", "Node.js", "Express", "PostgreSQL", "MQTT"] },
    { type: "Automation", items: ["Playwright", "OpenCV", "PyAutoGUI", "browser extensions"] },
    { type: "Tooling", items: ["Git", "Docker", "Nix", "AWS", "Vite", "Bun"] },
    { type: "Low level", items: ["C", "C++", "ESP32", "Zephyr", "VHDL"] },
  ],

  languages: ["Portuguese (native)", "English (near-native)"],
};
