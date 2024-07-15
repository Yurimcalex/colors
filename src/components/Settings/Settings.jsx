import React from 'react';
import Button from '../../components/Button/Button.jsx';
import styles from './Settings.module.css';

export default function Settings({ onToggleVisibility, onSaveColors, onRemoveAllSaved }) {
	return (
		<div>
			<Button icon="fa-solid fa-trash-can" onClick={onRemoveAllSaved} />
			<Button icon="fa-solid fa-file-arrow-down" onClick={onToggleVisibility} />
			<Button icon="fa-regular fa-floppy-disk" onClick={onSaveColors} />
		</div>
	);
}