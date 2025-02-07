import React from 'react';
import styles from './Logo.module.css';

export default function Logo() {
	return (
		<div className={styles.logo}>
			<span className={styles.logo_letter1}>C</span>
			<span className={styles.logo_letter2}>o</span>
			<span className={styles.logo_letter3}>l</span>
			<span className={styles.logo_letter4}>o</span>
			<span className={styles.logo_letter5}>u</span>
			<span className={styles.logo_letter6}>r</span>
			<span className={styles.logo_letter7}>s</span>
		</div>
	);
}