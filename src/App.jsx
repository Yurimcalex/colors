import React, { useState, useEffect } from 'react';
import ColorList from './components/ColorList.jsx';
import Storage from './storage.js';
import './app.css';

export default function App() {
	const [colors, setColors] = useState(Storage.getColorsFromHash());
	const [locks, setLocks] = useState(new Array(5).fill(false));

	const handleKeyDown = (e) => {
		const newColors = [];
		if (e.code.toLowerCase() === 'space') {
			for (let i = 0; i < 5; i += 1) {
				const color = locks[i]
					? colors[i]
					: chroma.random().toString();
				
				newColors.push(color);
			}
			setColors(newColors);
			Storage.updateColorsHash(newColors);
			document.activeElement.blur();
		}
	};

	const handleColorLock = (ind) => {
		setLocks(locks.map((lock, i) => ind === i ? !lock : lock));
	};

	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, [locks]);

	return (
		<div className="app">
			<ColorList 
				initialColors={colors}
				locks={locks}
				handleColorLock={handleColorLock}
			/>
		</div>
	);
}