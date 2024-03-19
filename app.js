const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', onSetColors);

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

function onSetColors(e) {
	if (event.code.toLowerCase() === 'space') setRandomColors();
}


function setRandomColors(isInitial) {
	const colors = getColors(isInitial);

	cols.forEach((col, i) => {
		const btn = col.querySelector('button');
		const text = col.querySelector('h2');
		const color = colors[i];
		const isLocked = col.querySelector('i').classList.contains('fa-lock');

		if (isLocked) {
			colors[i] = text.textContent;
			return;
		}
		
		setText(text, color);
		setBgColor(col, color);
		setTextColor(text, color);
		setTextColor(btn, color);
	});

	updateColorsHash(colors);
}

function setText(elm, text) {
	elm.textContent = text;
}

function getColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];
	if (!colors.length) {
		for (let i = 0; i < 6; i += 1) {
			colors.push(chroma.random());
		}
	}
	return colors;
}

function setBgColor(elm, color) {
	elm.style.background = color;
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