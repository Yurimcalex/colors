import Storage from './storage.js';
import Color from './color.js';
import Columns from './columns.js';

class App {
	constructor() {
		this.state = {
			colors: []
		};
		this.columns = new Columns();
	}

	_createColors() {
		let colors = Storage.getColorsFromHash().map(c => new Color(c));
		if (!colors.length) {
			colors = [...this.columns.cols].map(() => new Color());
		}
		this.state.colors = colors;
	}

	_getColors() {
		return this.state.colors.map(c => Object.values(c));
	}

	_genColors() {
		this.state.colors.forEach(c => c.generate());
	}

	setColors(colors) {
		this.state.colors = colors.map(c => new Color(c));
		this.columns.apply(this._getColors());
		Storage.updateColorsHash(colors);
	}

	start() {
		this._createColors();
		this.columns.apply(this._getColors());
	}

	update() {
		this._genColors();
		let colors = this._getColors();
		this.columns.apply(colors);
		Storage.updateColorsHash(colors.map(c => c[0]));
	}

	toggleColorLock(index) {
		this.state.colors[index].toggleLock();
		this.columns.toggleLock(index);
	}
}

export default App;