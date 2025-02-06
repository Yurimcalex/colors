import React from 'react';
import styles from './JoystickPanel.module.css';


export default function JoystickPanel({ children, luminance }) {
	return (
		<div className={`${styles.container} ${luminance > 0.5 ? styles.dark : ''}`}>
			{children}
		</div>
	);
}