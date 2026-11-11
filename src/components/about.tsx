import { ArrowUpRight, FileDown, Mail, Play } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { education, music, profile } from "@/data/profile";

export function About() {

  return (
    <Section id="about" number="05" title="About">
      <div className="grid gap-12 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
        {/* Phones already saw the photo in the intro; wider screens keep it in view beside the text */}
        <div className="hidden md:block">
          <img
            src="/media/gil.webp"
            alt="Gil, smiling, with curly hair and a short beard."
            width={720}
            height={960}
            loading="lazy"
            decoding="async"
            className="aspect-3/4 w-full max-w-72 rounded-xl border-2 border-foreground object-cover md:sticky md:top-28"
          />
        </div>

        <div className="flex max-w-3xl flex-col gap-6 text-xl leading-relaxed">
          <p>
            Most of my day goes into web apps, from the interface down to the database. Outside work, I
            like making the computer do the boring parts: bots written with Playwright, OpenCV and
            PyAutoGUI, and browser extensions for the sites I use most.
          </p>
          <p>
            I have retinitis pigmentosa, a degenerative eye condition that severely affects my vision.
            That's where Accessible Find in Page came from, and why this site uses large,
            high-contrast text.
          </p>
          <p>
            Before web apps I spent a lot of time closer to the hardware: I built a five-stage
            pipelined MIPS CPU in VHDL and ran it on an FPGA, wrote ESP32 and Zephyr firmware as a
            freelancer, and worked on C and C++ vehicular-communication stacks for my master's.
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
                <a href={`mailto:${profile.email}`}>
                  <Mail aria-hidden="true" />
                  Email me
                </a>
              </Button>
            </li>
            <li>
              <Button asChild size="lg" variant="outline">
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
