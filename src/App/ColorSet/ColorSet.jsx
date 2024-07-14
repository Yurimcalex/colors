import React from 'react';
import Colors from '../Colors/Colors.jsx';
import Button from '../../components/Button/Button.jsx';
import styles from './ColorSet.module.css';

export default function ColorSet({ colors, onRemove, onSelect }) {
	return (
		<div className={styles.container} onClick={onSelect}>
			<Colors colors={colors} />
			<Button 
				icon="fa-regular fa-circle-xmark"
				dataType="delete"
				onClick={(e) => {
					e.stopPropagation();
					onRemove();
				}} 
			/>
		</div>
	);
}