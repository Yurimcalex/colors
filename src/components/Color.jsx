import React from 'react';
import Button from './Button.jsx';

export default function Color({ color, lock, onColorLock }) {
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
			<Button 
				icon={`fa-solid ${lock ? 'fa-lock' : 'fa-lock-open'}`}
				onClick={onColorLock} 
			/>
		</div>
	);
}