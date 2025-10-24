import './index.scss'

import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Home} from './components/Home/Home';
import { About } from './components/About/About';
import { Contact } from './components/Contact/Contact';
import { BackgroundFigure } from './components/BackgroundFigure/BackgroundFigure';
import { Projects } from './components/Proyects/Proyects';
import { BrowserRouter as Router } from "react-router-dom";
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
					{/* <Contact/> */}
				</Main>
				<BackgroundFigure/>
			</CursorProvider>
		</Router>
		);
}
export default App;