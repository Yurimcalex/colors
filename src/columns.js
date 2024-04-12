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

export default Columns;