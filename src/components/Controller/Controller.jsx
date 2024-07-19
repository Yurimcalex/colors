import React from 'react';
import Button from '../Button/Button.jsx';


export default function Controller({ onSaveColors, onGenerataColors, Effect }) {

	if (Effect) return (
		<div>
			<Effect>
				<div>
					<Button 
						icon="fa-solid fa-paint-roller"
						onClick={onGenerataColors}
					/>
				</div>
			</Effect>
			
			<Effect>
				<div>
					<Button 
						icon="fa-solid fa-square-plus"
						onClick={onSaveColors}
					/>
				</div>
			</Effect>
		</div>
	);

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