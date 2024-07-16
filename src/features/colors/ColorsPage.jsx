import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	generate,
	toggleLock, 
	selectCurrentColors,
	selectSavedColors
} from './colorsSlice.js';
import Main from '../../App/Main/Main.jsx';

export default function ColorsPage() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, [locks, colors]);

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
		<div>
			<Main 
				colors={colors}
				locks={locks}
				handleColorLock={handleColorLock}
				handleColorCopy={handleCopyColorHash}
			/>
		</div>
	);
}