import React from 'react';
import ColorSet from '../ColorSet/ColorSet.jsx';
import styles from './ColorSets.module.css';

export default function ColorSets({ colors, removeSavedColorSet, pickColorSet }) {
	return (
		<>
			{colors.map(colors => (
				<div className={styles.set}>
					<ColorSet colors={colors} onRemove={removeSavedColorSet} onSelect={pickColorSet} />
				</div>
			))}
		</>
	);
}