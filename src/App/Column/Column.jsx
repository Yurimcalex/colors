import React from 'react';
import Color from '../Color/Color.jsx';
import Button from '../../components/Button/Button.jsx';
import styles from './Column.module.css';

export default function Column({ color, lock, onColorLock, onColorCopy }) {
	const luminance = chroma(color).luminance();
	
	return (
		<div className={styles.container} style={{ color: luminance > 0.5 ? 'black' : 'white' }}>
			<Color color={color}>
				<h2 onClick={onColorCopy}>{color}</h2>
				<Button 
					icon={`fa-solid ${lock ? 'fa-lock' : 'fa-lock-open'}`}
					onClick={onColorLock} 
				/>
			</Color>
		</div>
	);
}