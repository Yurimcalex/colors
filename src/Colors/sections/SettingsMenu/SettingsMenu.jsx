import React from 'react';
import Button from '../../components/Button/Button.jsx';
import styles from './SettingsMenu.module.css';


export default function SettingsMenu({ 
	onToggleVisibility, visibility,
	onSaveColors,
 	onRemoveAllSaved,
 	onToggleTooltip, showTooltip,
 	onGenerataColors }) {
	
	return (
		<div className={styles.menu}>
			<Button 
				icon="fa-solid fa-paint-roller"
				dataType="get-new-colors"
				onClick={onGenerataColors}
			/>

			{showTooltip ? (<Button 
												icon="fa-solid  fa-eye"
												dataType="toogle-tooltip"
												onClick={onToggleTooltip}
										  />)

									 : (<Button
									 			cls={styles.menu_btn2}
				                icon="fa-solid fa-eye-slash"
			                	dataType="toogle-tooltip"
				                onClick={onToggleTooltip}
			                />)}

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
				onClick={() => {
					if (!visibility) onToggleVisibility();
					onSaveColors();
				}}
			/>
		</div>
	);
}