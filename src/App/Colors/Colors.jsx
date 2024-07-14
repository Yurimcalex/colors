import React from 'react';
import Color from '../Color/Color.jsx';
import styles from './Colors.module.css';

export default function Colors({ colors }) {
	return (
		<div className={styles.container}>
			{colors.map(color => <Color key={color} color={color} />)}
		</div>
	);
}