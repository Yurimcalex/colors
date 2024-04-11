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


class Color {
	constructor(color = chroma.random().toString()) {
		this._color = color;
		this.luminance = chroma(color).luminance();
		this.isLocked = false;
	}

	get color() {
		return this._color;
	}

	generate() {
		if (this.isLocked) return;
		let color = chroma.random().toString();
		this.luminance = chroma(color).luminance();
		this._color = color;
	}

	toggleLock() {
		this.isLocked = !this.isLocked;
	}
}


class Columns {
	constructor() {
		this.cols = document.querySelectorAll('.col');
	}

	_setText(elm, text) { elm.textContent = text; }
	_setBgColor(elm, color) { elm.style.background = color; }
	_setTextColor(text, color, luminance) {
		text.style.color = luminance > 0.5 ? 'black' : 'white';
	}

	apply(colors) {
		this.cols.forEach((col, i) => {
			const btn = col.querySelector('button');
			const text = col.querySelector('h2');
			const [color, luminance] = colors[i];
			this._setText(text, color);
			this._setBgColor(col, color);
			this._setTextColor(text, color, luminance);
			this._setTextColor(btn, color, luminance);
		});
	}

	toggleLock(index) {
		let node = this.cols[index].querySelector('i');
		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
		document.activeElement.blur();
	}
}


class Storage {
	static getColorsFromHash() {
		if (document.location.hash.length > 1) {
			return document.location.hash
				.substring(1)
				.split('-')
				.map(h => '#' + h);
		}
		return [];
	}

	static updateColorsHash(colors = []) {
		document.location.hash = colors
			.map(c => c.toString().substring(1))
			.join('-');
	}
}


class LocalStorage extends Storage {
	constructor() {
		super();
	}

	save() {
		let colorList = localStorage.getItem('colorList');
		let colors = LocalStorage.getColorsFromHash();
		let key = colors.map(color => color.slice(1)).join('');

		if (colorList) {
			colorList = JSON.parse(colorList);
		} else {
			colorList = {};
		}

		if (key in colorList) return [];

		colorList[key] = colors;
		localStorage.setItem('colorList', JSON.stringify(colorList));
		return colors;
	}

	download() {
		let colorList = localStorage.getItem('colorList');
		if (colorList) {
			colorList = JSON.parse(colorList);
		} else {
			colorList = {};
		}
		return colorList;
	}

	clear() {
		localStorage.setItem('colorList', JSON.stringify({}));
	}
}


class Status {
	constructor() {
		this.bar = document.querySelector('.status');
	}

	toggle(text) {
		this.bar.textContent = text;
		this.bar.classList.toggle('show');
		setTimeout(() => this.bar.classList.toggle('show'), 1000);
	}
}


class Controller {
	_isButton(eventType, e) {
		return e.target.dataset.type === eventType ||
					 e.target.parentNode.dataset.type === eventType;
	}

	init() {
		app.start();
		document.addEventListener('keydown', (e) => {
			if (e.code.toLowerCase() === 'space') {
				app.update();
				status.toggle('Colors updated!');
			}
		});
	}

	on(eventType, handler) {
		document.addEventListener('click', (e) => {
			if (this._isButton(eventType, e)) handler(e);
		});
	}
}

let app = new App();
let status = new Status();
let controller = new Controller();

controller.init();

controller.on('lock', function (e) {
	let col = e.target.closest('.col');
	let index = [...app.columns.cols].findIndex(c => c === col);
	let hash = col.firstElementChild.textContent;
	app.toggleColorLock(index);
	if (col.querySelector('i').classList.contains('fa-lock')) {
		status.toggle(`Color ${hash} locked!`);
	} else {
		status.toggle(`Color ${hash} unlocked!`);
	}
});

controller.on('copy',function (e) {
	let text = e.target.textContent;
	navigator.clipboard.writeText(text);
	status.toggle(`${text} copied to clipboard!`);
});