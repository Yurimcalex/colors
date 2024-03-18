const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (event) => {
	//event.preventDefault();
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
		const isLocked = col.querySelector('i').classList.contains('fa-lock');
		if (isLocked) return;

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