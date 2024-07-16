import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	generate, 
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

	return (
		<div>
			<Main 
				colors={colors}
				locks={colors}
			/>
		</div>
	);
}