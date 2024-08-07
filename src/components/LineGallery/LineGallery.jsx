import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button.jsx';
import styles from './LineGallery.module.css';

export default function LineGallery({ children }) {
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
	}

	const style = {};
	if (isPortrait) {
		style.marginTop = `${-pad}px`;
	} else {
		style.marginLeft = `${-pad}px`;
	}

	return (
		<div className={styles.container}>
			<div className={styles.background}></div>
			
			<div className={styles.wrapper}>
				<div className={styles.content} ref={colorsCont} style={style}>
					{children}
				</div>
			</div>

			<Button
			 icon={`fa-solid ${isPortrait ? 'fa-chevron-down' : 'fa-chevron-left'}`}
			 dataType="prev"
			 onClick={handleBack} />
			
			<Button 
				icon={`fa-solid ${isPortrait ? 'fa-chevron-up' : 'fa-chevron-right'}`}
				dataType="next" 
				onClick={handleForward} />
		</div>
	);
};

function isPortraitOrientation() {
	return window.matchMedia("(orientation: portrait)").matches;
}