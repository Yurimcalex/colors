import React from 'react';

export default function Button({ icon }) {
	return (
		<button className="button">
			<i className={icon}></i>
		</button>
	);
}