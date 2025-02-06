import React from 'react';
import styles from './Colors.module.css';

export default function Colors({ colors }) {
	return (
		<div className={styles.container}>
			{colors.map(color => <div key={color} style={{ background: color }}></div>)}
		</div>
	);
}