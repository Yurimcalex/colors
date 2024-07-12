import React from 'react';
import ColorList from './components/ColorList.jsx';
import Storage from './storage.js';
import './app.css';

export default function App() {
	const savedColors = Storage.getColorsFromHash();

	return (
		<div className="app">
			<ColorList initialColors={savedColors} />
		</div>
	);
}