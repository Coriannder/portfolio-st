import './index.css'

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Home} from './components/Home/Home';
import { About } from './components/About/About';
import { BackgroundFigure } from './components/BackgroundFigure/BackgroundFigure';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';


import { BrowserRouter as Router } from "react-router-dom";


function App() {

  return (

    <Router>

      <Header/>

      <Main>
        <Home/>
        <About/>
        <Projects/>
        <Contact/>
      </Main>

      <BackgroundFigure/>
      
    </Router>
  );
}
export default App;

