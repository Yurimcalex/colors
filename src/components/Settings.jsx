import React from 'react';
import Button from './Button.jsx';
import styles from './Settings.module.css';


export default function Settings({ onToggleColorSetListVisibility, onSaveColors, onRemoveAllSaved }) {
	return (
		<div className={styles.settings}>
			<div className={styles.background}></div>
			<div className={styles['button-box']}>
				<Button icon="fa-solid fa-trash-can" onClick={onRemoveAllSaved} />
				<Button icon="fa-solid fa-file-arrow-down" onClick={onToggleColorSetListVisibility} />
				<Button icon="fa-regular fa-floppy-disk" onClick={onSaveColors} />
			</div>
		</div>
	);
}