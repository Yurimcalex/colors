import React from 'react';
import Colors from '../../components/Colors/Colors.jsx';
import Button from '../../components/Button/Button.jsx';
import styles from './ColorSet.module.css';

export default function ColorSet({ colors, onRemove, onSelect }) {
	const luminance = chroma(colors[2]).luminance();

	return (
		<div className={`${styles.container} ${luminance > 0.5 ? styles.dark : ''}`} onClick={() => onSelect(colors)}>
			<Colors colors={colors} />
			<Button 
				icon="fa-solid fa-xmark"
				dataType="delete"
				onClick={(e) => {
					e.stopPropagation();
					onRemove(colors.join('-'));
				}} 
			/>
		</div>
	);
}