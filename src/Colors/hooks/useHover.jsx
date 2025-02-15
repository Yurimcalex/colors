import React, { useState, useEffect } from 'react';


export default function useHover(attr, fn) {
	const [elem, setElement] = useState(null);

	const over = (e) => {
		if (elem) return;
		const target = e.target.closest(`[${attr}]`);
		if (!target) return;
		setElement(target);
		if (fn) fn(e);
	};

	const out = (e) => {
		if (!elem) return;
		let relatedTarget = e.relatedTarget;
		while (relatedTarget) {
			if (relatedTarget == elem) return;
			relatedTarget = relatedTarget.parentNode;
		}
		setElement(null);
	};

	const dependencies = fn ? [] : [elem];

	useEffect(() => {
		window.addEventListener('mouseover', over);
		window.addEventListener('mouseout', out);
		return () => {
			window.removeEventListener('mouseover', over);
			window.removeEventListener('mouseout', out);
		};
	}, [...dependencies]);


	return [elem, setElement];
}