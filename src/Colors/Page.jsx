import React, { useState } from 'react';
import Header from './sections/Header/Header.jsx';
import Logo from './components/Logo/Logo.jsx';
import Settings from './Settings.jsx';
import Tooltip from './components/Tooltip/Tooltip.jsx';


export default function Page() {
	const [storeDisplayed, setStoreDisplayed] = useState(false);
	const [tooltipDisplayed, setTooltipDisplayed] = useState(true);

	const toggleStoreDisplay = () => setStoreDisplayed(!storeDisplayed);
	const toggleTooltipDisplay = () => setTooltipDisplayed(!tooltipDisplayed);

	const settingTooltips = [
		'save-colors',
		'remove-all-saved-colors',
		'toggle-saved-colors-panel',
		'toogle-tooltip',
		'get-new-colors'
	];

	const AppSettings = <Settings 
		storeDisplayed={storeDisplayed}
		tooltipDisplayed={tooltipDisplayed}
		toggleStoreDisplay={toggleStoreDisplay}
		toggleTooltipDisplay={toggleTooltipDisplay}
	/>

	return (
		<div>
			<Header>
				<Logo />

				{tooltipDisplayed 
						? <Tooltip tooltipData={settingTooltips} gap={2}>{AppSettings}</Tooltip>
				  	: <>{AppSettings}</>}
			</Header>
		</div>
	);
}