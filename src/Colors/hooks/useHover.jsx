import React, { useState, useEffect } from 'react';


export default function useHover(attr) {
	const [elem, setElement] = useState(null);

	useEffect(() => {
		window.addEventListener('mouseover', over);
		window.addEventListener('mouseout', out);
		return () => {
			window.removeEventListener('mouseover', over);
			window.removeEventListener('mouseout', out);
		};
	}, []);


	const over = (e) => {
		if (elem) return;
		let target = event.target.closest(attr);
		if (!target) return;
		setElement(target);
	};

	const out = (e) => {
		if (!elem) return;
		let relatedTarget = event.relatedTarget;
		while (relatedTarget) {
		  if (relatedTarget == elem) return;
		  relatedTarget = relatedTarget.parentNode;
		}
		setElement(null);
	};

	return [elem, setElement];
}