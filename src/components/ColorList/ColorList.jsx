import React from 'react';
import Color from '../Color/Color.jsx';

export default function ColorList({ colors, locks, handleColorLock, handleColorCopy }) {
	const listItems = colors.map((color, ind) => (
		<Color 
			key={color}
			color={color}
			lock={locks[ind]}
			onColorLock={() => handleColorLock(ind)}
			onColorCopy={handleColorCopy}
		/>
	));

	return (
		<>
			{listItems}
		</>
	);
}