import React from 'react';
import Button from './Button.jsx';

export default function Color({ color, lock, onColorLock }) {
	const luminance = chroma(color).luminance();

	const handleHeaderClick = (e) => {
		const text = e.target.textContent;
		navigator.clipboard.writeText(text);
	};

	return (
		<div 
			className="col"
			style={{
				background: color,
				color: luminance > 0.5 ? 'black' : 'white'
			}}
		>
			<h2 onClick={handleHeaderClick}>{color}</h2>
			<Button 
				icon={`fa-solid ${lock ? 'fa-lock' : 'fa-lock-open'}`}
				onClick={onColorLock} 
			/>
		</div>
	);
}