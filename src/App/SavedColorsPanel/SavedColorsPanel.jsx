import React from 'react';
import Button from '../../components/Button/Button.jsx';
import styles from './SavedColorsPanel.module.css';

export default function SavedColorsPanel({ children }) {
	return (
		<div className={styles.container}>
			{children}

			<Button 
				icon="fa-regular fa-circle-xmark" 
				dataType="close"
			/>
		</div>
	);
}