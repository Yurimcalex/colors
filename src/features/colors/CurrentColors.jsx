import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	generate,
	toggleLock, 
	selectCurrentColors
} from './colorsSlice.js';

import Main from '../../App/Main/Main.jsx';
import Tooltip from '../../components/Tooltip/Tooltip.jsx';


export default function CurrentColors({ showTooltip }) {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	const tooltipTexts = [
		'copy-to-clipboard',
		'lock/unlock-color'
	];

	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, [locks, colors]);

	const handleKeyDown = (e) => {
		if (e.code.toLowerCase() === 'space') {
			dispatch(generate(colors, locks));
		}
	};

	const handleColorLock = (ind) => {
		dispatch(toggleLock(ind));
		document.activeElement.blur();
	};

	const handleCopyColorHash = (e) => {
		const text = e.target.textContent;
		navigator.clipboard.writeText(text);
	};

	const Main_UI = <Main 
		colors={colors}
		locks={locks}
		handleColorLock={handleColorLock}
		handleColorCopy={handleCopyColorHash}
	/>
	
	return (
		<>
			{showTooltip 
				? <Tooltip tooltipData={tooltipTexts} gap={3}>{Main_UI}</Tooltip>
				: <>{Main_UI}</>}
		</>
	);
}