import React, { useState, useRef, useEffect, Fragment } from 'react';
import styles from './Tooltip.module.css';
import useHover from '../../hooks/useHover.jsx';
import { tooltipData } from '../../tooltipData.js';
import useCoords from './useCoords.js';


export default function Tooltip({ children, gap, tooltipDisplayed }) {
	const [anchorElem] = useHover('data-tooltip');

	let data;
	if (anchorElem && anchorElem.dataset.tooltip) {
		data = tooltipData[anchorElem.dataset.tooltip];
	}

	return (
		<div>
			{children}

			{anchorElem && tooltipDisplayed && <Bar anchorElem={anchorElem} tooltipData={data}/>}
		</div>
	);
}


function Bar({ anchorElem, tooltipData }) {
	const { text, pointer } = tooltipData;
	const [coords, ref] = useCoords(anchorElem, tooltipData);

	let pointerClass;
	if (pointer === 'up') pointerClass = styles.tooltip_pointer_up;
	else if (pointer === 'right') pointerClass = styles.tooltip_pointer_right;
	else if (pointer === 'left') pointerClass = styles.tooltip_pointer_left;

	return (
		<div
			className={styles.tooltip}
			ref={ref}
			style={{
				top: `${coords.top}px`,
				left: `${coords.left}px`
			}}
		>	
			<div className={pointerClass}></div>
			<div className={styles.tooltip_body}>{text}</div>
		</div>
	);
}