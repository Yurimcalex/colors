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

export default Color;