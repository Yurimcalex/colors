const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
	if (event.code.toLowerCase() === 'space') {
		setRandomColors();
	}
});

document.addEventListener('click', (event) => {
	const type = event.target.dataset.type;
	if (type === 'lock') {
		const node 
			= event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0];

		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
		document.activeElement.blur();
	} else if (type === 'copy') {
		copyToClickboard(event.target.textContent);
	}
});

function generateRandomColor() {
	const hexCodes = '123456789ABCDF';
	let color = '';
	for (let i = 0; i < 6; i += 1) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)];	
	}
	return '#' + color;
}

function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];

	cols.forEach((col, i) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock');
		const text = col.querySelector('h2');

		if (isLocked) {
			colors.push(text.textContent);
			return;
		}

		const color = isInitial 
			? (colors[i] ? colors[i] : chroma.random()) 
			: chroma.random(); //generateRandomColor();
		if (!isInitial) colors.push(color);
		
		const btn = col.querySelector('button');
		col.style.background = color;
		text.textContent = color;
		setTextColor(text, color);
		setTextColor(btn, color);
	});

	updateColorsHash(colors);
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

function copyToClickboard(text) {
	return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
	document.location.hash = colors.map(c => c.toString().substring(1)).join('-');
}

function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash.substring(1).split('-').map(h => '#' + h);
	}
	return [];
}

setRandomColors(true);