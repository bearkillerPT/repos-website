import { CardMedia, Box, Button, Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Project_t, language_t, Translation_t, GithubProject } from "../types";
import { languages } from "../languages";
import GitHubIcon from "@mui/icons-material/GitHub";    


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
    })?.updated_at
    return (
      <Card
        sx={{ position: "relative", height: "100%" }}
        key={title[language]}
      >
        {video && (
          <video loop autoPlay muted controls style={{
            width: "100%",
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

  export default ProjectCard;