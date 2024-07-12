import React from 'react';
import Color from './Color.jsx';

const defaultColors = ['red', 'green', 'blue', 'purple', 'orange'];

export default function ColorList({ initialColors, locks, handleColorLock }) {
	const colors = initialColors.length
		? initialColors
		: defaultColors;

	const listItems = colors.map((color, ind) => (
		<Color 
			key={color}
			color={color}
			lock={locks[ind]}
			onColorLock={() => handleColorLock(ind)}
		/>
	));

	return (
		<>
			{listItems}
		</>
	);
}