import React from 'react';
import styles from './Button.module.css';

export default function Button({ icon, onClick, dataType, cls }) {
	return (
		<button className={`${styles.button} ${cls || ''}`} onClick={onClick} data-type={dataType}>
			<i className={icon}></i>
		</button>
	);
}