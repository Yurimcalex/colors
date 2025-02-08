import React from 'react';
import Button from '../../components/Button/Button.jsx';
import styles from './StorePanel.module.css';

export default function StorePanel({ children, onToggleVisibility }) {
	return (
		<div className={styles.store_panel}>
			{children}

			<Button 
				icon="fa-solid fa-square-caret-down" 
				dataType="close"
				onClick={onToggleVisibility}
			/>
		</div>
	);
}