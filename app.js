const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
	if (event.code.toLowerCase() === 'space') {
		setRandomColors();
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

function setRandomColors() {
	cols.forEach(col => {
		const color = chroma.random(); //generateRandomColor();
		const text = col.querySelector('h2');
		const btn = col.querySelector('button');
		col.style.background = color;
		text.textContent = color;
		setTextColor(text, color);
		setTextColor(btn, color);
	});
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance();
	text.style.color = luminance > 0.5 ? 'black' : 'white';
}

setRandomColors();