import React from 'react';
import Column from '../Column/Column.jsx';
import styles from './ColumnList.module.css';

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
		<>
			{listItems}
		</>
	);
}