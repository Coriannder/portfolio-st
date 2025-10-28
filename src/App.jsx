import './index.scss'

import { useEffect } from 'react'
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

	// Add a lightweight runtime detection for hybrid (touch+mouse) laptops
	// Some Windows laptops report no primary hover; when the user moves a mouse
	// we add `has-mouse` to <body> so CSS can target hover styles safely.
	useEffect(() => {
		if (typeof window === 'undefined' || !document || !document.body) return;

		const onPointerMove = (e) => {
			// pointerType 'mouse' indicates a real mouse is active
			if (e && e.pointerType === 'mouse') {
				document.body.classList.add('has-mouse');
			}
		};

		const onPointerDown = (e) => {
			// if the user touches the screen, remove the class to avoid accidental hover
			if (e && e.pointerType === 'touch') {
				document.body.classList.remove('has-mouse');
			}
		};

		window.addEventListener('pointermove', onPointerMove, { passive: true });
		window.addEventListener('pointerdown', onPointerDown, { passive: true });

		return () => {
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerdown', onPointerDown);
		};
	}, []);

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