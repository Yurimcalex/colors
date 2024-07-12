import React from 'react';
import Color from './components/Color.jsx';
import './app.css';

export default function App() {
	return (
		<div className="app">
			<>
				{[1, 2, 3, 4, 5].map(n => <Color key={n} />)}
			</>
		</div>
	);
}