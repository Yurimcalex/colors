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
import useColor from './hooks/useColor.js';


export default function Page() {
	const { colors, locks } = useSelector(selectCurrentColors);
	const [storeDisplayed, setStoreDisplayed] = useState(false);
	const [tooltipDisplayed, setTooltipDisplayed] = useState(true);

	const toggleStoreDisplay = () => setStoreDisplayed(!storeDisplayed);
	const toggleTooltipDisplay = () => setTooltipDisplayed(!tooltipDisplayed);

	const luminance = chroma(colors[2]).luminance();
	const [color] = useColor();

	const MemoizedTooltip = React.memo(Tooltip);

	const [savedPad, setSavedPad] = useState(0);
	const padBack = () => {
		if (savedPad < 0) setSavedPad(savedPad + 225);
	};

	return (
		<MemoizedTooltip gap={5} tooltipDisplayed={tooltipDisplayed}>
			<Header>
				<Logo />
				<Settings 
					storeDisplayed={storeDisplayed}
					tooltipDisplayed={tooltipDisplayed}
					toggleStoreDisplay={toggleStoreDisplay}
					toggleTooltipDisplay={toggleTooltipDisplay}
				/>
			</Header>
			

			<MainContent color={color}>
				<Content color={color}/>
			</MainContent>


			<JoystickPanel luminance={luminance}>
				<Controller toggleVisibility={toggleStoreDisplay} visibility={storeDisplayed} />
			</JoystickPanel>

			
			{storeDisplayed && (
				<StorePanel onToggleVisibility={toggleStoreDisplay}>
					<Gallery savedPad={savedPad} setSavedPad={setSavedPad}>
						<StoredColors padBack={padBack}/>
					</Gallery>
				</StorePanel>
			)}
		</MemoizedTooltip>
	);
}