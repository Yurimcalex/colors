import React from 'react';
import styles from './Logo.module.css';

export default function Logo() {
	return (
		<div className={styles.container}>
			<span className={styles.red}>C</span>
			<span className={styles.orange}>o</span>
			<span className={styles.yellow}>l</span>
			<span className={styles.green}>o</span>
			<span className={styles.blue}>u</span>
			<span className={styles.purple}>r</span>
			<span className={styles.violet}>s</span>
		</div>
	);
}