import React, { useState, useEffect } from 'react';
import Main from './Main/Main.jsx';
import Status from '../components/Status/Status.jsx';
import SettingsPanel from './SettingsPanel/SettingsPanel.jsx';
import Settings from './Settings/Settings.jsx';
import Storage, { LocalStorage } from '../storage.js';

import SavedColorsPanel from './SavedColorsPanel/SavedColorsPanel.jsx';
import LineGallery from '../components/LineGallery/LineGallery.jsx';
import ColorSets from './ColorSets/ColorSets.jsx';

const storage = new LocalStorage();

export default function App() {
	const [colors, setColors] = useState(getInitialColors());
	const [locks, setLocks] = useState(new Array(5).fill(false));
	const [statusText, setStatusText] = useState('');
	const [savedColorList, setSavedColorList] = useState(storage.download());
	const [showColorSetList, setShowColorSetList] = useState(false);

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
			displayStatus(`New colors - ${newColors.join(', ')} generated!`);
		}
	};

	const handleColorLock = (ind) => {
		setLocks(locks.map((lock, i) => ind === i ? !lock : lock));
		displayStatus(`Color ${colors[ind]} ${locks[ind] ? 'unlocked': 'locked'}!`);
	};

	const handleCopyColorHash = (e) => {
		const text = e.target.textContent;
		navigator.clipboard.writeText(text);
		displayStatus(`Color hash ${text} copied!`);
	};

	const handleSaveColors = () => {
		storage.save();
		setSavedColorList(storage.download());
		displayStatus(`Colors ${colors.join(', ')} saved!`);
	};

	const handleRemoveSavedColorList = () => {
		storage.clear();
		setSavedColorList({});
		displayStatus(`All saved color sets have been deleted!`);
	};

	const handleColorSetListVisibility = () => setShowColorSetList(!showColorSetList);

	const handleRemoveSavedColorSet = (colors) => {
		storage.remove(colors);
		setSavedColorList(storage.download());
		displayStatus(`Color set ${colors} has been removed!`);
	}

	const handleSavedColorSetPick = (colors) => {
		setColors(colors);
		Storage.updateColorsHash(colors);
		displayStatus(`Color set ${colors.join(', ')} has been picked!`);
	};

	const displayStatus = (text) => {
		setStatusText(text);
		//setTimeout(() => setStatusText(''), 1000);
	};

	return (
		<div>
			<Main 
				colors={colors}
				locks={locks}
				handleColorLock={handleColorLock}
				handleColorCopy={handleCopyColorHash}
			/>

			<SettingsPanel>
				<Settings 
					onToggleVisibility={handleColorSetListVisibility}
					onSaveColors={handleSaveColors}
					onRemoveAllSaved={handleRemoveSavedColorList}
				/>
			</SettingsPanel>

			{showColorSetList && <SavedColorsPanel onToggleVisibility={handleColorSetListVisibility}>
				<LineGallery>
					<ColorSets 
						colors={mapObjToArr(savedColorList)}
						removeSavedColorSet={handleRemoveSavedColorSet}
						pickColorSet={handleSavedColorSetPick}
					/>
				</LineGallery>
			</SavedColorsPanel>}

			{statusText && <Status text={statusText} />}
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