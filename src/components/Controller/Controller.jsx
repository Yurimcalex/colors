import React from 'react';
import Button from '../Button/Button.jsx';

export default function Controller({ onSaveColors, onGenerataColors }) {
	return (
		<div>
			<div>
				<Button 
					icon="fa-solid fa-paint-roller"
					onClick={onGenerataColors}
				/>
			</div>
			
			<div>
				<Button 
					icon="fa-solid fa-square-plus"
					onClick={onSaveColors}
				/>
			</div>
		</div>
	);
}