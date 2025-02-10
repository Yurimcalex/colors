import React from 'react';
import styles from './MainContent.module.css';


export default function MainContent({ children, color }) {
	return (
		<div className={styles.main_content} style={{ cursor: color ? 'pointer' : 'initial' }}>
			{children}
		</div>
	);
}