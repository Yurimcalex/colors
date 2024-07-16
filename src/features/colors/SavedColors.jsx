import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pickColors, selectSavedColorsHashes } from './colorsSlice.js';

import SavedColorsPanel from '../../App/SavedColorsPanel/SavedColorsPanel.jsx';
import LineGallery from '../../components/LineGallery/LineGallery.jsx';
import ColorSets from '../../App/ColorSets/ColorSets.jsx';

export default function SavedColors() {
	const dispatch = useDispatch();
	const colorSets = useSelector(selectSavedColorsHashes);

	return (
		<SavedColorsPanel>
			<LineGallery>
				<ColorSets 
					colors={colorSets}
					pickColorSet={(colors) => dispatch(pickColors(colors))}
				/>
			</LineGallery>
		</SavedColorsPanel>
	);
}