import React, { useState, useRef, useEffect } from 'react';
import Button from './Button.jsx';
import ColorsSet from './ColorSet.jsx';
import styles from './ColorSetList.module.css';
import { LocalStorage } from '../storage.js';

export default function ColorSetList({ colorList, onToggleVisibility, removeSavedColorSet, pickColorSet, isVisible }) {
	const [pad, setPad] = useState(0);
	const colorsCont = useRef(null);
	const shiftPad = 200;

	const handleForward = () => {
		const cont = colorsCont.current;
		if (cont.scrollWidth - pad <= cont.parentNode.offsetWidth) return;
		setPad(pad + shiftPad);
	};

	const handleBack = () => {
		const cont = colorsCont.current;
		let newPad = pad - shiftPad;
		if (newPad < 0) newPad = 0;
		setPad(newPad);
	};

	return (
		<div className={`${styles['saved-colors']} ${isVisible ? styles.visible : ''}`}>
			<div className={styles.background}></div>
			
			<div className={styles['colors-wrapper']}>
				<div 
					className={styles['colors-container']}
					ref={colorsCont}
					style={{marginLeft: `${-pad}px`}}>

					{colorList.map(colors => (
						<ColorsSet 
							key={colors.join('')}
							colors={colors}
							onRemove={() => removeSavedColorSet(colors.join('-'))}
							onSelect={() => pickColorSet(colors)}
						/>
					))}
				</div>
			</div>

			<Button 
				icon="fa-regular fa-circle-xmark" 
				dataType="close"
				onClick={onToggleVisibility}
			/>

			<Button icon="fa-solid fa-chevron-right" dataType="next" onClick={handleForward} />
			<Button icon="fa-solid fa-chevron-left" dataType="prev" onClick={handleBack} />
			<Button icon="fa-solid fa-chevron-up" dataType="up" />
			<Button icon="fa-solid fa-chevron-down" dataType="down" />
		</div>
	);
}