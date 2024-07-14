import React from 'react';
import styles from './SettingsPanel.module.css';

export default function SettingsPanel({ children }) {
	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
}