import './App.css';
import { useState, useEffect } from 'react';
import { FaGithub } from "react-icons/fa"; import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { languages } from './languages';
const meImg = 'https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/meImg.png';
const portfolioHeader = 'https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/portfolio.png';
const aboutMe = 'https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/aboutme.png';
function App() {
  const [projects, setProjects] = useState([]);
  const [lang, setLang] = useState("en");
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/projects.json')
      .then((res) => res.json())
      .then((res) => setProjects(res))
  }, [])
  const langOptions = [{ value: 'pt', label: 'Português' }, { value: 'en', label: 'English' }];
  return (
    <div className="App">
      <header className="App-header">
        <img src={portfolioHeader} className="header_img" ></img>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}>
          <Dropdown >
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              {languages.language[lang]}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" >
              <Dropdown.Item
                onClick={() => { setLang('en') }}
              >
                {languages.languages.english[lang]}
              </Dropdown.Item>
              <br />
              <Dropdown.Item
                onClick={() => { setLang('pt') }}
              >
                {languages.languages.portuguese[lang]}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>

      </header>
      <div className='my_container'>{
        projects.map((project, index) => {
          return (
            <div key={index} className='project_container' style={{ position: 'relative' }}>
              <div className="project_item" >
                <div className="img_container project_img">
                  {project.video != null &&
                    <div style={{ justifyContent: 'center' }}>
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
                    <div className="title" >{project.title[lang]}</div>
                    <div className="subtitle">{project.subtitle[lang]}</div>
                    <div className="button_container" style={{
                      padding: 20
                    }}>
                      {project.url &&
                        <div className="website_button"><a href={project.url} style={{
                          color: 'white',
                          textDecoration: 'none'
                        }}>{languages.project.websiteButton[lang]}</a></div>

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
                      {languages.project.footerNote[lang]}
                    </p>
                  </div>
                }
              </div >
            </div >
          );
        })
      }</div>
      <header className="App-header" >
        <img src={aboutMe} className="header_img" style={{
          maxWidth: 400,
        }}></img>
      </header>
      <div className='my_container'>
        <div className='about_container_container'>
          <div className="about_container" style={{ paddingTop: 20, position: 'relative', overflow: 'hidden', justifyContent: 'center' }}>
            <div>
              <div className="img_container" style={{
                maxWidth: 150,
                justifyContent: 'center',
              }}>
                <img className="me_img" src={meImg} alt="Snow" />
              </div>
              <div className="text" >
                <div className="title">Gil Teixeira</div>
                <div className="subtitle" style={{ float: 'right' }}>
                  {languages.aboutMeLeft[lang]}
                </div>
              </div>
            </div>

            <div className="text" style={{ float: 'right' }}>
              <div className="subtitle" >
                {languages.checkCurriculum[lang]}
              </div>
              <div style={{ padding: 10 }}>
                <div className="one_line_button"><a href={"https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/Curriculo.pdf"} style={{
                  color: 'white',
                  textDecoration: 'none',
                }}>Download pdf</a></div>
              </div>
              <div >
                <div className="subtitle"  >
                  {languages.aboutMeRight[lang]}
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
