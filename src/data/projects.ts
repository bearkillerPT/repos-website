export type Category =
  | "product"
  | "extension"
  | "bot"
  | "freelance"
  | "research"
  | "university"
  | "library";

export const categoryLabels: Record<Category, string> = {
  product: "Apps & products",
  extension: "Browser extensions",
  bot: "Bots & automation",
  freelance: "Freelance",
  research: "Research",
  university: "University",
  library: "Libraries & infrastructure",
};

/** The All projects filters: every category, plus "Web apps", which cuts across them */
export type ProjectFilter = Category | "web";

export const filterLabels: Record<ProjectFilter, string> = { web: "Web apps", ...categoryLabels };

export function matchesFilter(project: Project, filter: ProjectFilter) {
  return filter === "web" ? Boolean(project.webApp) : project.category === filter;
}

/** Links to these anchors (like the intro's "bots") open All projects with that filter on */
export const filterAnchors: Partial<Record<ProjectFilter, string>> = {
  web: "web-apps",
  bot: "bots",
  extension: "browser-extensions",
};

export type Media =
  | { type: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  | { type: "video"; src: string; poster: string; label: string };

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One or two sentences, shown everywhere the project is */
  summary: string;
  /** Longer notes, shown when the project is expanded */
  details?: string;
  /** Shown as is, e.g. "2023 – now"; `sortYear` orders the list */
  years: string;
  sortYear: number;
  category: Category;
  /** A web app (a web front end, usually with its own back end); also listed under "Web apps" */
  webApp?: boolean;
  tech: string[];
  /** A public GitHub repository; its stars and last push are read from the GitHub API */
  repo?: string;
  links?: ProjectLink[];
  media?: Media;
  featured?: boolean;
}

const gh = (path: string) => `https://github.com/${path}`;

