export interface Project_t {
    title: Translation_t;
    subtitle: Translation_t;
    repo: string | undefined;
    url: string | undefined;
    image: string | undefined;
    video: string | undefined;
    types: string[] | undefined;
    technologies: string[] | undefined;
}

export type language_t = "pt" | "en"

interface Translation_t {
    en: string;
    pt: string;
}