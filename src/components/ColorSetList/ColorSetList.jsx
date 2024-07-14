import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button.jsx';
import ColorsSet from '../ColorSet/ColorSet.jsx';
import styles from './ColorSetList.module.css';
import { LocalStorage } from '../../storage.js';

export default function ColorSetList({ colorList, onToggleVisibility, removeSavedColorSet, pickColorSet, isVisible }) {
	const [isPortrait, setIsPortrait] = useState(isPortraitOrientation());
	const [pad, setPad] = useState(0);
	const colorsCont = useRef(null);
	const shiftPad = 200;

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isPortrait]);

	const handleResize = () => {
		setIsPortrait(isPortraitOrientation());
		setPad(0);
	};

	const handleForward = () => {
		const cont = colorsCont.current;
		if (!isPortrait && cont.scrollWidth - pad <= cont.parentNode.offsetWidth) return;
		if (isPortrait && cont.scrollHeight - pad <= cont.parentNode.offsetHeight) return;
		setPad(pad + shiftPad);
	};

	const handleBack = () => {
		const cont = colorsCont.current;
		let newPad = pad - shiftPad;
		if (newPad < 0) newPad = 0;
		setPad(newPad);
	};

	const style = {};
	if (isPortrait) {
		style.marginTop = `${-pad}px`;
	} else {
		style.marginLeft = `${-pad}px`;
	}

	return (
		<div className={`${styles['saved-colors']} ${isVisible ? styles.visible : ''}`}>
			<div className={styles.background}></div>
			
			<div className={styles['colors-wrapper']}>
				<div 
					className={styles['colors-container']}
					ref={colorsCont}
					style={style}>

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
			<Button icon="fa-solid fa-chevron-up" dataType="up" onClick={handleForward} />
			<Button icon="fa-solid fa-chevron-down" dataType="down" onClick={handleBack} />
		</div>
	);
}

function isPortraitOrientation() {
	return window.matchMedia("(orientation: portrait)").matches;
}