import React, { useState } from 'react';


export default function usePortraitOrientation() {
	const [isPortrait, setIsPortrait] = useState(isPortraitOrientation());
	const changeOrientation = () => setIsPortrait(isPortraitOrientation());

	return [isPortrait, changeOrientation];
}


function isPortraitOrientation() {
	return window.matchMedia("(orientation: portrait)").matches;
}