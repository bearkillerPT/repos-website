import { Section } from "@/components/section";
import { experience, type Job } from "@/data/profile";
import { useNow } from "@/hooks/use-now";

const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function parseMonth(month: string) {
  const [year, index] = month.split("-").map(Number);
  return { year, index };
}

const formatMonth = (month: string) => {
  const { year, index } = parseMonth(month);
  return monthYear.format(new Date(year, index - 1));
};

/** "2 yrs 9 mos", counting both the first and the last month, like LinkedIn */
function duration({ start, end }: Job, now: Date) {
  const from = parseMonth(start);
  const to = end ? parseMonth(end) : { year: now.getFullYear(), index: now.getMonth() + 1 };
  const months = (to.year - from.year) * 12 + (to.index - from.index) + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return [
    years > 0 && `${years} ${years === 1 ? "yr" : "yrs"}`,
    rest > 0 && `${rest} ${rest === 1 ? "mo" : "mos"}`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Experience() {
  const now = useNow();
  return (
    <Section id="experience" number="02" title="Experience">
      <ol className="border-t-2 border-foreground">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.start}`}
            className="grid gap-x-8 gap-y-2 border-b-2 py-8 md:grid-cols-[13rem_minmax(0,1fr)]"
          >
            <p className="font-mono text-base text-muted-foreground md:pt-1.5">
              <span className="whitespace-nowrap">
                <time dateTime={job.start}>{formatMonth(job.start)}</time> –{" "}
                {job.end ? <time dateTime={job.end}>{formatMonth(job.end)}</time> : "now"}
              </span>
              <span className="block">{duration(job, now)}</span>
            </p>
            <div className="flex max-w-3xl flex-col gap-3">
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                {job.role} <span className="font-normal">at</span>{" "}
                <a
                  href={job.href}
                  // Hyphenated names ("A-to-Be") would break at the hyphens; long ones need to wrap
                  className={`${job.company.includes("-") ? "whitespace-nowrap " : ""}rounded-sm underline decoration-2 underline-offset-4 hover:decoration-highlight-frame`}
                >
                  {job.company}
                </a>
              </h3>
              {job.summary && <p className="text-lg leading-relaxed">{job.summary}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
