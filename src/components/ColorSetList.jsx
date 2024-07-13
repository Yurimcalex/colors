import React from 'react';
import Button from './Button.jsx';
import ColorsSet from './ColorSet.jsx';
import styles from './ColorSetList.module.css';
import { LocalStorage } from '../storage.js';

export default function ColorSetList({ colorList, onToggleVisibility }) {
	return (
		<div className={`${styles['saved-colors']} ${styles.visible}`}>
			<div className={styles.background}></div>
			
			<div className={styles['colors-wrapper']}>
				<div className={styles['colors-container']}>
					{colorList.map(colors => <ColorsSet key={colors.join('')} colors={colors} />)}
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