import React from 'react';
import styles from './SavedColorsPanel.module.css';

export default function SavedColorsPanel({ children }) {
	return (
		<div className={styles.container}>
			{children}
		</div>
	);
}