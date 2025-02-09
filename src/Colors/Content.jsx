import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generate, updateColors, toggleLock, selectCurrentColors } from '../features/colors/colorsSlice.js';
import Color from './sections/Color/Color.jsx';
import Column from './components/Column/Column.jsx';
import useHover from './hooks/useHover.jsx';


export default function Content() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	const [hoveredElm, setHoveredElm] = useHover('[data-color]');
	const [selectedColor, setSelectedColor] = useState('');


	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);


	useEffect(() => {
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [selectedColor, hoveredElm]);

	const handleMouseDown = (e) => {
		if (e.target.dataset && e.target.dataset.color)
			setSelectedColor(e.target.dataset.color);
	}

	const handleMouseUp = (e) => {
		if (hoveredElm && selectedColor) {
			const swapColor = hoveredElm.dataset.color;
			if (selectedColor !== swapColor) {
				dispatch(updateColors(selectedColor, swapColor));
				setSelectedColor('');
			}
		}
	};


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


	return (
		<>
			{colors.map((color, ind) => (
				<Color key={color} color={color}>
					<Column 
						color={color}
						lock={locks[ind]}
						onColorLock={() => handleColorLock(ind)}
						onColorCopy={handleCopyColorHash}
					/>
				</Color>
			))}
		</>
	);
}