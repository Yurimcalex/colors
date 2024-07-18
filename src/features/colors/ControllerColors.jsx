import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generate, saveCurrentColors, selectCurrentColors } from './colorsSlice.js';

import ControllerPanel from '../../App/ControllerPanel/ControllerPanel.jsx';
import Controller from '../../components/Controller/Controller.jsx';

export default function ControllerColors({ toggleVisibility, visibility }) {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	const luminance = chroma(colors[2]).luminance();

	return (
		<ControllerPanel luminance={luminance}>
			<Controller
				onGenerataColors={() => dispatch(generate(colors, locks))}
				onSaveColors={() => {
					dispatch(saveCurrentColors());
					if (!visibility) toggleVisibility();
				}}
			/>
		</ControllerPanel>
	);
}