export interface Project_t {
    title: Translation;
    subtitle: Translation;
    repo: string | undefined;
    url: string | undefined;
    image: string | undefined;
    video: string | undefined;
    types: string[] | undefined;
    technologies: string[] | undefined;
}

interface Translation {
    en: string;
    pt: string;
}