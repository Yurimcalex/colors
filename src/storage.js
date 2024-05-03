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

export default Storage;


export class LocalStorage extends Storage {
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

	remove(colors) {
		let colorList = localStorage.getItem('colorList');
		let key = colors.split('-').map(color => color.slice(1)).join('');
		colorList = JSON.parse(colorList);
		delete colorList[key];
		localStorage.setItem('colorList', JSON.stringify(colorList));
	}
};