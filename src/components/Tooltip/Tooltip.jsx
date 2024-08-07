import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({ children, tooltipData, gap }) {
	const [anchorElem, setAnchorElem] = useState(null);

	const handleMouseOver = (e) => {
		const tooltipText = tooltipData.find(text => text === e.target.dataset.type);
		if (tooltipText) {
			setAnchorElem(e.target);
		} else {
			if (!e.target.closest("[data-type]")) {
				setAnchorElem(null);
			}
		}
	};

	const handleMouseLeave = (e) => {
		if (anchorElem) setAnchorElem(null);
	}
	

	let tooltipText;
	if (anchorElem) {
		tooltipText = anchorElem.dataset.type.split('-').join(' ')
	}

	return (
		<div
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}
		>
			{children}

			{anchorElem && 
				<Bar 
					text={tooltipText}
					anchorElem={anchorElem}
					gap={gap}
				/>}
		</div>
	);
}


function Bar({ text, anchorElem, gap }) {
	const [coords, setCoords] = useState(null);
	const bar = useRef(null);
	
	useEffect(() => {
		const coords = getTooltipCoords(anchorElem, bar.current, gap);
		setCoords(coords);
	}, [anchorElem]);

	let top = -100, left = -100, pLeft = 50;
	if (coords) {
		top = coords.y;
		left = coords.x;
		pLeft = coords.pLeft;
	}

	return (
		<div
			className={styles.container}
			ref={bar}
			style={{
				top: `${top}px`,
				left: `${left}px`
			}}
		>	
			<div className={styles.pointer} style={{left: `${pLeft}px`}}></div>
			<div className={styles.tooltip}>{text}</div>
		</div>
	);
}


function getTooltipCoords(anchorElem, tooltipElem, gap) {
	const anchorCoords = anchorElem.getBoundingClientRect();
	const docWidth = document.documentElement.clientWidth;

	let pointer = tooltipElem.offsetWidth / 2;

	let left = anchorCoords.left + ((anchorElem.offsetWidth / 2) - (tooltipElem.offsetWidth / 2));
	if (left < 0) {
		left = 0;
		pointer = anchorElem.offsetWidth / 2;
	}
	if (left + tooltipElem.offsetWidth > docWidth) {
		left = docWidth - tooltipElem.offsetWidth;
		pointer = tooltipElem.offsetWidth - anchorElem.offsetWidth / 2;
	}

	// let top = anchorCoords.top - (anchorElem.offsetHeight / 2) - gap;
	// if (top < 0) {
	// 	top = anchorCoords.bottom + gap;
	// }

	let top = anchorCoords.bottom + gap;

	return {
		x: left,
		y: top,
		pLeft: pointer - 2.5 // half width of pointer
	}
}