import React, { useState } from 'react';
import SavedColors from './SavedColors.jsx';
import CurrentColors from './CurrentColors.jsx';
import SettingsColors from './SettingsColors.jsx';

export default function ColorsPage() {
	const [isSavedColorsVisible, setIsSavedColorVisible] = useState(false);
	const handleToggleVisibility = () => setIsSavedColorVisible(!isSavedColorsVisible);

	return (
		<div>
			<SettingsColors 
				toggleVisibility={handleToggleVisibility}
				visibility={isSavedColorsVisible}
			/>
			
			<CurrentColors />
			
			{isSavedColorsVisible && 
				<SavedColors 
					toggleVisibility={handleToggleVisibility}
				/>}
		</div>
	);
}