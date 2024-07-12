import React from 'react';
import styles from './Button.module.css';

export default function Button({ icon, onClick }) {
	return (
		<button className={styles.button} onClick={onClick}>
			<i className={icon}></i>
		</button>
	);
}