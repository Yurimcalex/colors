import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generate, toggleLock, selectCurrentColors } from '../features/colors/colorsSlice.js';
import Color from './sections/Color/Color.jsx';
import Column from './components/Column/Column.jsx';


export default function Content() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	const handleKeyDown = (e) => {
		if (e.code.toLowerCase() === 'space') {
			dispatch(generate(colors, locks));
		}
	};

	const handleColorLock = (ind) => {
		dispatch(toggleLock(ind));
		document.activeElement.blur();
	};

	const handleCopyColorHash = (e) => {
		const text = e.target.textContent;
		navigator.clipboard.writeText(text);
	};

	const Colors = colors.map((color, ind) => (
		<Color key={color} color={color}>
			<Column 
				color={color}
				lock={locks[ind]}
				onColorLock={() => handleColorLock(ind)}
				onColorCopy={handleCopyColorHash}
			/>
		</Color>
	));

	return (
		<>
			{Colors}
		</>
	);
}