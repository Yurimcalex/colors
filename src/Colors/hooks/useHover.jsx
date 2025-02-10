import React, { useState, useEffect } from 'react';


export default function useHover(attr, dependency, fn) {
	const [elem, setElement] = useState(null);

	useEffect(() => {
		window.addEventListener('mouseover', over);
		window.addEventListener('mouseout', out);
		return () => {
			window.removeEventListener('mouseover', over);
			window.removeEventListener('mouseout', out);
		};
	}, [elem, dependency]);


	const over = (e) => {
		let target = e.target;
		if (target.hasAttribute(attr)) {
			setElement(target);
			if (fn) fn(e);
			return;
		}
		target = target.closest(attr);
		if (target) {
			if (target === elem) return;
			setElement(target);
			if (fn) fn(e);
		}
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