import './index.scss'

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Home} from './components/Home/Home';
import { About } from './components/About/About';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { BackgroundFigure } from './components/BackgroundFigure/BackgroundFigure';

import { BrowserRouter as Router } from "react-router-dom";
//import { Cursor } from './components/Cursor/Cursor';
import { CursorProvider } from './Context/CursorContext';


function App() {


  return (

    <Router>
		<CursorProvider>
			<Header/>
			<Main>
				<Home/>
				<About/>
				<Projects/>
				<Contact/>
			</Main>
			<BackgroundFigure/>
		</CursorProvider>
    </Router>
  );
}
export default App;

