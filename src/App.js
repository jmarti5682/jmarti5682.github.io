import WelcomeSection from './components/WelcomeSection';
import AboutMe from './components/AboutMe';
import Project from './components/Project';
import Contact from './components/Contact'
import './App.css';

function App() {
  return (
    <div className="App">
      <WelcomeSection />
      <AboutMe />
      <Project />
      <Contact />
      
    </div>
  );
}

export default App;
