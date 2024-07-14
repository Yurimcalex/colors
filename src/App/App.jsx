import React, { useState } from 'react';
import Column from './Column/Column.jsx';
import Storage from '../storage.js';

const storage = new LocalStorage();

export default function App() {
	const [colors, setColors] = useState(getInitialColors());

	return (
		<div style={{ height: '100vh', display: 'flex', background: 'gray' }}>
			<>
				{colors.map(color => <Column key={color} color={color} />)}
			</>
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