import React from 'react';
import Button from '../../components/Button/Button.jsx';
import styles from './SavedColorsPanel.module.css';

export default function SavedColorsPanel({ children, onToggleVisibility }) {
	return (
		<div className={styles.container}>
			{children}

			<Button 
				icon="fa-solid fa-square-caret-down" 
				dataType="close"
				onClick={onToggleVisibility}
			/>
		</div>
	);
}