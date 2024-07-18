import React from 'react';
import styles from './ControllerPanel.module.css';


export default function ControllerPanel({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}