import React from 'react';
import Button from './Button.jsx';
import styles from './ColorSetList.module.css';

export default function ColorSetList({ onToggleVisibility }) {
	return (
		<div className={`${styles['saved-colors']} ${styles.visible}`}>
			<div className={styles.background}></div>
			
			<div className={styles['colors-wrapper']}>
				<div className={styles['colors-container']}>

				</div>
			</div>

			<Button 
				icon="fa-regular fa-circle-xmark" 
				dataType="close"
				onClick={onToggleVisibility}
			/>

			<Button icon="fa-solid fa-chevron-right" dataType="next" />
			<Button icon="fa-solid fa-chevron-left" dataType="prev" />
			<Button icon="fa-solid fa-chevron-up" dataType="up" />
			<Button icon="fa-solid fa-chevron-down" dataType="down" />
		</div>
	);
}