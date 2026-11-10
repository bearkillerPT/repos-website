import { ArrowUpRight, FileDown, Play } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { education, music, profile } from "@/data/profile";

export function About() {
  return (
    <Section id="about" number="05" title="About">
      <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          <img
            src="/media/gil.webp"
            alt="Gil, smiling, with curly hair and a short beard."
            width={720}
            height={960}
            loading="lazy"
            decoding="async"
            className="aspect-3/4 w-full max-w-72 rounded-xl border-2 border-foreground object-cover"
          />
        </div>

        <div className="flex max-w-3xl flex-col gap-6 text-xl leading-relaxed">
          <p>
            I'm Gil, a software engineer from Portugal. Most of my work is web apps: React or React
            Native (with Expo) up front, and Node.js or Python behind it.
          </p>
          <p>
            What I enjoy most is automating things. I write bots with Playwright, OpenCV and
            PyAutoGUI to take over repetitive work, and browser extensions that fix the sites I use.
          </p>
          <p>
            I have retinitis pigmentosa, a degenerative eye condition that severely affects my
            vision. It's why I built Accessible Find in Page, which I use every day, and why this
            site has large, high-contrast text set in Atkinson Hyperlegible, a typeface designed for
            low-vision readers.
          </p>
          <p>
            For my master's at Instituto de Telecomunicações I built a React Native app for
            cooperative intelligent transport systems. Along the way I added the Android light
            sensor to Expo, implemented an ETSI-layered stack in C++ for on-board and roadside units,
            and wrote a compiler from UPER and XML messages to JSON.
          </p>
          <p>
            I've gone lower level too: I built a five-stage pipelined MIPS CPU in VHDL and ran it on
            an FPGA, and I've freelanced on ESP32 and Zephyr RTOS firmware, with Wi-Fi setup from a
            phone, sensors, control circuits and MQTT.
          </p>

          <h3 className="mt-6 text-2xl font-bold tracking-tight">Education</h3>
          <ul className="flex flex-col border-t-2 border-foreground">
            {education.map((entry) => (
              <li
                key={entry.title}
                className="grid gap-x-8 gap-y-1 border-b-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <p className="font-mono text-base text-muted-foreground sm:pt-1">{entry.years}</p>
                <div>
                  <p className="font-bold">{entry.title}</p>
                  <p className="text-lg text-muted-foreground">
                    {entry.place}
                    {entry.note && <>. {entry.note}</>}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-2xl font-bold tracking-tight">Off the keyboard</h3>
          <p>
            Mostly music. Besides the violin, I love playing guitar, mostly classical and fingerstyle
            pieces.
          </p>
          <ul className="grid gap-6 sm:grid-cols-2">
            {music.map((video) => (
              <li key={video.href} className="flex">
                <a
                  href={video.href}
                  className="group flex w-full flex-col overflow-hidden rounded-xl border-2 border-foreground/15 bg-card transition-colors hover:border-foreground"
                >
                  <span className="relative block aspect-video bg-muted">
                    <img
                      src={video.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-highlight py-1.5 pr-4 pl-3 text-base font-bold text-highlight-foreground"
                    >
                      <Play className="size-4 fill-current" aria-hidden="true" />
                      YouTube
                    </span>
                  </span>
                  <span className="flex flex-col gap-1 p-5">
                    <span className="font-mono text-sm text-muted-foreground">{video.year}</span>
                    <span className="text-xl font-bold group-hover:underline">
                      {video.title}
                      <span className="sr-only">, on YouTube</span>
                    </span>
                    <span className="text-base text-muted-foreground">{video.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-lg">
            <a
              href={profile.youtube}
              className="inline-flex items-center gap-1 rounded-sm font-semibold underline decoration-2 underline-offset-4 hover:decoration-highlight-frame"
            >
              More on my YouTube channel
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          </p>

          <ul className="mt-6 flex flex-wrap gap-3">
            <li>
              <Button asChild size="lg" variant="highlight">
                <a href={profile.cv}>
                  <FileDown aria-hidden="true" />
                  Download my CV<span className="sr-only"> (PDF)</span>
                </a>
              </Button>
            </li>
            <li>
              <Button asChild size="lg" variant="outline">
                <a href={profile.github}>
                  <GitHubIcon className="size-5" />
                  GitHub
                </a>
              </Button>
            </li>
            <li>
              <Button asChild size="lg" variant="outline">
                <a href={profile.linkedin}>
                  <LinkedInIcon className="size-5" />
                  LinkedIn
                </a>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
