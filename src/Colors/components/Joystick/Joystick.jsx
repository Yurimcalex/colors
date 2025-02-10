import React from 'react';
import Button from '../Button/Button.jsx';
import styles from './Joystick.module.css';


export default function Joystick({ onSaveColors, onGenerataColors, Effect }) {
	return (
		<div className={styles.joystick}>
			<Effect>
				<div className={`${styles.joystick_slot} ${styles.joystick_leftbtn}`}>
					<Button 
						icon="fa-solid fa-paint-roller"
						onClick={onGenerataColors}
						dataTooltip="joystick-btn-generate-colors"
					/>
				</div>
			</Effect>
			
			<Effect>
				<div className={`${styles.joystick_slot} ${styles.joystick_rightbtn}`}>
					<Button 
						icon="fa-solid fa-square-plus"
						onClick={onSaveColors}
					/>
				</div>
			</Effect>
		</div>
	);
}