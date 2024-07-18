import React from 'react';
import styles from './ControllerPanel.module.css';


export default function ControllerPanel({ children, luminance }) {
	return (
		<div className={`${styles.container} ${luminance > 0.5 ? styles.dark : ''}`}>
			{children}
		</div>
	);
}