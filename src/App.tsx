import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  Chip,
  ThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  FormControl,
  Select,
  MenuItem,
  CardActionArea,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { GithubProject, Project_t, Translation_t, language_t } from "./Types";
import { languages } from './languages';
import { darkTheme, lightTheme } from "./themes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Lightbulb } from "@mui/icons-material";
import { grey, indigo } from "@mui/material/colors";

const projectsHeaderTranslation: Translation_t = {
  en: "If a project repository is set to private or no repository is provided, no creation date will be shown.",
  pt: "Se o repositório do projeto estiver definido como privado ou nenhum repositório for fornecido, nenhuma data de criação será exibida.",
};

const ProjectCard = ({ project,
  theme,
  language,
  githubProjects
}: {
  project: Project_t,
  theme: string,
  language: language_t
  githubProjects: GithubProject[]
},
) => {
  const { image, video, url, title, subtitle, types, technologies, repo } =
    project;

  const last_update_translation: Translation_t = {
    en: "Last update",
    pt: "Última atualização",
  };

  // if a technology is of type "tech1, tech2, ..." then it will be split into an array of tech1, tech2, ... 
  // and the original technology will not be included
  // and withouth changing the original array
  const splitTags = (technologies: string[]) => {
    const newTechnologies = [...technologies];
    technologies.forEach((tech, index) => {
      if (tech.includes(",")) {
        const splittedTech = tech.split(",");
        newTechnologies.splice(index, 1, ...splittedTech);
      }
    });
    return newTechnologies;
  };
  const technologiesArray = splitTags(technologies || []);
  const typesArray = splitTags(types || []);
  let date_created = githubProjects.find((githubProject) => {
    return githubProject.html_url === repo
  })?.created_at
  return (
    <Card
      sx={{ position: "relative", height: "100%" }}
    >
      {video && (
        <video loop autoPlay muted controls style={{
          height: "200px",
        }}>
          <source src={video} type="video/mp4" />
        </video>
      )}
      {image && (
        <CardMedia component={"img"} src={image} height="200" />
      )}
      <CardContent sx={{
        paddingBottom: 5,
      }}>
        <Typography gutterBottom fontWeight="bold" variant="h5" component="div" color="text.primary">
          {title[language]}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {subtitle[language]}
        </Typography>
        <Box sx={{ py: 2 }}>
          <Box>
            {typesArray?.filter((type) => type !== "All").sort().map((type, index) => (
              <Chip
                key={index}
                label={type}
                sx={{ mr: 1, mb: 1 }}
                color={"secondary"}
              />
            ))}
          </Box>
          <Box>
            {technologiesArray?.filter((tech) => tech !== "All").sort().map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                sx={{ mr: 1, mb: 1 }}
                color={"default"}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {date_created ? (
          <Box>
          <Typography variant="body2" color="text.primary" paddingLeft={"2rem"} flex={1} sx={{
            fontWeight: "bold",
          }}>
            {last_update_translation[language]}: 
          </Typography>
          <Typography variant="body2" color="text.primary" paddingLeft={"2rem"} flex={1}>
            {new Date(date_created).toLocaleDateString()}
          </Typography>
          </Box>) : (
          <Typography variant="body2" color="text.primary" paddingLeft={"5%"} flex={1}>

          </Typography>

        )
        }
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {repo && (
            <Tooltip title="GitHub Repository">
              <IconButton
                href={repo}
                target="_blank"
                size="large"
                color="secondaryButton"
                sx={{ ml: 1 }}
              >
                <GitHubIcon sx={{ width: "2rem", height: "2rem" }} />
              </IconButton>
            </Tooltip>
          )}
          {url && (
            <Button
              href={url}
              target="_blank"
              size="small"
              color="secondaryButton"
              variant="contained"
              sx={{
                mr: 1,
                color: "white",
                height: "2rem",
              }}
            >
              {languages.project.websiteButton[language]}
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
};


const App = () => {
  const [projects, setProjects] = useState<Project_t[]>([])
  const [githubProjects, setGithubProjects] = useState<GithubProject[]>([])
  const [language, setLanguage] = useState<"pt" | "en">("en");
  const [theme, setTheme] = useState("dark");
  const [filteredProjects, setFilteredProjects] = useState<Project_t[]>(projects);
  const [filterTechnology, setFilterTechnology] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [techFilterExpanded, setTechFilterExpanded] = useState(false);
  const [typeFilterExpanded, setTypeFilterExpanded] = useState(false);
  useEffect(() => {
    // Fetch the projects from my github hosted json file
    fetch('https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/projects.json')
      .then((res) => res.json())
      .then((res: Project_t[]) => {
        // Set the type of the technologies and types to include All
        const technologies = res.flatMap((project) => project.technologies ? ["All", ...project.technologies] : ["All"])
        const types = res.flatMap((project) => project.types ? ["All", ...project.types] : ["All"])
        const technologiesSet = Array.from(new Set(technologies));
        const typesSet = Array.from(new Set(types));
        const uniqueTechnologies = technologiesSet.filter((tech) => {
          let count = 0;
          technologies.forEach((tech2) => {
            if (tech === tech2) count++;
          });
          return count === 1;
        });
        const uniqueTypes = typesSet.filter((type) => {
          let count = 0;
          types.forEach((type2) => {
            if (type === type2) count++;
          }
          );
          return count === 1;
        });
        res.forEach((project: Project_t) => {
          if (!project.technologies) project.technologies = [];
          if (!project.types) project.types = [];
          let isolatedTechnologies = project.technologies?.filter((tech) => uniqueTechnologies.includes(tech));
          let isolatedTypes = project.types?.filter((type) => uniqueTypes.includes(type));
          if (isolatedTechnologies.length > 1) {
            // Remove the isolated technologies from the project's technologies
            project.technologies = project.technologies?.filter((tech) => !isolatedTechnologies.includes(tech));
            // Add the isolated technologies to the project's technologies
            project.technologies = [isolatedTechnologies.join(', '), ...project.technologies ?? []];
          }
          if (isolatedTypes.length > 1) {
            // Remove the isolated types from the project's types
            project.types = project.types?.filter((type) => !isolatedTypes.includes(type));
            // Add the isolated types to the project's types
            project.types = [isolatedTypes.join(', '), ...project.types ?? []];
          }

          project.technologies?.push("All");
          project.types?.push("All");
        })
        setProjects(res);
        setFilteredProjects(res);
      })

    // Fetch the projects from the github api
    fetch('https://api.github.com/users/bearkillerPT/repos')
      .then((res) => res.json()).then((res: GithubProject[]) => {
        setGithubProjects(res);
      }).catch((err) => {
        console.log(err);
      })
  }, [])
  const handleLanguageChange = (event: any) => {
    setLanguage(event.target.value);
  };

  const handleThemeChange = (event: any) => {
    setTheme(event.target.value);
  };

  const filterTechnologyAndType = (tech: string, type: string) => {
    if (tech === "All" && type === "All") {
      return projects;
    } else if (tech === "All") {
      return projects.filter((project) => project.types?.includes(type));
    } else if (type === "All") {
      return projects.filter((project) =>
        project.technologies?.includes(tech)
      );
    } else {
      return [...projects.filter(
        (project) =>
          project.technologies?.includes(tech) &&
          project.types?.includes(type)
      )]
    }
  }

  const handleFilterTechnology = (tech: string) => {
    setFilterTechnology(tech);
    setFilteredProjects(filterTechnologyAndType(tech, filterType))
  };

  const handleFilterType = (type: string) => {
    setFilterType(type);
    setFilteredProjects(filterTechnologyAndType(filterTechnology, type))
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Box bgcolor={"background.default"} height={"100%"}>
        <AppBar position="static">
          <Toolbar>
            <Box height={"5rem"} sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
              <Typography variant="h6" fontWeight={'bold'} textAlign={"center"} sx={{ flexGrow: 1 }}>
                BearkillerPT
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Lightbulb />
                <FormControl>
                  <Select
                    value={theme}
                    onChange={handleThemeChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                      sx: {
                        "&& .Mui-selected": {
                          backgroundColor: "primary"
                        },
                        "&& .MuiPaper-root": {
                          backgroundColor: "primary",
                        },
                      }
                    }}
                    sx={{
                      color: "white",
                      '.MuiSvgIcon-root ': {
                        fill: "white !important",
                      }
                    }}
                  >
                    <MenuItem value={"light"} sx={{}}>{languages.themes.light[language]}</MenuItem>
                    <Box sx={{ py: .2 }}></Box>
                    <MenuItem value={"dark"} sx={{}}>{languages.themes.dark[language]}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ mr: 2 }}>
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                      sx: {
                        "&& .Mui-selected": {
                          backgroundColor: "primary"
                        },
                        "&& .MuiPaper-root": {
                          backgroundColor: "primary",
                        },
                      }
                    }}
                    sx={{
                      color: "white",
                      '.MuiSvgIcon-root ': {
                        fill: "white !important",
                      }
                    }}
                  > <MenuItem value={"en"} sx={{}}>{languages.languages.english[language]}</MenuItem>
                    <Box sx={{ py: .2 }}></Box>
                    <MenuItem value={"pt"} sx={{}}>{languages.languages.portuguese[language]}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box bgcolor={"background.default"}>
          <Box p={2} bgcolor={"background.paper"} display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignContent={"center"} justifyContent={"center"}>
            <Box >
              <Box
                component="img"
                sx={{
                  height: 233,
                  maxHeight: { xs: 233, md: 167 },
                }}
                alt="The house from the offer."
                src="https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/meImg.png"
              />

              <Typography variant="subtitle1" fontWeight={"bold"} color="text.primary" sx={{ marginBottom: 1 }}>
                Gil Teixeira
              </Typography>
            </Box>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: '90rem',
              height: 'auto',
            }}>
              <Typography variant="subtitle1" color="text.primary" p={2} sx={{
                marginBottom: 1,
                backgroundColor: grey[theme === 'light' ? 300 : 700]
              }}>
                {languages.aboutMeLeft[language]} {languages.aboutMeRight[language]}
              </Typography>
              <Typography variant="subtitle1" color="text.primary" p={2} sx={{
                marginBottom: 1,
                backgroundColor: grey[theme === 'light' ? 300 : 700]
              }}>
                {languages.checkCurriculum[language]}
              </Typography>
              <Button
                variant="contained"
                color="secondaryButton"
                href="https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/Curriculo.pdf"
                target="_blank"
                autoCapitalize="none"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: indigo[700],
                    color: 'white',
                  },
                }}>
                {languages.curriculum.download[language]}
              </Button>
            </Box>
          </Box>

          <Box bgcolor={"background.paper"}>
            <Box sx={{ display: 'flex', mb: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ mr: 2, width: "6rem" }} color="text.primary">
                {languages.filters[language] + languages.filters.tech[language]}:
              </Typography>
              <Accordion
                sx={{ width: "100%" }}
                onChange={() => { setTechFilterExpanded(!techFilterExpanded) }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{
                    color: theme === 'light' ? 'black' : 'white'
                  }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{techFilterExpanded ? languages.filters.hide_all[language] : languages.filters.show_all[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.from(
                    new Set(
                      filteredProjects
                        .flatMap((project) => project.technologies ?? [])
                        .sort((tech1, tech2) => projects.filter((project) => project.technologies?.includes(tech1)).length - projects.filter((project) => project.technologies?.includes(tech2)).length)
                        .reverse()
                    )
                  ).map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech + " (" + projects.filter((project) => project.technologies?.includes(tech)).length + ")"}
                      onClick={() => handleFilterTechnology(tech)}
                      sx={{ mr: 1, mb: 1 }}
                      color={tech === filterTechnology ? "secondary" : "default"}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box sx={{
              width: "100%",
              height: "5px",
              backgroundColor: 'background.default',

            }} />
            <Box sx={{ display: 'flex', mb: 2, p: 2 }}>
              <Typography variant="subtitle1" sx={{ mr: 2, width: "6rem" }} color="text.primary">
                {languages.filters[language] + languages.filters.type[language]}:
              </Typography>
              <Accordion
                sx={{ width: "100%" }}
                onChange={() => setTypeFilterExpanded(!typeFilterExpanded)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{
                    color: theme === 'light' ? 'black' : 'white'
                  }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <Typography>{typeFilterExpanded ? languages.filters.hide_all[language] : languages.filters.show_all[language]}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.from(
                    new Set(
                      filteredProjects
                        .flatMap((project) => project.types ? ["All", ...project.types] : [])
                        .sort((type1, type2) =>
                          projects.filter((project) => project.types?.includes(type1)).length - projects.filter((project) => project.types?.includes(type2)).length)
                        .reverse()
                        .map((type) => type)
                    )
                  ).map((type, index) => (
                    <Chip
                      key={index}
                      label={type + " (" + filteredProjects.filter((project) => project.types?.includes(type)).length + ")"}
                      onClick={() => handleFilterType(type)}
                      sx={{ mr: 1, mb: 1 }}
                      color={type === filterType ? "secondary" : "default"}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Typography sx={{
              p: 1,
              paddingLeft: "1rem",
            }} color="text.primary">
            {projectsHeaderTranslation[language]}
            </Typography>
          </Box>
          <Grid sx={{ p: 2 }} container spacing={2} flexGrow={1} bgcolor={"background.default"}>
            {filteredProjects.map((project, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProjectCard project={project} theme={theme} language={language} githubProjects={githubProjects} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;