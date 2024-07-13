import React from 'react';
import styles from './Status.module.css';

export default function Status({ text }) {
	return (
		<div className={styles.status}>{text}</div>
	);
}