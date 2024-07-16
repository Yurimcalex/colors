import React from 'react';
import SavedColors from './SavedColors.jsx';
import CurrentColors from './CurrentColors.jsx';

export default function ColorsPage() {
	return (
		<div>
			<CurrentColors />
			<SavedColors />
		</div>
	);
}