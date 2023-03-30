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
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Project_t, language_t } from "./Types";
import { languages } from './languages';
import { darkTheme, lightTheme } from "./themes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Lightbulb } from "@mui/icons-material";

const ProjectCard = ({ project,
  theme,
  language }: {
    project: Project_t,
    theme: string,
    language: language_t
  }) => {
  const { image, video, url, title, subtitle, types, technologies, repo } =
    project;
  console.log(language);
  return (
    <Card
      sx={{ position: "relative", height: "100%" }}
    >
      {video && (
        <CardMedia component={"video"} src={video} height="200" />
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
            {types?.sort().map((type, index) => (
              <Chip
                key={index}
                label={type}
                sx={{ mr: 1, mb: 1 }}
                color={"secondary"}
              />
            ))}
          </Box>
          <Box>
            {technologies?.sort().map((tech, index) => (
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
        }}
      >
        <Box>
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
              }}
            >
              {languages.project.websiteButton[language]}
            </Button>
          )}
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
        </Box>
      </CardActions>
    </Card>
  );
};


const App = () => {
  const [projects, setProjects] = useState<Project_t[]>([])
  const [language, setLanguage] = useState<"pt" | "en">("en");
  const [theme, setTheme] = useState("dark");
  const [filteredProjects, setFilteredProjects] = useState<Project_t[]>(projects);
  const [filterTechnology, setFilterTechnology] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [techFilterExpanded, setTechFilterExpanded] = useState(false);
  const [typeFilterExpanded, setTypeFilterExpanded] = useState(false);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/projects.json')
      .then((res) => res.json())
      .then((res) => {
        setProjects(res);
        setFilteredProjects(res);
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
                <Lightbulb/>
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
                      projects
                        .flatMap((project) => project.technologies ? ["All", ...project.technologies] : [])
                        .map((tech) => tech)
                    )
                  ).map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
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
                      projects
                        .flatMap((project) => project.types ? ["All", ...project.types] : [])
                        .map((type) => type)
                    )
                  ).map((type, index) => (
                    <Chip
                      key={index}
                      label={type}
                      onClick={() => handleFilterType(type)}
                      sx={{ mr: 1, mb: 1 }}
                      color={type === filterType ? "secondary" : "default"}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
          <Grid sx={{ p: 2 }} container spacing={2} flexGrow={1} bgcolor={"background.default"}>
            {filteredProjects.map((project, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProjectCard project={project} theme={theme} language={language} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;