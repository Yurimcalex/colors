import React from 'react';

export default function Button({ icon, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			<i className={icon}></i>
		</button>
	);
}