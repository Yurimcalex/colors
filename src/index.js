import App from './app.js';
import Status from './status.js';
import { LocalStorage } from './storage.js';
import ColorsSet from './colors.js';
import Controller from './controller.js';
import '../style.css';
import '../portrait.css';

let app = new App();
let status = new Status();
let storage = new LocalStorage();
let colorsSet = new ColorsSet();
let controller = new Controller();


controller.init(app, status);


controller.on('lock', function (e) {
	let col = e.target.closest('.col');
	let index = [...app.columns.cols].findIndex(c => c === col);
	let hash = col.firstElementChild.textContent;
	app.toggleColorLock(index);
	if (col.querySelector('i').classList.contains('fa-lock')) {
		status.toggle(`Color ${hash} locked!`);
	} else {
		status.toggle(`Color ${hash} unlocked!`);
	}
});


controller.on('copy', function (e) {
	let text = e.target.textContent;
	navigator.clipboard.writeText(text);
	status.toggle(`${text} copied to clipboard!`);
});


controller.on('download', function (e) {
	let colorList = storage.download();
	colorsSet.render(colorList);
	if (!colorsSet.isOpened) {
		setTimeout(() => status.toggle(`Colors downloaded!`), 500);
		colorsSet.isOpened = true;
	}
});


controller.on('save', function (e) {
	let colors = storage.save();
	if (!colors.length) {
		status.toggle(`The colors already have been saved!`);
		return;
	}
	if (colorsSet.isOpened) {
		document.querySelector('button[data-type="download"]').click();
	}
	status.toggle(`Colors ${colors.join(', ')} saved!`);
});


controller.on('close', function (e) {
	colorsSet.hide();
	status.toggle(`Saved colors panel closed!`);
});


controller.on('next', function (e) {
	colorsSet.scrollForward();
});


controller.on('prev', function (e) {
	colorsSet.scrollBack();
});


controller.on('up', function (e) {
	colorsSet.scrollUp();
});


controller.on('down', function (e) {
	colorsSet.scrollDown();
});


controller.on('remove', function (e) {
	storage.clear();
	colorsSet.clear();
	status.toggle(`Colors removed!`);
});


controller.on('colors', function (e) {
	let colors = colorsSet.getColors(e.target);
	app.setColors(colors);
	status.toggle(`Color set picked!`);
});


controller.on('delete', function (e) {
	let colors = e.target.closest('.color-set').dataset.data;
	storage.remove(colors);
	let colorList = storage.download();
	colorsSet.render(colorList);
});