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