import React from 'react';
import Button from './Button.jsx';
import styles from './ColorSet.module.css';

export default function ColorsSet({ colors, onRemove }) {
	return (
		<div className={styles['color-set']}>
			{colors.map(color => (
				<div
					key={color}
					className={styles['color-small']}
					style={{background: color}}
				></div>
			))}
			
			<Button icon="fa-regular fa-circle-xmark" dataType="delete" onClick={onRemove} />
		</div>
	);
}