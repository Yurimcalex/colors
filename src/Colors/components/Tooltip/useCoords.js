import React, { useState, useEffect, useRef } from 'react';


export default function useCoords(anchor, tooltipData) {
	const { gap, pointer } = tooltipData;
	const [coords, setCoords] = useState({ top: -100, left: -100, pLeft: 50 });
	const bar = useRef(null);

	useEffect(() => {
		let nextCoords;
		if (pointer === 'up') nextCoords = getBottom(anchor, bar.current, gap);
		else if (pointer === 'right') nextCoords = getLeft(anchor, bar.current, gap);

		setCoords(nextCoords);
	}, [anchor]);

	return [coords, bar];
}


function getBottom(anchor, tooltip, gap) {
	const anchorCoords = anchor.getBoundingClientRect();
	const docWidth = document.documentElement.clientWidth;

	let pLeft = tooltip.offsetWidth / 2;
	let left = anchorCoords.left + ((anchor.offsetWidth / 2) - (tooltip.offsetWidth / 2));
	if (left < 0) {
		left = 0;
		pLeft = anchor.offsetWidth / 2;
	}
	if (left + tooltip.offsetWidth > docWidth) {
		left = docWidth - tooltip.offsetWidth;
		pLeft = docWidth - anchorCoords.left + (anchorCoords.width / 2);
	}
	let top = anchorCoords.bottom + gap;
	pLeft -= 2.5; // half width of pointer
	return { left, top, pLeft }
}


function getLeft(anchor, tooltip, gap) {
	const anchorCoords = anchor.getBoundingClientRect();
	let left = anchorCoords.left - tooltip.offsetWidth - gap;
	let top = anchorCoords.top + anchorCoords.height / 2  - tooltip.offsetHeight / 2;
	return { left, top };
}
