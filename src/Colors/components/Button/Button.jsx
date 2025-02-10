import React from 'react';
import styles from './Button.module.css';

export default function Button({ icon, onClick, dataType, dataTooltip, cls }) {

	if (dataType) {
		return (
			<button 
				className={`${styles.button} ${cls || ''}`}
				onClick={onClick}
				data-type={`${dataType}`}
			>
				<i className={icon}></i>
			</button>
		);
	}

	if (dataTooltip) {
		return (
			<button 
				className={`${styles.button} ${cls || ''}`}
				onClick={onClick}
				data-tooltip={`${dataTooltip}`}
			>
				<i className={icon}></i>
			</button>
		);
	}

	if (dataTooltip && dataType) {
		return (
			<button 
				className={`${styles.button} ${cls || ''}`}
				onClick={onClick}
				data-type={`${dataType}`}
				data-tooltip={`${dataTooltip}`}
			>
				<i className={icon}></i>
			</button>
		);
	}

	return (
		<button 
			className={`${styles.button} ${cls || ''}`}
			onClick={onClick}
		>
			<i className={icon}></i>
		</button>
	);
}