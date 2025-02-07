import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentColors } from '../features/colors/colorsSlice.js';
import Header from './sections/Header/Header.jsx';
import Logo from './components/Logo/Logo.jsx';
import Settings from './Settings.jsx';
import Tooltip from './components/Tooltip/Tooltip.jsx';
import MainContent from './sections/MainContent/MainContent.jsx';
import Content from './Content.jsx';
import JoystickPanel from './sections/JoystickPanel/JoystickPanel.jsx';
import Controller from './Controller.jsx';
import StorePanel from './sections/StorePanel/StorePanel.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import StoredColors from './StoredColors.jsx';


export default function Page() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const [storeDisplayed, setStoreDisplayed] = useState(false);
	const [tooltipDisplayed, setTooltipDisplayed] = useState(true);

	const toggleStoreDisplay = () => setStoreDisplayed(!storeDisplayed);
	const toggleTooltipDisplay = () => setTooltipDisplayed(!tooltipDisplayed);

	const luminance = chroma(colors[2]).luminance();

	const settingTooltips = [
		'save-colors',
		'remove-all-saved-colors',
		'toggle-saved-colors-panel',
		'toogle-tooltip',
		'get-new-colors'
	];

	const colorTooltips = [
		'copy-to-clipboard',
		'lock/unlock-color'
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
					? <Tooltip tooltipData={settingTooltips} gap={5}>{AppSettings}</Tooltip>
				  : <>{AppSettings}</>}
			</Header>


			{tooltipDisplayed
				? (<Tooltip tooltipData={colorTooltips} gap={3}>
					 	<MainContent>
							<Content / >
						</MainContent>
					</Tooltip>) 
					
				: (<MainContent>
						<Content / >
					</MainContent>)}


			<JoystickPanel luminance={luminance}>
				<Controller toggleVisibility={toggleStoreDisplay} visibility={storeDisplayed} />
			</JoystickPanel>

			
			{storeDisplayed && (
				<StorePanel onToggleVisibility={toggleStoreDisplay}>
					<Gallery>
						<StoredColors />
					</Gallery>
				</StorePanel>
			)}
		</div>
	);
}