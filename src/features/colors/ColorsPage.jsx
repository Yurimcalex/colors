import React, { useState } from 'react';
import SavedColors from './SavedColors.jsx';
import CurrentColors from './CurrentColors.jsx';
import SettingsColors from './SettingsColors.jsx';
import ControllerColors from './ControllerColors.jsx';

export default function ColorsPage() {
	const [isSavedColorsVisible, setIsSavedColorVisible] = useState(false);
	const [showTooltip, setShowTooltip] = useState(true);

	const handleToggleVisibility = () => setIsSavedColorVisible(!isSavedColorsVisible);

	const handleToggleShowTooltip = () => setShowTooltip(!showTooltip);

	return (
		<div>
			<SettingsColors 
				toggleVisibility={handleToggleVisibility}
				visibility={isSavedColorsVisible}
				toogleShowTooltip={handleToggleShowTooltip}
				showTooltip={showTooltip}
			/>
			
			<CurrentColors showTooltip={showTooltip} />

			<ControllerColors />
			
			{isSavedColorsVisible && 
				<SavedColors 
					toggleVisibility={handleToggleVisibility}
				/>}
		</div>
	);
}