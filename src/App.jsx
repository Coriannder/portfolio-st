import './index.css'

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Home} from './components/Home/Home';
import { About } from './components/About/About';
import { BackgroundFigure } from './components/BackgroundFigure/BackgroundFigure';
import { Projects } from './components/Projects/Projects';


function App() {

  return (

    <>

      <Header/>
      <Main>
        <Home/>
        <About/>
        <Projects/>
      </Main>

      <BackgroundFigure/>
    </>

  );
}
export default App;

