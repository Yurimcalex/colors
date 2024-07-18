import React from 'react';
import Button from '../../components/Button/Button.jsx';
import styles from './Settings.module.css';

export default function Settings({ onToggleVisibility, visibility, onSaveColors, onRemoveAllSaved }) {
	return (
		<div>
			<Button 
				icon="fa-solid fa-folder-minus"
				dataType="remove-all-saved-colors"
				onClick={onRemoveAllSaved}
			/>

			<Button 
				icon={`fa-solid ${visibility ? 'fa-square-caret-down' : 'fa-square-caret-up'}`}
				dataType="toggle-saved-colors-panel"
				onClick={onToggleVisibility}
			/>

			<Button 
				icon="fa-solid fa-square-plus"
				dataType="save-colors"
				onClick={onSaveColors}
			/>
		</div>
	);
}