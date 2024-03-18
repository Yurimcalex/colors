const cols = document.querySelectorAll('.col');

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
		const color = generateRandomColor();
		const text = col.querySelector('h2');
		col.style.background = color;
		text.textContent = color;
	});
}

setRandomColors();