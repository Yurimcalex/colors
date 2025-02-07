import React from 'react';
import styles from './Header.module.css';

export default function Header({ children }) {
	return (
		<div className={styles.header}>
			<div className={styles.header_background}></div>
			<div className={styles.header_content}>
				{children}
			</div>
		</div>
	);
}