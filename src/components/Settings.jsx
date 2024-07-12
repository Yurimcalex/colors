import React from 'react';
import Button from './Button.jsx';
import styles from './Settings.module.css';

console.log(styles);

export default function Settings() {
	return (
		<div className={styles.settings}>
			<div className={styles.background}></div>
			<div className={styles['button-box']}>
				<Button icon="fa-solid fa-trash-can" />
				<Button icon="fa-solid fa-file-arrow-down" />
				<Button icon="fa-regular fa-floppy-disk" />
			</div>
		</div>
	);
}