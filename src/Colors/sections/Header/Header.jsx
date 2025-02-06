import React from 'react';
import styles from './Header.module.css';

export default function Header({ children }) {
	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
}