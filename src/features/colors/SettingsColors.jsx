import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCurrentColors, removeAllSavedColors } from './colorsSlice.js';

import SettingsPanel from '../../App/SettingsPanel/SettingsPanel.jsx';
import Settings from '../../components/Settings/Settings.jsx';
import Tooltip from '../../components/Tooltip/Tooltip.jsx';

export default function SettingsColors({ toggleVisibility, visibility, toogleShowTooltip, showTooltip }) {
	const dispatch = useDispatch();
	
	const tooltipTexts = [
		'save-colors',
		'remove-all-saved-colors',
		'toggle-saved-colors-panel',
		'toogle-tooltip'
	];

	const Settings_UI = <Settings
		onSaveColors={() => dispatch(saveCurrentColors())}
		onRemoveAllSaved={() => dispatch(removeAllSavedColors())}
		onToggleVisibility={toggleVisibility}
		visibility={visibility}
		onToggleTooltip={toogleShowTooltip}
		showTooltip={showTooltip}
	/>

	return (
		<SettingsPanel>
			{showTooltip
				? <Tooltip tooltipData={tooltipTexts} gap={2}>
						{Settings_UI}				
			    </Tooltip>

			  : <>{Settings_UI}</>}
		</SettingsPanel>
	);
}