import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCurrentColors, removeAllSavedColors } from './colorsSlice.js';

import SettingsPanel from '../../App/SettingsPanel/SettingsPanel.jsx';
import Settings from '../../components/Settings/Settings.jsx';
import Tooltip from '../../components/Tooltip/Tooltip.jsx';

export default function SettingsColors({ toggleVisibility }) {
	const dispatch = useDispatch();
	
	const tooltipTexts = [
		'save-colors',
		'remove-all-saved-colors',
		'toggle-saved-colors-panel'
	];

	return (
		<SettingsPanel>
			<Tooltip tooltipData={tooltipTexts} gap={-3}>
				<Settings
					onSaveColors={() => dispatch(saveCurrentColors())}
					onRemoveAllSaved={() => dispatch(removeAllSavedColors())}
					onToggleVisibility={toggleVisibility}
				/>
			</Tooltip>
		</SettingsPanel>
	);
}