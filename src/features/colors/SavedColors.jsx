import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSavedColorsHashes } from './colorsSlice.js';

import SavedColorsPanel from '../../App/SavedColorsPanel/SavedColorsPanel.jsx';
import LineGallery from '../../components/LineGallery/LineGallery.jsx';
import ColorSets from '../../App/ColorSets/ColorSets.jsx';

export default function SavedColors() {
	const colorSets = useSelector(selectSavedColorsHashes);

	return (
		<SavedColorsPanel>
			<LineGallery>
				<ColorSets colors={colorSets}/>
			</LineGallery>
		</SavedColorsPanel>
	);
}