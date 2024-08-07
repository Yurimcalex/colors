import React from 'react';
import Column from '../../components/Column/Column.jsx';
import styles from './Main.module.css';

export default function ColumnList({ colors, locks, handleColorLock, handleColorCopy }) {
	const listItems = colors.map((color, ind) => (
		<Column 
			key={color}
			color={color}
			lock={locks[ind]}
			onColorLock={() => handleColorLock(ind)}
			onColorCopy={handleColorCopy}
		/>
	));

	return (
		<div className={styles.container}>
			{listItems}
		</div>
	);
}