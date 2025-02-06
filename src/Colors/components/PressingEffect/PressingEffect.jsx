import React, { useState } from 'react';
import styles from './PressingEffect.module.css';


export default function PressingEffect({ children }) {
	const [isPress, setIsPress] = useState(false);

	const handleMouseDown = () => setIsPress(true);
	const handleMouseUp = () => setIsPress(false);

	return (
		<div className={`${isPress ? styles.down : ''}`}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
		>
			{children}
		</div>
	);
}