export const projects: Project[] = [
  {
    slug: "accessible-find",
    title: "Accessible Find in Page",
    summary:
      "A Ctrl+F replacement for people with low vision: large custom highlights, a magnifier, read-aloud and colour profiles for different eye conditions.",
    details:
      "I'm visually impaired, and the browser's own find made matches hard to spot. Highlights are painted with the CSS Custom Highlight API, so pages and web apps keep working. A shrinking ring, a spotlight and guide lines lead to the current match, every match is listed in large text, and built-in profiles cover cataracts, light sensitivity and colour blindness. Everything works from the keyboard, and screen readers hear the match count.",
    years: "2023 – now",
    sortYear: 2026,
    category: "extension",
    tech: ["TypeScript", "React", "WXT", "Tailwind", "Playwright", "Vitest"],
    repo: gh("bearkillerPT/AccessibleFind-in-page"),
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/accessible-find-in-page/micmgbkeghgbbdmmoieoodhmofafhhlp",
      },
      {
        label: "Firefox Add-ons",
        href: "https://addons.mozilla.org/firefox/addon/accessible-find-in-page/",
      },
      { label: "Demo video", href: "https://www.youtube.com/watch?v=9k-zGguDNWg" },
    ],
    media: {
      type: "image",
      src: "/media/accessible-find.webp",
      alt: "The find bar searching an article for “lighthouse”: every match highlighted in yellow, the current one framed in orange, the rest of the page dimmed and the current match repeated in large text.",
    },
    featured: true,
  },
  {
    slug: "plughere",
    title: "Plug Here",
    summary:
      "Booking and managing electric-vehicle charging in apartment buildings: the website, a TypeScript API on PostgreSQL, and the chargers themselves talking MQTT.",
    details:
      "Residents reserve a shared charger and the station reports its state and energy use over MQTT while the session runs. The whole stack, including always-on charger emulators, runs on the same Raspberry Pi as this site. Launching soon.",
    years: "2023 – 2025",
    sortYear: 2025,
    category: "product",
    webApp: true,
    tech: ["TypeScript", "Node.js", "PostgreSQL", "MQTT", "Vite", "Python"],
    links: [{ label: "plughere.app", href: "https://plughere.app" }],
    media: {
      type: "image",
      src: "/media/plughere.webp",
      alt: "The Plug Here landing page: “Plug anywhere.” in large type on a dark teal background.",
    },
    featured: true,
  },
  {
    slug: "c-its-paper",
    // Non-breaking hyphens (U+2011): "In-" / "Vehicle" split across lines reads badly
    title: "A Modular In\u2011Vehicle C\u2011ITS Architecture",
    summary:
      "Journal paper in MDPI Sensors, picked as an Editor's Choice article: sensor data collection, vehicular communications and cloud connectivity for cooperative intelligent transport systems.",
    details:
      "Written at Instituto de Telecomunicações as part of my master's work, it looks at how a V2X phone app in the car can produce reliable sensor readings. Sensors 2023, 23(3), 1724.",
    years: "2023",
    sortYear: 2023,
    category: "research",
    tech: ["C", "C++", "Python", "MQTT", "React Native", "Expo"],
    links: [
      { label: "Read the paper", href: "https://www.mdpi.com/1424-8220/23/3/1724" },
      { label: "DOI", href: "https://doi.org/10.3390/s23031724" },
    ],
    media: {
      type: "image",
      src: "/media/paper.webp",
      alt: "The paper's title page header on MDPI, listing the authors including Gil Teixeira.",
      fit: "contain",
    },
    featured: true,
  },
  {
    slug: "metin2-bot",
    title: "Metin2 Farm Bot",
    summary:
      "A computer-vision bot that plays from screenshots alone: HSV masks find monsters and health bars, with no code injection or memory reads.",
    details:
      "It handles several game clients at once, solves the in-game captcha with over 95% accuracy using a dataset I collected, and clears the Devil's Tower dungeon on its own. I extended an HSV range calculator to tune the masks from screenshots.",
    years: "2021 – 2025",
    sortYear: 2025,
    category: "bot",
    tech: ["Python", "OpenCV", "PyAutoGUI", "PyDirectInput", "AutoIt"],
    repo: gh("bearkillerPT/metinCV"),
    media: {
      type: "video",
      src: "/media/metin.mp4",
      poster: "/media/metin-poster.webp",
      label: "The bot farming in Metin2",
    },
    featured: true,
  },
  {
    slug: "pokerogue",
    title: "PokeRogue Move Effectiveness",
    summary:
      "A Chrome extension that overlays how effective each of your moves is against the enemy's types, in single and double battles.",
    years: "2025",
    sortYear: 2025,
    category: "extension",
    tech: ["TypeScript", "Chrome Extension"],
    repo: gh("bearkillerPT/pokerogue-move-effectiveness"),
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/pokerogue-move-effectiven/eddppccaklpaijbchhhilfghgnigflco",
      },
      { label: "Demo video", href: "https://www.youtube.com/watch?v=8kV5kMVR6ug" },
    ],
    media: {
      type: "image",
      src: "/media/pokerogue.webp",
      alt: "A PokeRogue battle with the extension's overlay showing the effectiveness of each move.",
    },
  },
  {
    slug: "csgofast",
    title: "CSGOFast HiLo Bot",
    summary:
      "A Python and Playwright bot that claims the free coins and bets them in HiLo with Martingale, Paroli and Kelly-style strategies.",
    details:
      "The balance chart is the honest result: with a 47.5% chance to double, the house still wins.",
    years: "2025",
    sortYear: 2025,
    category: "bot",
    tech: ["Python", "Playwright"],
    repo: gh("bearkillerPT/csgofast-hilo-bot"),
    media: {
      type: "image",
      src: "/media/csgofast.webp",
      alt: "Line chart of the bot's balance over a few days, for three strategies, climbing and then falling back to zero.",
      fit: "contain",
    },
  },
  {
    slug: "nordic-thingy",
    title: "React Native Nordic Thingy",
    summary:
      "A React Native hook that connects to a Nordic Thingy over Bluetooth Low Energy and streams its temperature, humidity, pressure and battery level.",
    years: "2024",
    sortYear: 2024,
    category: "library",
    tech: ["TypeScript", "React Native", "Expo", "Bluetooth LE"],
    repo: gh("bearkillerPT/react-native-nordic-thingy"),
  },
  {
    slug: "dissertation",
    title: "Master's Dissertation: C-ITS Mobile App",
    summary:
      "A React Native app for cooperative intelligent transport systems, written at Instituto de Telecomunicações and graded 18/20.",
    details:
      "The app shows and creates V2X messages (like DENMs) shared over MQTT, and requests services such as tolling and EV charging. Alongside it I implemented an ETSI-layered C++ stack for on-board and roadside units, handling ASN.1 messages for charging-station discovery and reservations, and a multithreaded C broker that translates UPER and XML messages to JSON. Defended in July 2024.",
    years: "2022 – 2024",
    sortYear: 2024,
    category: "research",
    tech: ["React Native", "Expo", "MQTT", "C", "C++", "ASN.1"],
    repo: gh("bearkillerPT/Dissertation"),
    links: [{ label: "Read on Overleaf", href: "https://www.overleaf.com/read/kgnwtrzpwtpt" }],
  },
  {
    slug: "gps-speedometer",
    title: "GPS Speedometer",
    summary:
      "An Expo app that shows your GPS speed in huge, bold numbers, with a focus mode that makes them even bigger, because I couldn't read my car's speedometer on the motorway.",
    years: "2023 – 2024",
    sortYear: 2024,
    category: "product",
    tech: ["React Native", "Expo", "TypeScript"],
    repo: gh("bearkillerPT/gps-speedometer"),
    media: {
      type: "image",
      src: "/media/gps-speedometer.webp",
      alt: "The app in landscape: “0 Km/h” in huge white text beside a round speedometer gauge.",
    },
  },
  {
    slug: "nielsen-heuristics",
    title: "Nielsen Heuristics Graph",
    summary:
      "A Python script that parses the results of a Nielsen heuristic evaluation and draws the classic evaluators-versus-problems matrix.",
    years: "2023 – 2024",
    sortYear: 2024,
    category: "university",
    tech: ["Python"],
    repo: gh("bearkillerPT/NielsenHeuristicsGraph"),
    media: {
      type: "image",
      src: "/media/nielsen-heuristics.webp",
      alt: "A matrix of evaluators against usability problems, with the problems each evaluator found shaded in black.",
      fit: "contain",
    },
  },
  {
    slug: "pokemmo-bot",
    title: "PokeMMO Farm Bot",
    summary:
      "An OpenCV and PyAutoGUI bot that farms PokeMMO for hours and sends a Gotify notification when it needs a human.",
    years: "2022 – 2023",
    sortYear: 2023,
    category: "bot",
    tech: ["Python", "OpenCV", "PyAutoGUI", "AutoIt", "Tesseract"],
    repo: gh("bearkillerPT/pokeMMOFarmBoye"),
    media: {
      type: "video",
      src: "https://github.com/bearkillerPT/pokeMMOFarmBoye/raw/main/pokemmo8x.mp4",
      poster: "/media/pokemmo-poster.webp",
      label: "The bot battling in PokeMMO, at 8× speed",
    },
  },
  {
    slug: "rtos",
    title: "Real-Time Operating Systems",
    summary:
      "Real-time programming with pthreads, Xenomai and Zephyr, ending in a walking-robot project with Python scripts that render its gait.",
    years: "2022 – 2023",
    sortYear: 2023,
    category: "university",
    tech: ["C", "Zephyr", "Xenomai", "pthreads", "Python"],
    repo: gh("bearkillerPT/RTOS"),
  },
  {
    slug: "high-performance-systems",
    title: "High Performance Systems",
    summary:
      "A parallel encoder and decoder for an [8,4,4] Hadamard code in VHDL, and tuning CUDA launch configurations for a matrix-ordering kernel.",
    years: "2022 – 2023",
    sortYear: 2023,
    category: "university",
    tech: ["VHDL", "CUDA", "C"],
    repo: gh("bearkillerPT/High-Performance-Systems"),
  },
  {
    slug: "data-mining",
    title: "Data Mining",
    summary:
      "Six machine-learning models for stroke prediction, from a Jupyter notebook to a Flask API and a React app that queries them.",
    years: "2022 – 2023",
    sortYear: 2023,
    category: "university",
    webApp: true,
    tech: ["Python", "Jupyter", "scikit-learn", "Flask", "React"],
    repo: gh("bearkillerPT/DataMining"),
    links: [{ label: "Live demo", href: "https://ed.bearkillerpt.xyz/" }],
    media: {
      type: "image",
      src: "/media/data-mining.webp",
      alt: "The web app's form of patient attributes for stroke prediction, above the project report.",
    },
  },
  {
    slug: "heaboo-esp32",
    title: "Heaboo ESP32 Firmware",
    summary:
      "ESP32 firmware for a Heaboo, Lda project: a Wi-Fi access point for setup, Modbus readings and temperatures sent to a server, and updates pushed from the API.",
    years: "2022",
    sortYear: 2022,
    category: "freelance",
    tech: ["C", "C++", "ESP32", "Arduino", "Modbus", "Node.js", "Express"],
    media: {
      type: "image",
      src: "/media/heaboo-esp32.webp",
      alt: "The firmware's web interface listing tank temperatures with calibrate buttons.",
      fit: "contain",
    },
  },
  {
    slug: "auditwaiting",
    title: "Audit Waiting",
    summary:
      "Audits domestic hot-water circuits: draw the installation in a KonvaJS editor and get the waiting time and wasted water for every room in the final report.",
    years: "2022",
    sortYear: 2022,
    category: "freelance",
    webApp: true,
    tech: ["TypeScript", "React", "KonvaJS", "Node.js", "Express", "MariaDB"],
    media: {
      type: "image",
      src: "/media/auditwaiting.webp",
      alt: "A hot-water network drawn as connected segments, above a table of waiting times per segment.",
    },
  },
  {
    slug: "large-scale-computations",
    title: "Large Scale Computations",
    summary:
      "Word counting and Gauss-Jordan matrix determinants, each written single-threaded in C and then made concurrent with pthreads, MPI and CUDA.",
    years: "2022",
    sortYear: 2022,
    category: "university",
    tech: ["C", "pthreads", "MPI", "CUDA"],
    repo: gh("bearkillerPT/CLE"),
    media: {
      type: "image",
      src: "/media/cle.webp",
      alt: "Terminal output listing each matrix's determinant and the elapsed time.",
    },
  },
  {
    slug: "auchan2list",
    title: "Auchan2List",
    summary:
      "A Chrome extension that exports and imports Auchan shopping carts, so a basket can be shared or reused.",
    years: "2022",
    sortYear: 2022,
    category: "extension",
    tech: ["JavaScript", "Chrome Extension"],
    repo: gh("bearkillerPT/Auchan-CartList"),
    links: [
      {
        label: "Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/auchan2list/nhooimeiofnpmihcdphbdoblnfebclon",
      },
    ],
    media: {
      type: "video",
      src: "https://github.com/bearkillerPT/Auchan-CartList/raw/main/Auchan2ListDemo.mp4",
      poster: "/media/auchan-poster.webp",
      label: "Exporting and importing an Auchan cart",
    },
  },
  {
    slug: "technical-ceramics",
    title: "Technical Ceramics Manufacturing",
    summary:
      "An information-visualisation site that relates manufacturing parameters of technical ceramics to production yield, with charts built in D3.js.",
    years: "2021 – 2022",
    sortYear: 2022,
    category: "university",
    webApp: true,
    tech: ["React", "D3.js", "JavaScript"],
    repo: gh("bearkillerPT/IV/tree/main/technical_ceramics"),
    links: [{ label: "Live site", href: "https://iv.bearkillerpt.xyz/" }],
    media: {
      type: "image",
      src: "/media/technical-ceramics.webp",
      alt: "A chart linking manufacturing parameters to production yield.",
    },
  },
  {
    slug: "log-my-work",
    title: "Log My Work",
    summary:
      "iOS, Android and web app for logging employees' production hours, used to award production bonuses. My first freelance project.",
    years: "2021",
    sortYear: 2021,
    category: "freelance",
    webApp: true,
    tech: ["React Native", "Expo", "TypeScript", "Firebase"],
    repo: gh("bearkillerPT/heaboo_log_my_work"),
    links: [{ label: "Web app", href: "https://heaboo.bearkillerpt.xyz/" }],
    media: {
      type: "video",
      src: "https://raw.githubusercontent.com/bearkillerPT/heaboo_log_my_work/main/demos/fullDemo.mp4",
      poster: "/media/log-my-work-poster.webp",
      label: "A walkthrough of the Log My Work app",
    },
  },
  {
    slug: "facade-estimates",
    title: "T&T Facade Estimates",
    summary:
      "A Tkinter desktop app that estimates the solar panels, A/C units and heat pumps a building's facade needs.",
    years: "2020 – 2021",
    sortYear: 2021,
    category: "freelance",
    tech: ["Python", "Tkinter"],
    repo: gh("bearkillerPT/App-Or-amentos-Fachada"),
    media: {
      type: "video",
      src: "https://raw.githubusercontent.com/bearkillerPT/App-Or-amentos-Fachada/master/fachada/demos/demo.mp4",
      poster: "/media/fachada-poster.webp",
      label: "Adding rooms to a facade estimate",
    },
  },
  {
    slug: "symbolearn",
    title: "SymboLearn",
    summary: "A website to learn and practise symbolic languages, built with a friend.",
    years: "2021",
    sortYear: 2021,
    category: "university",
    webApp: true,
    tech: ["Angular", "JavaScript", "Firebase"],
    repo: gh("Unn4m3DD/symbolearn"),
    media: {
      type: "video",
      src: "https://raw.githubusercontent.com/Unn4m3DD/symbolearn/master/demo.mp4",
      poster: "/media/symbolearn-poster.webp",
      label: "Practising symbols in SymboLearn",
    },
  },
  {
    slug: "sofs20",
    title: "sofs20 File System",
    summary:
      "A small Unix-style file system in C++, mounted through FUSE, for the Operating Systems course.",
    years: "2021",
    sortYear: 2021,
    category: "university",
    tech: ["C++", "FUSE", "CMake"],
    repo: gh("bearkillerPT/sofs20"),
  },
  {
    slug: "sokoban-ai",
    title: "Sokoban AI",
    summary: "An agent that plays Sokoban on its own, for the Artificial Intelligence course.",
    years: "2021",
    sortYear: 2021,
    category: "university",
    tech: ["Python"],
    repo: gh("bearkillerPT/sokoban-ai"),
  },
  {
    slug: "bdl",
    title: "Board Description Language",
    summary:
      "Two languages built with ANTLR4 in Java that compile to JavaScript: BDL describes board games, and ABDL writes bots that play them.",
    years: "2020",
    sortYear: 2020,
    category: "university",
    tech: ["Java", "ANTLR4", "JavaScript"],
    repo: gh("bearkillerPT/Board-Description-Language_and_ABDL"),
    links: [{ label: "Chess demo", href: "https://bdl.bearkillerpt.xyz/" }],
    media: {
      type: "video",
      src: "https://raw.githubusercontent.com/Unn4m3DD/xadrez-para-cegos/master/demo.mp4",
      poster: "/media/bdl-poster.webp",
      label: "A game of chess described in BDL",
    },
  },
  {
    slug: "raspberry-pi",
    title: "Raspberry Pi Home Server",
    summary:
      "Everything my Raspberry Pi 4b runs, as a NixOS flake: this site, Plug Here, Nextcloud, Gotify and the old project demos, with Let's Encrypt, sops secrets and a VM test that boots it all.",
    details:
      "It started in 2021 as nginx and systemd configs on a Raspberry Pi 2B. The Pi now rebuilds itself from this repository.",
    years: "2021 – now",
    sortYear: 2026,
    category: "library",
    tech: ["NixOS", "Nix", "nginx", "systemd", "sops"],
    repo: gh("bearkillerPT/raspberryConfs"),
  },
];
