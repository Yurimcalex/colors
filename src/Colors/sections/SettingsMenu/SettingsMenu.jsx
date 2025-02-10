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
				dataTooltip="settings-btn-generate-colors"
				onClick={onGenerataColors}
			/>

			<Button
				icon={showTooltip ? "fa-solid  fa-eye" : "fa-solid fa-eye-slash"}
				dataTooltip={showTooltip ? "settings-btn-hide-tooltips" : "settings-btn-show-tooltips"}
				onClick={onToggleTooltip}
				cls={showTooltip ? "" : styles.menu_btn2}
			/>

			<Button 
				icon="fa-solid fa-folder-minus"
				dataTooltip="settings-btn-clear-store"
				onClick={onRemoveAllSaved}
			/>

			<Button 
				icon={visibility ? 'fa-solid fa-square-caret-down' : 'fa-solid fa-square-caret-up'}
				dataTooltip={visibility ? "settings-btn-hide-store" : "settings-btn-open-store"}
				onClick={onToggleVisibility}
			/>

			<Button 
				icon="fa-solid fa-square-plus"
				dataTooltip="settings-btn-save-colors"
				onClick={() => {
					if (!visibility) onToggleVisibility();
					onSaveColors();
				}}
			/>
		</div>
	);
}