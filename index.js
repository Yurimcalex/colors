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