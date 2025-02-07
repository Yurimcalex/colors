import React from 'react';
import Button from '../Button/Button.jsx';
import styles from './Column.module.css';


export default function Column({ color, lock, onColorLock, onColorCopy }) {
	const luminance = chroma(color).luminance();

	return (
		<div className={styles.column} style={{ color: luminance > 0.5 ? 'black' : 'white' }}>
			<h2 className={styles.column_hash} onClick={onColorCopy} data-type="copy-to-clipboard">{color}</h2>
			
			<Button 
				icon={`fa-solid ${lock ? 'fa-lock' : 'fa-lock-open'}`}
				onClick={onColorLock}
				dataType="lock/unlock-color"
			/>
		</div>
	);
}