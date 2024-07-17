import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCurrentColors, removeAllSavedColors } from './colorsSlice.js';

import SettingsPanel from '../../App/SettingsPanel/SettingsPanel.jsx';
import Settings from '../../components/Settings/Settings.jsx';

export default function SettingsColors({ toggleVisibility }) {
	const dispatch = useDispatch();

	return (
		<SettingsPanel>
			<Settings
				onSaveColors={() => dispatch(saveCurrentColors())}
				onRemoveAllSaved={() => dispatch(removeAllSavedColors())}
				onToggleVisibility={toggleVisibility}
			/>
		</SettingsPanel>
	);
}