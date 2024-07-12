import React from 'react';
import Color from './Color.jsx';

export default function ColorList({ colors, locks, handleColorLock }) {
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