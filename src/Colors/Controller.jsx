import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generate, saveCurrentColors, selectCurrentColors } from '../features/colors/colorsSlice.js';
import Joystick from './components/Joystick/Joystick.jsx';
import PressingEffect from './components/PressingEffect/PressingEffect.jsx';

export default function Controller({ toggleVisibility, visibility }) {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	return (
		<Joystick
			onGenerataColors={() => dispatch(generate(colors, locks))}
			onSaveColors={() => {
				dispatch(saveCurrentColors());
				if (!visibility) toggleVisibility();
			}}
			Effect={PressingEffect}
		/>
	);
}