import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa";
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
        <p className="header_title">
          BearkillerPT's Portfolio
        </p>
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
                      <img src={project.image} className="video" />
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

    </div>
  );
}

export default App;
