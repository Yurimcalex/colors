import React, { useState, useEffect } from 'react';
import ColorList from './components/ColorList.jsx';
import Storage from './storage.js';
import './app.css';

export default function App() {
	const [colors, setColors] = useState(Storage.getColorsFromHash());

	const handleKeyDown = (e) => {
		const newColors = [];
		if (e.code.toLowerCase() === 'space') {
			for (let i = 0; i < 5; i += 1) {
				newColors.push(chroma.random().toString());
			}
			setColors(newColors);
			Storage.updateColorsHash(newColors);
		}
	};

	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	return (
		<div className="app">
			<ColorList initialColors={colors} />
		</div>
	);
}