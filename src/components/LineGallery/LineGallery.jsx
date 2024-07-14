import React from 'react';
import Button from '../Button/Button.jsx';
import styles from './LineGallery.module.css';

export default function LineGallery({ children }) {
	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			
			<div className={styles.wrapper}>
				<div className={styles.content}>
					{children}
				</div>
			</div>

			<Button icon="fa-solid fa-chevron-left" dataType="prev" />
			<Button icon="fa-solid fa-chevron-right" dataType="next" />
		</div>
	);
};