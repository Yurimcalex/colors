import React, { useState, useEffect } from 'react';
import ColorList from './components/ColorList.jsx';
import Settings from './components/Settings.jsx';
import ColorSetList from './components/ColorSetList.jsx';
import Storage, { LocalStorage } from './storage.js';
import './app.css';

import styles from './App.module.css';

const storage = new LocalStorage();

export default function App() {
	const [colors, setColors] = useState(getInitialColors());
	const [locks, setLocks] = useState(new Array(5).fill(false));
	const [showColorSetList, setShowColorSetList] = useState(false);
	const [savedColorList, setSavedColorList] = useState(storage.download());

	useEffect(() => {
	  window.addEventListener('keydown', handleKeyDown);
	  return () => window.removeEventListener('keydown', handleKeyDown);
	}, [locks, colors]);

	const handleKeyDown = (e) => {
		const newColors = [];
		if (e.code.toLowerCase() === 'space') {
			for (let i = 0; i < 5; i += 1) {
				const color = locks[i]
					? colors[i]
					: chroma.random().toString();
				
				newColors.push(color);
			}
			setColors(newColors);
			Storage.updateColorsHash(newColors);
			document.activeElement.blur();
		}
	};

	const handleColorLock = (ind) => {
		setLocks(locks.map((lock, i) => ind === i ? !lock : lock));
	};

	const handleColorSetListVisibility = () => setShowColorSetList(!showColorSetList);

	const handleSaveColors = () => {
		storage.save();
		setSavedColorList(storage.download());
	};

	const handleRemoveSavedColorList = () => {
		storage.clear();
		setSavedColorList({});
	}

	const handleRemoveSavedColorSet = (colors) => {
		storage.remove(colors);
		setSavedColorList(storage.download());
	}

	const handleSavedColorSetPick = (colors) => {
		setColors(colors);
		Storage.updateColorsHash(colors);
	};

	return (
		<div className={styles.app}>
			<ColorList 
				colors={colors}
				locks={locks}
				handleColorLock={handleColorLock}
			/>

			<Settings 
				onToggleColorSetListVisibility={handleColorSetListVisibility}
				onSaveColors={handleSaveColors}
				onRemoveAllSaved={handleRemoveSavedColorList}
			/>

			{showColorSetList && 
				<ColorSetList
					colorList={mapObjToArr(savedColorList)}
					onToggleVisibility={handleColorSetListVisibility}
					removeSavedColorSet={handleRemoveSavedColorSet}
					pickColorSet={handleSavedColorSetPick}
				/>}
		</div>
	);
}


function getInitialColors() {
	const colors = Storage.getColorsFromHash();
	if (!colors.length) {
		for (let i = 0; i < 5; i += 1) {
			colors.push(chroma.random().toString());
		}
	}
	Storage.updateColorsHash(colors);
	return colors;
}

function mapObjToArr(obj) {
	return Object.values(obj);
}