import { createSlice, nanoid } from '@reduxjs/toolkit';
import Storage from '../../storage.js';

const initialState = {
	current: {
		id: 1,
		colors: getInitialColors(),
		locks: [false, false, false, false, false]
	},

	saved: [
		{
			id: 1,
			colors: ['#4682B4', '#5F9EA0', '#ff5733', '#8B4513', '#778899'],
			locks: [false, false, false, false, false]
		}
	]
};

export const colorsSlice = createSlice({
	name: 'colors',
	initialState,
	reducers: {
		generate: {
			reducer(state, action) {
				state.current.colors = action.payload;
			},
			prepare(colors, locks) {
				const newColors = locks.map((lock, ind) => {
					return lock ? colors[ind] : chroma.random().toString();
				});

				Storage.updateColorsHash(newColors);

				return {
					payload: newColors
				}
			}
		},

		toggleLock: (state, action) => {
			const ind = action.payload;
			const lock = state.current.locks[ind];
			state.current.locks[ind] = !lock;
		}
	}
});

export const { generate, toggleLock } = colorsSlice.actions;

export default colorsSlice.reducer;

export const selectCurrentColors = (state) => state.colors.current;
export const selectSavedColors = (state) => state.colors.saved;


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