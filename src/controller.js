class Controller {
	_isButton(eventType, e) {
		return e.target.dataset.type === eventType ||
					 e.target.parentNode.dataset.type === eventType;
	}

	init(app, status) {
		app.start();
		document.addEventListener('keydown', (e) => {
			if (e.code.toLowerCase() === 'space') {
				app.update();
				status.toggle('Colors updated!');
			}
		});
	}

	on(eventType, handler) {
		document.addEventListener('click', (e) => {
			if (this._isButton(eventType, e)) handler(e);
		});
	}
}

export default Controller;