import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pickColors, removeColors, selectSavedColorsHashes } from './colorsSlice.js';

import SavedColorsPanel from '../../App/SavedColorsPanel/SavedColorsPanel.jsx';
import LineGallery from '../../components/LineGallery/LineGallery.jsx';
import ColorSets from '../../App/ColorSets/ColorSets.jsx';

export default function SavedColors({ toggleVisibility }) {
	const dispatch = useDispatch();
	const colorSets = useSelector(selectSavedColorsHashes);

	return (
		<SavedColorsPanel onToggleVisibility={toggleVisibility}>
			<LineGallery>
				<ColorSets 
					colors={colorSets}
					pickColorSet={(colors) => dispatch(pickColors(colors))}
					removeSavedColorSet={(colors) => dispatch(removeColors(colors))}
				/>
			</LineGallery>
		</SavedColorsPanel>
	);
}