import React from 'react';
import Button from './Button.jsx';

export default function Color({ color }) {
	return (
		<div 
			className="col"
			style={{
				background: `${color}`
			}}
		>
			<h2>{color}</h2>
			<Button icon="fa-solid fa-lock-open" />
		</div>
	);
}