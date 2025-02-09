import React, { useState, useRef, useEffect, Fragment } from 'react';
import styles from './Tooltip.module.css';
import useHover from '../../hooks/useHover.jsx';


export default function Tooltip({ children, gap, tooltipDisplayed }) {
	const [anchorElem, setAnchorElem] = useHover('[data-type]', true);

	return (
		<div>
			{children}

			{anchorElem && tooltipDisplayed &&
				<Bar 
					text={anchorElem.dataset.type.split('-').join(' ')}
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
			className={styles.tooltip}
			ref={bar}
			style={{
				top: `${top}px`,
				left: `${left}px`
			}}
		>	
			<div className={styles.tooltip_pointer} style={{left: `${pLeft}px`}}></div>
			<div className={styles.tooltip_body}>{text}</div>
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