import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generate, saveCurrentColors, selectCurrentColors } from './colorsSlice.js';

import ControllerPanel from '../../App/ControllerPanel/ControllerPanel.jsx';
import Controller from '../../components/Controller/Controller.jsx';

export default function ControllerColors() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	return (
		<ControllerPanel>
			<Controller
				onGenerataColors={() => dispatch(generate(colors, locks))}
				onSaveColors={() => dispatch(saveCurrentColors())}
			/>
		</ControllerPanel>
	);
}