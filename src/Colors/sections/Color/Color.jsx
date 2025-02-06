import React from 'react';
import styles from './Color.module.css';


export default function Color({ color, children }) {
	return (
		<div className={styles.container} style={{ background: color }}>
			{children}
		</div>
	);
}