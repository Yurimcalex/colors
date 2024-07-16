import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentColors, selectSavedColors } from './colorsSlice.js';

export default function ColorsPage() {
	const colors = useSelector(selectCurrentColors);
	const savedColors = useSelector(selectSavedColors);

	console.log(colors, savedColors);

	return (
		<div>
			OK
		</div>
	);
}