import React, { useState, useEffect } from 'react';

export default function useColor() {
	const [color, setColor] = useState('');

	useEffect(() => {
		window.addEventListener('mousedown', down);
		window.addEventListener('mouseup', up);
		return () => {
			window.removeEventListener('mousedown', down);
			window.removeEventListener('mouseup', up);
		};
	}, [color]);


	function down(e) {
		if (e.target.dataset && e.target.dataset.color) setColor(e.target.dataset.color);
	}

	function up(e) {
		if (e.target.dataset && e.target.dataset.color) setColor('');
	}

	return [color];
}