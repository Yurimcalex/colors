import React from 'react';
import Button from './Button.jsx';

export default function Color({ color }) {
	const luminance = chroma(color).luminance();

	return (
		<div 
			className="col"
			style={{
				background: color,
				color: luminance > 0.5 ? 'black' : 'white'
			}}
		>
			<h2>{color}</h2>
			<Button icon="fa-solid fa-lock-open" />
		</div>
	);
}