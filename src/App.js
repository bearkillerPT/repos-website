import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from 'react';
function App() {
  const [projects, setProjects] = useState({});
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/bearkillerPT/repos-website/main/public/projects.json').then( (res)=>
      console.log(res.json())
    )
    return () => {
    }
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          My Portfolio
        </p>
      </header>
    </div>
  );
}

export default App;
