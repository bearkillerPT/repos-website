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
        <img src={portfolioHeader} className="header_img"></img>
      </header>
      <div className='container'>{
        projects.map((project, index) => {
          return (
            <div key={index} className='project_container' style={{ position: 'relative' }}>
              <div className="project_item" >
                <div className="img_container project_img">
                  {project.video != null &&
                    <div style={{justifyContent:'center'}}>
                      <video loop autoPlay muted className="video">
                        <source src={project.video} type="video/mp4" />
                      </video>
                    </div>
                  }
                  {project.video == null &&
                    <div>
                      <img src={project.image} className="video" alt={meImg} />
                    </div>
                  }
                </div>
                <div className="bottom_container" style={{ position: 'absolute', bottom: 10 }}>
                  <div className="text" >
                    <div className="title">{project.title}</div>
                    <div className="subtitle">{project.subtitle}</div>
                    <div className="button_container" style={{
                      padding: 20
                    }}>
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
                </div>
                {project.repo.includes("Unn4m3DD") &&
                  <div className="project_footer" style={{ position: 'absolute', bottom: 0 }}>
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
        <img src={aboutMe} className="header_img"></img>
      </header>
      <div className='container'>
        <div className='about_container_container'>
          <div className="about_container" style={{ paddingTop: 20, position: 'relative', overflow: 'hidden',justifyContent: 'center' }}>
            <div>
              <div className="img_container" style={{
                maxWidth: 150,
                justifyContent: 'center',
                }}>
                <img className="me_img" src={meImg} alt="Snow"/>
              </div>
              <div className="text" >
                <div className="title">Gil Teixeira</div>
                <div className="subtitle" style={{ float: 'right' }}>
                  Hey! I'm a portuguese developer with a degree in computer and informatic engineering from Universidade de Aveiro!
                  I built this website with react in order to expose a bit of my work. You can find links for both live website and github repos next to each project.
                  The website is currently being hosted on a raspberry 2b with nginx!
                </div>
              </div>
            </div>

            <div className="text" style={{ float: 'right' }}>
              <div className="subtitle" >
                Check out my Curriculum Vitae:
              </div>
              <div style={{ padding: 10 }}>
                <div className="one_line_button"><a href={"https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/Curriculo.pdf"} style={{
                  color: 'white',
                  textDecoration: 'none',
                }}>Download pdf</a></div>
              </div>
              <div >
                <div className="subtitle"  >
                  I'm currently working at a Research Grant at Instituto de Telecomunicações in the embedded systems group!
                  Visit my github account to have a look at some of the technologies and concepts I've learned!
                </div>
              </div>
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
  );
}

export default App;
