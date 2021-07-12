import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [projects, setProjects] = useState({});
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
