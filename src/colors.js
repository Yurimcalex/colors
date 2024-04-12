class ColorsSet {
	constructor() {
		this.panel = document.querySelector('.saved-colors');
		this.container = document.querySelector('.colors-container');
		this.isOpened = false;
		this.pad = 0;
		this.shiftPad = 200;
	}

	_create(colors) {
		return (
			`<div class="color-set" data-type="colors" data-data=${colors.join('-')}>
				${colors.map(color => `<div class="color-small" style="background: ${color}"></div>`).join('')}
			</div>`);
	}

	render(list) {
		let strHtml = Object.values(list)
			.map(colors => this._create(colors))
			.join('');

		this.container.innerHTML = strHtml || 'No saved colors yet!';
		this.panel.classList.add('visible');
	}

	hide() {
		this.panel.classList.remove('visible');
		this.isOpened = false;
	}

	clear() {
		this.container.innerHTML = '';
		this.container.style.marginLeft = 0 + 'px';
		this.pad = 0;
	}

	scrollForward() {
		if (this.container.scrollWidth - this.pad <= this.container.parentNode.offsetWidth) return;
		this.pad += this.shiftPad;
		this.container.style.marginLeft = -this.pad + 'px';
	}

	scrollBack() {
		this.pad -= this.shiftPad;
		if (this.pad < 0) this.pad = 0;
		this.container.style.marginLeft = -this.pad + 'px';
	}

	getColors(target) {
		return (target.dataset.data || target.parentNode.dataset.data).split('-');
	}
}

export default ColorsSet;