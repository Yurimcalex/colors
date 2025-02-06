import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pickColors, removeColors, selectSavedColorsHashes } from '../features/colors/colorsSlice.js';
import ColorSet from './sections/ColorSet/ColorSet.jsx';


export default function StoredColors() {
	const dispatch = useDispatch();
	const colorSets = useSelector(selectSavedColorsHashes);

	return (
		<>
			{colorSets.map(colors => (
				<ColorSet 
					key={colors.join()}
					colors={colors}
					onRemove={(colors) => dispatch(removeColors(colors))}
					onSelect={(colors) => dispatch(pickColors(colors))}
				/>
			))}
		</>
	);
}