import React from 'react';
import styles from './MainContent.module.css';


export default function MainContent({ children }) {
	return (
		<div className={styles.main_content}>
			{children}
		</div>
	);
}