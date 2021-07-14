import './App.css';
import { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
const meImg = 'https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/meImg.png';
const portfolioHeader = 'https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/portfolio.png';
const aboutMe = 'https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/aboutme.png';
function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/projects.json')
      .then((res) => res.json())
      .then((res) => setProjects(res))
  }, [])
  console.log(projects)


  return (
    <div className="App">
      <header className="App-header">
        <img src={portfolioHeader} className="me_img"></img>
      </header>
      <div className='container'>{
        projects.map((project, index) => {
          return (
            <div key={index} className='project_container'>
              <div className="project_item">
                <div className="img_container">
                  {project.video != null &&
                    <video loop autoPlay muted className="video">
                      <source src={project.video} type="video/mp4" />
                    </video>
                  }
                  {project.video == null &&
                    <img src={project.image} className="video" alt={meImg} />
                  }
                </div>
                <div className="bottom_container">
                  <div className="text">
                    <div className="title">{project.title}</div>
                    <div className="subtitle">{project.subtitle}</div>
                  </div>
                  <div className="button_container">
                    {project.url &&
                      <div className="website_button"><a href={project.url} style={{
                        color: 'white',
                        textDecoration: 'none'
                      }}>Visit Website</a></div>

                    }
                    <a className="github" href={project.repo}>
                      <FaGithub size={14 * 3} />
                    </a>
                  </div>
                </div>
                {project.repo.includes("Unn4m3DD") &&
                  <div className="project_footer">
                    <p>
                      *This project is hosted in a friends github!
                    </p>
                  </div>
                }
              </div >
            </div >
          );
        })
      }</div>
      <header className="App-header" >
      <img src={aboutMe} className="me_img"></img>
      </header>
      <div className='container'>
        <div className='about_container_container'>
          <div className="about_container" style={{ paddingTop: 20, position: 'relative' }}>
            <div className="img_container">
              <img className="me_img" src={meImg} alt="Snow" />
            </div>
            <div className="text">
              <div className="title">Gil Teixeira</div>
              <div className="subtitle">
                Hey! I'm a portuguese guy with a degree in computer and informatic engineering, Universidade de Aveiro!
                I built this website with react in order to expose a bit of my work. You can find links for both live website and github repos next to each project.
                This website is currently being hosted on a raspberry 2b with nginx!
                Visit my github account to have a look at some of the technologies and concepts I've learned!
              </div>
              <div className="button_container" style={{
                paddingTop: 20,
                position: 'absolute',
                bottom: 0,
                right: 0
              }}>
                <a className="github" href={""} >
                  <FaGithub size={14 * 3} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
