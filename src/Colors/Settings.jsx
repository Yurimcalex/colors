import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SettingsMenu from './sections/SettingsMenu/SettingsMenu.jsx';
import { generate, saveCurrentColors, removeAllSavedColors, selectCurrentColors } from '../features/colors/colorsSlice.js';


export default function Settings({ storeDisplayed, tooltipDisplayed, toggleStoreDisplay, toggleTooltipDisplay, padForward }) {
	const { colors, locks } = useSelector(selectCurrentColors);
	const dispatch = useDispatch();

	return (
		<SettingsMenu 
			onSaveColors={() => {
				dispatch(saveCurrentColors());
				padForward();
			}}
			onRemoveAllSaved={() => dispatch(removeAllSavedColors())}
			onToggleVisibility={toggleStoreDisplay}
			visibility={storeDisplayed}
			onToggleTooltip={toggleTooltipDisplay}
			showTooltip={tooltipDisplayed}
			onGenerataColors={() => dispatch(generate(colors, locks))}
		/>
	);
}