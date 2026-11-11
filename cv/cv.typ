// The CV, served at /cv.pdf. Template: brilliant-cv (typst.app/universe/package/brilliant-cv).
// The content is build/data.json, written by scripts/cv-data.ts from the site's own data (plus
// src/data/cv.ts). Build it with `bun run cv` inside `nix develop`.
// Its hidden-text "ATS/AI injection" is deliberately not configured: hidden keywords are keyword
// stuffing, and screen readers would read them out of a tagged PDF.
#import "@preview/brilliant-cv:4.0.1": cv, cv-entry, cv-section, cv-skill, h-bar

#let data = json("build/data.json")
#let (first, ..rest) = data.name.split(" ")

#let metadata = (
  header_quote: data.headline + " · React, TypeScript, Python, Node.js",
  cv_footer: "Curriculum vitae",
  letter_footer: "",
  layout: (
    awesome_color: "#1f4e79",
    before_section_skip: "1pt",
    before_entry_skip: "1pt",
    before_entry_description_skip: "1pt",
    paper_size: "a4",
    date_width: "3.6cm",
    fonts: (regular_fonts: ("Source Sans 3",), header_font: "Roboto"),
    header: (
      header_align: "left",
      display_profile_photo: true,
      profile_photo_radius: "50%",
      info_font_size: "10pt",
    ),
    entry: (display_entry_society_first: true, display_logo: false),
    section: (title_highlight: "first-letters", title_highlight_letters: 3),
    footer: (display_page_counter: true, display_footer: true),
  ),
  personal: (
    first_name: first,
    last_name: rest.join(" "),
    info: (
      email: data.email,
      homepage: data.site,
      github: data.github,
      linkedin: data.linkedin,
      location: data.location,
    ),
  ),
)

#show: cv.with(metadata, profile-photo: image("photo.jpg", alt: "Photo of " + data.name))

#set document(title: data.name + " · CV")

#cv-section("Summary")
#data.summary

#cv-section("Experience")
#for job in data.experience {
  cv-entry(
    society: job.company,
    title: job.role,
    date: job.dates,
    location: "",
    description: list(job.summary),
    tags: job.tech,
  )
}

#cv-section("Projects")
#for project in data.projects {
  cv-entry(
    society: if project.url != "" { link(project.url, project.name) } else { project.name },
    title: project.tech.slice(0, calc.min(3, project.tech.len())).join(" · "),
    date: project.years,
    location: "",
    description: list(project.summary),
  )
}

#cv-section("Open Source")
#for pr in data.contributions {
  cv-entry(
    society: link(pr.href, pr.repo),
    title: pr.title,
    date: str(pr.year),
    location: if pr.status == "merged" { "Merged" } else { "Open" },
    description: if pr.note != "" { list(pr.note) } else { "" },
  )
}

#cv-section("Publications")
#for paper in data.publications {
  cv-entry(
    society: link(paper.url, paper.venue),
    title: paper.title,
    date: paper.year,
    location: "",
    description: list(paper.authors),
  )
}

#cv-section("Education")
#for entry in data.education {
  cv-entry(
    society: entry.place,
    title: entry.title,
    date: entry.years,
    location: "",
    description: if entry.note != "" { list(entry.note) } else { "" },
  )
}

#cv-section("Skills")
#for group in data.skills {
  cv-skill(type: group.type, info: group.items.join(" " + h-bar() + " "))
}
#cv-skill(type: "Languages", info: data.languages.join(" " + h-bar() + " "))
