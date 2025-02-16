import React, { useState, useRef, useEffect } from 'react';
import Button from '../Button/Button.jsx';
import styles from './Gallery.module.css';
import usePortraitOrientation from '../../hooks/usePortraitOrientation.js';


export default function Gallery({ children, savedPad, setSavedPad, setGallerySize }) {
	const [isPortrait, setIsPortrait] = usePortraitOrientation();
	const [pad, setPad] = useState(savedPad);
	const colorsCont = useRef(null);

	const COLOR_SET_W = 210;
	const COLOR_SET_GAP = 15;
	const CONTENT_PAD = 10;
	const shiftPad = COLOR_SET_W + COLOR_SET_GAP;


	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isPortrait]);


	useEffect(() => {
		let timer = setTimeout(() => {
			setSavedPad(pad);
		}, 300);
		return () => clearTimeout(timer);
	}, [pad]);


	useEffect(() => {
		const wrapper = colorsCont.current.parentNode;
		const size = isPortrait ? wrapper.offsetHeight : wrapper.offsetWidth;
		setGallerySize(size);
	}, []);


	const handleResize = () => {
		setIsPortrait();
		setPad(0);
	};


	const handleForward = () => {
		if (pad === 0) return;
		setPad(pad + shiftPad);
	};

	const handleBack = () => {
		const content = colorsCont.current;
		const wrapper = content.parentNode;
		const actualContentSize = content.children.length * (COLOR_SET_W + COLOR_SET_GAP) + CONTENT_PAD * 2;
		const overflowSize = isPortrait 
			? actualContentSize - wrapper.offsetHeight 
			: actualContentSize - wrapper.offsetWidth;

		const newPad = pad - shiftPad;
		if (Math.abs(newPad) - COLOR_SET_W > overflowSize) return;
		if (newPad <= actualContentSize) {
			setPad(newPad);
		}
	}

	const prop = isPortrait ? 'marginTop' : 'marginLeft';
	

	return (
		<div className={styles.gallery}>
			<div className={styles.gallery_background}></div>
			
			<div className={styles.gallery_wrapper}>
				<div className={styles.gallery_content} ref={colorsCont} style={{ [prop]: `${pad}px` }}>
					{children}
				</div>
			</div>

			<Button
			 icon={`fa-solid ${isPortrait ? 'fa-chevron-down' : 'fa-chevron-left'}`}
			 dataType="prev"
			 onClick={isPortrait ? handleForward : handleBack} />
			
			<Button 
				icon={`fa-solid ${isPortrait ? 'fa-chevron-up' : 'fa-chevron-right'}`}
				dataType="next" 
				onClick={isPortrait ? handleBack : handleForward} />
		</div>
	);
};