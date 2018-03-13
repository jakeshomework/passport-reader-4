import React, { Component } from 'react';
/* ----- IMPORT CONTAINERS ----- */
import Settings from "./containers/Settings";
import Book from "./containers/Book";
import Highlights from "./containers/Highlights";
import Audio from "./containers/Audio";
import SpeedReader from "./containers/SpeedReader";
import AnnotationModal from "./containers/AnnotationModal";

class App extends Component {
	render() {
		return (
			<div>
				<Settings />
				<Book />
				<Highlights />
				<Audio />
				<SpeedReader />
				<AnnotationModal />
			</div>
		)
	}
}

export default App;