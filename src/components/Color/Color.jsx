import React from 'react';
import Button from '../Button/Button.jsx';
import styles from './Color.module.css';

export default function Color({ color, lock, onColorLock, onColorCopy }) {
	const luminance = chroma(color).luminance();

	return (
		<div 
			className={styles.column}
			style={{
				background: color,
				color: luminance > 0.5 ? 'black' : 'white'
			}}
		>
			<h2 onClick={onColorCopy}>{color}</h2>
			<Button 
				icon={`fa-solid ${lock ? 'fa-lock' : 'fa-lock-open'}`}
				onClick={onColorLock} 
			/>
		</div>
	);
}