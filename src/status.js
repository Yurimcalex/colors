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

export default Status;