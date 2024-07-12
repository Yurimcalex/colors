import React from 'react';
import Color from './Color.jsx';

const defaultColors = ['red', 'green', 'blue', 'purple', 'orange'];

export default function ColorList({ initialColors }) {
	const colors = initialColors.length
		? initialColors
		: defaultColors;

	const listItems = colors.map(color => (
		<Color 
			key={color}
			color={color} 
		/>
	));

	return (
		<>
			{listItems}
		</>
	);
}