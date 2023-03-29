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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Project_t } from "./Types";
import { languages } from './languages';
import { darkTheme, lightTheme } from "./themes";

const ProjectCard = ({ project }: { project: Project_t }) => {
  const { image, video, url, title, subtitle, types, technologies, repo } =
    project;

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
        <Typography gutterBottom variant="h5" component="div" color="text.primary">
          {title.en}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {subtitle.en}
        </Typography>
        <Typography
          variant="body2" color="text.primary">
          {technologies?.sort().join(', ')}
        </Typography>

        <Typography
          variant="body2" color="text.primary">
          {types?.sort().join(', ')}
        </Typography>
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
              color="primary"
              variant="contained"
              sx={{
                ml: 1,
              }}
            >
              Visit Website
            </Button>
          )}
          {repo && (
            <Tooltip title="GitHub Repository">
              <IconButton
                href={repo}
                target="_blank"
                size="large"
                color="primary"
                sx={{ ml: 1 }}
              >
                <GitHubIcon />
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
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [filteredProjects, setFilteredProjects] = useState<Project_t[]>(projects);
  const [filterTechnology, setFilterTechnology] = useState("All");
  const [filterType, setFilterType] = useState("All");

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

  const handleFilterTechnology = (tech: string) => {
    if (tech === 'All')
      setFilteredProjects([...projects]);
    else
      setFilteredProjects(
        projects.filter((project) =>
          project.technologies?.includes(tech)
        )
      );
    setFilterTechnology(tech);
  };

  const handleFilterType = (type: string) => {
    if (type === 'All')
      setFilteredProjects([...projects]);
    else
      setFilteredProjects(
        projects.filter((project) => project.types?.includes(type))
      );
    setFilterType(type);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Box bgcolor={"background.default"} flexGrow={1} height={"100%"}>
        <AppBar position="static">
          <Toolbar>
            <Box height={"5rem"} sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Typography variant="h6" fontWeight={'bold'} textAlign={"center"} sx={{ flexGrow: 1 }}>
                BearkillerPT
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }} color="text.primary">
              Filter by technology:
            </Typography>
            <Box flexWrap={"wrap"}>
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
            </Box>
          </Box>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mr: 2 }} color="text.primary">
              Filter by type:
            </Typography>
            <Box flexWrap={"wrap"}>
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
            </Box>
          </Box>
          <Grid container spacing={2}>
            {filteredProjects.map((project, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;