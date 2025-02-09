import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { generate, updateColors, toggleLock, selectCurrentColors } from '../features/colors/colorsSlice.js';
import Color from './sections/Color/Color.jsx';
import Column from './components/Column/Column.jsx';


export default function Content() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();


	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	useEffect(() => {
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('mouseover', handleMouseOver);
		window.addEventListener('mouseout', handleMouseOut);
		return () => {
			window.removeEventListener('mousedown', handleMouseDown);
			window.removeEventListener('mouseup', handleMouseUp);
			window.removeEventListener('mouseover', handleMouseOver);
			window.removeEventListener('mouseout', handleMouseOut);
		};
	}, []);


	let currentElem = null;
	let dragStartColor;
	const handleMouseDown = (e) => {
		const target = e.target.closest('[data-color]');
		if (target) {
			dragStartColor = target.dataset.color;
		}
	};

	const handleMouseUp = (e) => {
		if (currentElem) {
			const dragEndColor = currentElem.dataset.color;
			if (dragStartColor !== dragEndColor) {
				dispatch(updateColors(dragStartColor, dragEndColor));
				currentElem = null;
			}
			
		}
	};

	const handleMouseOver = (e) => {
		if (!dragStartColor) return;
		if (currentElem) return;
		  let target = event.target.closest('[data-color]');
		  if (!target) return;
		  currentElem = target;
	};

	const handleMouseOut = (e) => {
		if (!currentElem) return;
		let relatedTarget = event.relatedTarget;
		while (relatedTarget) {
		  if (relatedTarget == currentElem) return;
		  relatedTarget = relatedTarget.parentNode;
		}
		currentElem = null;
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