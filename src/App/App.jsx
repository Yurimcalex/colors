import React, { useState } from 'react';
import Main from './Main/Main.jsx';
import Status from '../components/Status/Status.jsx';
import SettingsPanel from './SettingsPanel/SettingsPanel.jsx';
import Settings from './Settings/Settings.jsx';
import Storage, { LocalStorage } from '../storage.js';

import LineGallery from '../components/LineGallery/LineGallery.jsx';
import ColorsSet from './ColorSet/ColorSet.jsx';

const storage = new LocalStorage();

export default function App() {
	const [colors, setColors] = useState(getInitialColors());
	const [locks, setLocks] = useState(new Array(5).fill(false));
	const [statusText, setStatusText] = useState('');
	const [savedColorList, setSavedColorList] = useState(storage.download());

	const handleColorLock = (ind) => {
		setLocks(locks.map((lock, i) => ind === i ? !lock : lock));
		displayStatus(`Color ${colors[ind]} ${locks[ind] ? 'unlocked': 'locked'}!`);
	};

	const handleCopyColorHash = (e) => {
		const text = e.target.textContent;
		navigator.clipboard.writeText(text);
		displayStatus(`Color hash ${text} copied!`);
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
				<Settings />
			</SettingsPanel>

			<div style={{position: 'absolute', bottom: '0px', height: '70px', width: '100%'}}>
				<LineGallery>
					{mapObjToArr(savedColorList).map(colors => (
						<div style={{ marginRight: '20px', border: '1px solid gray' }}>
							<ColorsSet colors={colors} />
						</div>
					))}
				</LineGallery>
			</div>

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