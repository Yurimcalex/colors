const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', onSetColors);
document.addEventListener('click', onToggleColorLock);
document.addEventListener('click', onCopyText);
document.addEventListener('click', onSaveColors);
document.addEventListener('click', onDownloadColors);
document.addEventListener('click', onRemoveColors);
document.addEventListener('click', onCloseSavedColors);
document.addEventListener('click', onClickNext);
document.addEventListener('click', onClickPrev);
document.addEventListener('click', onPickColorSet);

render(true);


function onPickColorSet(e) {
	if ( e.target.dataset.type === 'colors' || 
			 e.target.parentNode.dataset.type === 'colors' ) {
		let colors = (e.target.dataset.data || e.target.parentNode.dataset.data).split('-');
		cols.forEach((col, i) => {
			const btn = col.querySelector('button');
			const text = col.querySelector('h2');
			const color = colors[i];
			setText(text, color);
			setBgColor(col, color);
			setTextColor(text, color);
			setTextColor(btn, color);
		});

		updateColorsHash(colors);
		toggleStatusBar(`Color set picked!`);
	}
}

let pad = 0, shiftPad = 200;
function onClickNext(e) {
	if ( e.target.dataset.type === 'next' || 
			 e.target.parentNode.dataset.type === 'next' ) {
		let container = document.querySelector('.colors-container');
		if (container.scrollWidth - pad <= container.parentNode.offsetWidth) return;
		pad += shiftPad;
		container.style.marginLeft = -pad + 'px';
	}
}

function onClickPrev(e) {
	if ( e.target.dataset.type === 'prev' || 
			 e.target.parentNode.dataset.type === 'prev' ) {
		let container = document.querySelector('.colors-container');
		pad -= shiftPad;
		if (pad < 0) pad = 0;
		container.style.marginLeft = -pad + 'px';
	}
}

let isOpened = false;
function onCloseSavedColors(e) {
	if ( e.target.dataset.type === 'close' || 
			 e.target.parentNode.dataset.type === 'close' ) {
		e.target.closest('.saved-colors').classList.remove('visible');
		isOpened = false;
		toggleStatusBar(`Saved colors panel closed!`);
	}
}

function onRemoveColors(e) {
	if ( e.target.dataset.type === 'remove' || 
			 e.target.parentNode.dataset.type === 'remove' ) {
		let container = document.querySelector('.colors-container')
		removeSavedColors();
		container.innerHTML = '';
		container.style.marginLeft = 0 + 'px';
		pad = 0;
		toggleStatusBar(`Colors removed!`);
	}
}

function onDownloadColors(e) {
	if ( e.target.dataset.type === 'download' || 
			 e.target.parentNode.dataset.type === 'download' ) {
		let list = downloadColors();
		let strHtml = Object.values(list).map(colors => createColorSet(colors)).join('');

		document.querySelector('.colors-container').innerHTML = strHtml || 'No saved colors yet!';
		document.querySelector('.saved-colors').classList.add('visible');
		if (!isOpened) {
			setTimeout(() => toggleStatusBar(`Colors downloaded!`), 500);
			isOpened = true;
		}
	}
}

function onSaveColors(e) {
	if ( e.target.dataset.type === 'save' || 
			 e.target.parentNode.dataset.type === 'save' ) {
		let colors = saveColors();
		if (!colors.length) {
			toggleStatusBar(`The colors already have been saved!`);
			return;
		}

		if (document.querySelector('.saved-colors').classList.contains('visible')) {
			document.querySelector('button[data-type="download"]').click();
		}

		toggleStatusBar(`Colors ${colors.join(', ')} saved!`);
	}
}

function onSetColors(e) {
	if (e.code.toLowerCase() === 'space') render();
}

function onToggleColorLock(e) {
	const type = event.target.dataset.type;
	if (type === 'lock') {
		const node 
			= event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0];

		node.classList.toggle('fa-lock-open');
		node.classList.toggle('fa-lock');
		document.activeElement.blur();

		let colorHash = event.target.closest('.col').firstElementChild.textContent;
		if (node.classList.contains('fa-lock')) {
			toggleStatusBar(`Color ${colorHash} locked!`);
		} else {
			toggleStatusBar(`Color ${colorHash} unlocked!`);
		}
	} 
}

function onCopyText(e) {
	const type = event.target.dataset.type;
	if (type === 'copy') {
		const text = event.target.textContent;
		copyToClickboard(text);
		toggleStatusBar(`${text} copied to clipboard!`);
	}
}


function render(isInitial) {
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

function toggleStatusBar(text) {
	const bar = document.querySelector('.status');
	setText(bar, text);
	bar.classList.toggle('show-satus');
	setTimeout(() => bar.classList.toggle('show-satus'), 1000);
}

function setText(elm, text) {
	elm.textContent = text;
}

function getColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : [];
	if (!colors.length) {
		for (let i = 0; i < 5; i += 1) {
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

function saveColors() {
	let colorList = localStorage.getItem('colorList');
	let colors = getColorsFromHash();
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

function downloadColors() {
	let colorList = localStorage.getItem('colorList');
	if (colorList) {
		colorList = JSON.parse(colorList);
	} else {
		colorList = {};
	}
	return colorList;
}

function createColorSet(colors) {
	return `<div class="color-set" data-type="colors" data-data=${colors.join('-')}>
		${colors.map(color => `<div class="color-small" style="background: ${color}"></div>`).join('')}
	</div>`;
}

function removeSavedColors() {
	localStorage.setItem('colorList', JSON.stringify({}));
}